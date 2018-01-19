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
                    <i class="{{iconClass}} widget-activity-identifier pull-left right-xs"></i>
                    <div class="js-activityNameEditPlaceholder inline-edit inline-edit-text-field">
                        <a href="{{link}}" class="inline-edit-target" title="{{name}}">{{name}}</a>
                        <button class="inline-edit-trigger modal-trigger">
                            <i class="icon-pencil"></i>
                        </button>
                        <div class="inline-edit-editable">
                            <div class="inline-edit-editable-text" style="min-width: 15px;" contenteditable="true">{{name}}</div>
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
                            <div class="h5 data-bit">{{distance.value}}</div>
                            <span title="{{distance.name}}" class="data-label">{{distance.name}}</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{duration.value}}</div>
                            <span title="{{duration.name}}" class="data-label">{{duration.name}}</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{averageSpeed.value}}</div>
                            <span class="data-label" title="{{averageSpeed.name}}">{{averageSpeed.name}}</span>
                        </div>
                    </div>
                    <div class="row-fluid top-xs">
                        <div class="span4 data-1">
                            <div id="js-calories" class="h5 data-bit">{{calories.value}}</div>
                            <span title="{{calories.name}}" class="data-label">{{calories.name}}</span>
                        </div>
                        <div class="span4 data-1">
                            <div class="h5 data-bit">{{elevationGain.value}}</div>
                            <span title="{{elevationGain.name}}" class="data-label">{{elevationGain.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{/each}}
        </div>
    `);

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        $("#extender-placeholder").html(template(request.viewModel));
    });
})(jQuery);