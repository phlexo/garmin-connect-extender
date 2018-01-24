(function ($) {
    console.log("dashboard/content.js is loaded.");

    Handlebars.registerPartial('activity', `
        <div class="extension-widget">
            <div class="extension-widget-header">
                <div>
                    <h2>{{title}} &lt;{{timePeriod}}&gt;</h2>
                    <div>
                        <i class="{{iconClass}} extension-widget-identifier"></i>
                        <h4><a href="{{activityUrl}}">{{name}}</a></h4>
                    </div>
                </div>
                <div class="extender-widget-profile-image">
                    <a href="{{ownerUrl}}"><img src="{{ownerProfileImageUrlSmall}}" /></a>
                </div>
            </div>
            <div class="extension-widget-body">
                <div>
                    <div class="extension-widget-description">
                        {{#if description}}
                            <a src="#">Edit description</a>
                            <span>{{description}}</span>
                        {{else}}
                            <a src="#">Add description</a>
                        {{/if}}
                    </div>
                    <div class="extension-widget-details">
                        {{#each details}}
                            {{#if value}}
                                <div>
                                    <div class="extension-widget-details-value">{{value}}</div>
                                    <span title="{{name}}" class="extension-widget-details-label">{{name}}</span>
                                </div>
                            {{/if}}
                        {{/each}}
                    </div>
                </div>
                <div>
                    <img src="{{mapImage}}" />
                </div>
            </div>
        </div>
    `);

    Handlebars.registerPartial('summary', `
        <div class="extension-widget extension-summary">
            <div class="extension-widget-header">
                <div>
                    <h2>{{title}} &lt;{{timePeriod}}&gt;</h2>
                    <h4><a href="{{link}}" title="{{name}}">{{name}}</a></h4>
                </div>
                <div>
                    <img src="{{ownerProfileImageUrlSmall}}" />
                </div>
            </div>
            <div class="extension-widget-body">
                <div class="extension-widget-details">
                    {{#each details}}
                        {{#if value}}
                            <div>
                                <div class="extension-widget-details-value">{{value}}</div>
                                <span title="{{name}}" class="extension-widget-details-label">{{name}}</span>
                            </div>
                        {{/if}}
                    {{/each}}
                </div>
            </div>
        </div>
    `);

    let template = Handlebars.compile(`
        <div>
            {{#each feed}}
                {{#with summary}}
                    {{>summary}}
                {{/with}}
                {{#with activity}}
                    {{>activity}}
                {{/with}}
            {{/each}}
        </div>
    `);

    if (window.location.href.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi) || window.location.href.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
        $("head").append(`
            <style>
                .extension-summary {
                    background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 20%, #2cb5e8 34%);
                }
                .extension-widget {
                    margin: 0 9px 20px 9px;
                    padding: 11px 15px;
                    border: 1px solid #e5e5e5;
                    border-radius: 3px;
                    overflow: hidden;
                    font-family: 'Open Sans','HelveticaNeue-Light','Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,sans-serif;
                }
                .extension-widget-header {
                    display: flex;
                }
                .extension-widget-header div:first-child {
                    flex-grow: 1;
                }
                .extender-widget-profile-image {
                    margin: 0px 0px 5px 0px;
                    border: 1px solid #e5e5e5;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .extension-widget-identifier {
                    height: 26px;
                    width: 26px;
                    margin-top: 4px;
                    line-height: 26px;
                    font-size: 16px;
                    box-shadow: 0 0 0 1px #ccc;
                    text-align: center;
                    border-radius: 50%;
                    color: #888;
                    background: #fafafa;
                    margin-right: 11px;
                    float: left;
                }
                .extension-widget h2 {
                    margin: 0;
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .extension-widget h4 {
                    margin: 5px 0;
                    font-size: 22px;
                    letter-spacing: 2px;
                    white-space: nowrap;
                }
                .extension-widget-body {
                    display: flex;
                }
                .extension-widget-body div:first-child {
                    flex-grow: 1;
                }
                .extension-widget-description {
                    color: #888;
                    font-size: 12px;
                    margin: 0 0 5px 0;
                }
                .extension-widget-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    grid-gap: 10px;
                }
                .extension-widget-details-value {
                    font-weight: 400;
                    font-size: 18px;
                }
                .extension-widget-details-label {
                    color: #888;
                    font-size: 12px;
                    vertical-align: middle;
                }
            </style>
        `);
        $(".main-body").html(`
            <div id="extender-placeholder"></div>
        `);
        let request = {}
        try {
            request.displayName = window.content.document.defaultView.wrappedJSObject.VIEWER_USERPREFERENCES.displayName;
        }
        catch (error) {
            console.log(error);
        }
        console.log("Sending message to background script.");
        console.log(request);
        browser.runtime.sendMessage(request).then((response) => {
            console.log("Response received from background script.");
            console.log(response);
            $("#extender-placeholder").html(template(response));
        });
    }
})(jQuery);