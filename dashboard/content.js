(function ($) {
    let debug = false;
    if (window.location.href.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi)) {
        debug = true;
    }

    Handlebars.registerPartial('activity', `
        <div class="extension-widget" id="extension-activity-{{id}}">
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

    Handlebars.registerPartial('week', `
        <div class="extension-widget extension-summary">
            <div class="extension-widget-header">
                <div>
                    <h2>{{title}} &lt;{{timePeriod}}&gt;</h2>
                </div>
            </div>
            <div class="extension-widget-body">
                <div class="extension-widget-details">
                    {{#each summaries}}
                        <div>
                            <div class="extension-widget-details-value">
                                {{#each details}}
                                    <div>
                                        {{this}}
                                    </div>
                                {{/each}}
                            </div>
                            <span title="{{name}}" class="extension-widget-details-label">{{name}}</span>
                        </div>
                    {{/each}}
                </div>
            </div>
        </div>
    `);

    Handlebars.registerHelper('eachInMap', (map, block) => {
        let output = '';
        for (const [key, value] of map) {
            output += block.fn({key, value});
        }
        return output;
    });

    let template = Handlebars.compile(`
        <div>
            {{#eachInMap years}}
                {{#eachInMap value.weeks}}
                    {{>week value}}
                    {{#eachInMap value.activities}}
                        {{>activity value}}
                    {{/eachInMap}}
                {{/eachInMap}}
            {{/eachInMap}}
        </div>
    `);

    function toggleOverlay() {
        $("#extender-overlay").toggle();
        if ($("#extender-placeholder").length) {
            browser.runtime.sendMessage({
                type: debug ? "feedMock" : "feed",
                displayName: null
            }).then(response => {
                console.log(response.viewModel);
                try {
                    $("#extender-placeholder").html(template(response.viewModel));
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
    }

    // The menu is loaded dynamically, so we can't just add the menu item immeditately, we need to wait for the menu to load
    $(document).on('DOMNodeInserted', ".main-nav-list", function (event) {
        let target = $(event.target);
        if (target.hasClass("main-nav-list") && target.children("ul.extender").length === 0) {
            target.prepend(`
                <ul class="main-nav-group extender">
                    <li class="main-nav-item">
                        <a href="#" id="extender-nav-link" class="main-nav-link">
                            <i class="nav-icon icon-layers"></i>
                            <span class="nav-text">${browser.i18n.getMessage("extensionName")}</span>
                        </a>
                    </li>
                </ul>
            `);
        }
    });

    // Append the place holder for the extender immediately, but hidden
    $(".connect-container").append(`
        <div id="extender-overlay" style="display: none;">
            <div id="extender-placeholder"></div>
        </div>
    `);

    // When clicking on the menu item for the extender
    $(document).on("click", "#extender-nav-link", (e) => {
        toggleOverlay();
    });

    // When loading the debug page, show the extender immediately
    if (debug) {
        toggleOverlay();
    }
})(jQuery);