(function ($) {

    $(".main-body").html(`
        <div id="extender-placeholder"></div>
    `);

    let template = Handlebars.compile(`
        <div>
        {{#each activityList}}
        <div class="widget widget-large widget-activities" style="width: auto; height: auto;">
            <div class="widget-header clearfix">
                <h2 class="widget-title pull-left">Aktivitet</h2>
            </div>
            <div class="widget-content">
                <h4 class="clearfix">
                    <i class="icon-activity-{{typeKey}} widget-activity-identifier pull-left right-xs"></i>
                    <div class="js-activityNameEditPlaceholder inline-edit inline-edit-text-field">
                        <a href="/modern/activity/{{activityId}}" class="inline-edit-target" title="{{activityName}}">{{activityName}}</a>
                        <button class="inline-edit-trigger modal-trigger">
                            <i class="icon-pencil"></i>
                        </button>
                        <div class="inline-edit-editable">
                            <div class="inline-edit-editable-text" style="min-width: 15px;" contenteditable="true">{{activityName}}</div>
                            <span class="inline-edit-actions">
                                <button class="inline-edit-save icon-checkmark"></button>
                                <button class="inline-edit-cancel icon-close"></button>
                            </span>
                        </div>
                    </div>
                </h4>
        
                <div id="activity-data-placeholder">
                    <div class="row-fluid top-xs">
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{distance}}</div>
                            <span title="Sträcka" class="data-label">Sträcka</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{duration}}</div>
                            <span title="Tid" class="data-label">Tid</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{averageSpeed}}</div>
                            <span class="data-label" title="Tempo (min/km)">Tempo (min/km)</span>
                        </div>
                    </div>
                    <div class="row-fluid top-xs">
                        <div class="span4 data-1">
                            <div id="js-calories" class="h5 data-bit">{{calories}}</div>
                            <span title="Kalorier" class="data-label">Kalorier</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{elevationGain}}</div>
                            <span title="Stigning" class="data-label">Stigning</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{/each}}
        </div>
    `);

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
            console.log("Message received from background script");
            console.log(request);
            $("#extender-placeholder").html(template(request.viewModel));
        } catch(error) {
            console.log(error);
        }
    });
})(jQuery);