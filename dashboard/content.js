(function ($) {
    if (window.hasRun) {
        console.log("dashboard/content.js has already run.");
        return;
    }
    console.log("dashboard/content.js is loaded.");
    window.hasRun = true;

    if (window.location.href.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi) || window.location.href.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
        $("head").append(`
            <style>
                .extension-widget {
                    margin: 0 9px 20px 9px;
                    padding: 11px 15px;
                    border: 1px solid #e5e5e5;
                    border-radius: 3px;
                    font-family: 'Open Sans','HelveticaNeue-Light','Helvetica Neue Light','Helvetica Neue',Helvetica,Arial,sans-serif;
                }
                .extension-widget-header {
                    display: grid;
                    grid-template-columns: 1fr auto;
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
                    display: grid;
                    grid-template-columns: 1fr auto;
                    align-items: start;
                }
                .extension-widget-description {
                    color: #888;
                    font-size: 12px;
                    margin: 0 0 5px 0;
                }
                .extension-widget-details {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
                .extension-widget-footer {
                }
            </style>
        `);
        $(".main-body").html(`
            <div id="extender-placeholder"></div>
        `);
    }

    Handlebars.registerPartial('activity', `
        <div class="extension-widget">
            <div class="extension-widget-header">
                <div>
                    <h2>{{title}}</h2>
                    <div>
                        <i class="{{iconClass}} extension-widget-identifier"></i>
                        <h4><a href="{{link}}" title="{{name}}">{{name}}</a></h4>
                    </div>
                </div>
                <div>
                    <img src="{{ownerProfileImageUrlSmall}}" />
                </div>
            </div>
            <div class="extension-widget-body">
                <div>
                    {{#if description}}
                        <div class="extension-widget-description">
                            {{description}}
                        </div>
                    {{/if}}
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
        <div class="extension-widget">
            <div class="extension-widget-header">
                <div>
                    <h2>{{title}}</h2>
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

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Request received.");
        console.log(request);
        $("#extender-placeholder").html(template(request));
    });
})(jQuery);