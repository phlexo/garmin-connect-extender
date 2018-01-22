(function ($) {

    if (window.location.href.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi) || window.location.href.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
        $("head").append(`
            <style>
                .extension-details-wrapper {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    grid-gap: 10px;
                    grid-auto-rows: minmax(100px, auto);
                }
            </style>
        `);
        $(".main-body").html(`
            <div id="extender-placeholder"></div>
        `);
    }

    Handlebars.registerPartial('activity', `
        <div class="widget widget-large widget-activities" style="width: auto; height: auto;">
            <div class="widget-header clearfix" style="cursor: auto;">
                <h2 class="widget-title pull-left">{{title}}</h2>
            </div>
            <div class="widget-content">
                <h4>
                    <i class="{{iconClass}} widget-activity-identifier pull-left right-xs"></i>
                    <div class="js-activityNameEditPlaceholder inline-edit inline-edit-text-field">
                        <a href="{{link}}" class="inline-edit-target" title="{{name}}" style="max-width: 100%;">{{name}}</a>
                    </div>
                </h4>
                <div class="activity-data-placeholder">
                    <div class="extension-details-wrapper">
                        {{#each details}}
                            {{#if value}}
                                <div>
                                    <div class="h5" style="margin: 0px;">{{value}}</div>
                                    <span title="{{name}}" class="data-label">{{name}}</span>
                                </div>
                            {{/if}}
                        {{/each}}
                    </div>
                </div>
            </div>
        </div>
    `);

    Handlebars.registerPartial('summary', `
        <div class="widget widget-large widget-activities" style="width: auto; height: auto;">
            <div class="widget-header clearfix" style="cursor: auto;">
                <h2 class="widget-title pull-left">{{title}}</h2>
            </div>
            <div class="widget-content">
                <h4 class="clearfix">
                    <div class="js-activityNameEditPlaceholder inline-edit inline-edit-text-field">
                        <span>{{name}}</span>
                    </div>
                </h4>
                <div class="activity-data-placeholder">
                    <div class="extension-details-wrapper">
                        {{#each details}}
                            {{#if value}}
                                <div>
                                    <div class="h5" style="margin: 0px;">{{value}}</div>
                                    <span title="{{name}}" class="data-label">{{name}}</span>
                                </div>
                            {{/if}}
                        {{/each}}
                    </div>
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