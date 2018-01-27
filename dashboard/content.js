(function ($) {
    let debug = false;
    if (window.location.href.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi)) {
        debug = true;
    }

    Handlebars.registerHelper('eachInMap', (map, block) => {
        let output = '';
        for (const [key, value] of map) {
            output += block.fn({key, value});
        }
        return output;
    });

    Handlebars.registerPartial('activity', `
        <div class="gce-widget" id="{{id}}">
            <div class="gce-widget-header">
                <div>
                    <h2>{{title}} &lt;{{timePeriod}}&gt;</h2>
                    <div>
                        <i class="{{iconClass}} gce-widget-identifier"></i>
                        <h4><a href="{{activityUrl}}">{{name}}</a></h4>
                    </div>
                </div>
                <div class="gce-widget-profile-image">
                    <a href="{{ownerUrl}}"><img src="{{ownerProfileImageUrlSmall}}" /></a>
                </div>
            </div>
            <div class="gce-widget-body">
                <div>
                    <div class="gce-widget-description">
                        {{#if description}}
                            <a src="#">Edit description</a>
                            <span>{{description}}</span>
                        {{else}}
                            <a src="#">Add description</a>
                        {{/if}}
                    </div>
                    <div class="gce-widget-details">
                        {{#eachInMap details}}
                            {{#if value.value}}
                                <div>
                                    <div class="gce-widget-details-value">{{value.value}}</div>
                                    <span title="{{value.name}}" class="gce-widget-details-label">{{value.name}}</span>
                                </div>
                            {{/if}}
                        {{/eachInMap}}
                    </div>
                </div>
                <div>
                    <img src="{{mapImage}}" />
                </div>
            </div>
        </div>
    `);

    Handlebars.registerPartial('week', `
        <div class="gce-widget gce-summary" id="{{id}}">
            <div class="gce-widget-header">
                <div>
                    <h2>{{title}} &lt;{{timePeriod}}&gt;</h2>
                </div>
            </div>
            <div class="gce-widget-body">
                <div class="gce-widget-details">
                    {{#eachInMap summaries}}
                        <div>
                            <div class="gce-widget-details-value">
                                {{#each value.details}}
                                    <div>
                                        {{this}}
                                    </div>
                                {{/each}}
                            </div>
                            <span title="{{value.name}}" class="gce-widget-details-label">{{value.name}}</span>
                        </div>
                    {{/eachInMap}}
                </div>
            </div>
        </div>
    `);

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
        $("#gce-overlay").toggle();
        browser.runtime.sendMessage({
            type: debug ? "feedMock" : "feed",
            displayName: null
        });
    }

    // The menu is loaded dynamically, so we can't just add the menu item immeditately, we need to wait for the menu to load
    $(document).on('DOMNodeInserted', ".main-nav-list", function (event) {
        let target = $(event.target);
        if (target.hasClass("main-nav-list") && target.children("ul.gce").length === 0) {
            target.prepend(`
                <ul class="main-nav-group gce">
                    <li class="main-nav-item">
                        <a href="#" id="gce-nav-link" class="main-nav-link">
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
        <div id="gce-overlay" style="display: none;">
            <div id="gce-container"></div>
        </div>
    `);

    // Listen for data from background script
    browser.runtime.onMessage.addListener(request => {
        console.log(request);
        $(`#${request.viewModel.id}`).html(template(request.viewModel));
    });

    // When clicking on the menu item for the extender
    $(document).on("click", "#gce-nav-link", (e) => {
        toggleOverlay();
    });

    // When loading the debug page, show the extender immediately
    if (debug) {
        toggleOverlay();
    }
})(jQuery);