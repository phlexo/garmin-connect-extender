(function ($) {
    var originalWidgetWidth = 340;
    var newWidgetWidth = -1;
    var removePadding = false;
    var hideNewWidget = false;

    function newElementWidth(originalElementWidth) {
        return originalElementWidth + (newWidgetWidth - originalWidgetWidth);
    }

    function applyWidgetWidthCSS(tab) {
        var css = `.widget-column { width: ${newElementWidth(340)}px; }
        .widget { width: ${newElementWidth(320)}px; }
        .widget-activities .activities-other-attributes { width: ${newElementWidth(320)}px; }
        .widget-activities .inline-edit-target { width: ${newElementWidth(220)}px; max-width: ${newElementWidth(220)}px; }
        .widget-footer { width: ${newElementWidth(290)}px; }
        .widget .activity-list td:first-child a { width: ${newElementWidth(80)}px; }
        .widget-activities .inline-edit-editable-text { width: ${newElementWidth(190)}px; }
        .workout-to-calendar .calendar-month table, .widget.calendar-month table { width : ${newElementWidth(319)}px; }
        .widget .highcharts-container { width: ${newElementWidth(290)}px !important;}`;

        console.log(`Inserting CSS for setting widget width to ${newWidgetWidth}px on ${tab.url}.`);
        browser.tabs.insertCSS(tab.id, {
            code: css
        });
    }

    function applyNewWidgetButtonCSS(tab) {
        var css = `.manage-widgets { display: none; }`;

        console.log(`Inserting CSS for hiding new widget button on ${tab.url}.`);
        browser.tabs.insertCSS(tab.id, {
            code: css
        });
    }

    function applyPagePaddingCSS(tab) {
        var css = `.main-body { width: calc(100% - 40px); }
        .main-body > .content:not(.page) { max-width: 100%; margin-left: 20px; margin-right: 20px; }`;

        console.log(`Inserting CSS for setting the page padding on ${tab.url}.`);
        browser.tabs.insertCSS(tab.id, {
            code: css
        });
    }

    function applyCSS(tab) {
        if (newWidgetWidth > 0) {
            applyWidgetWidthCSS(tab);
        }

        if (removePadding === true) {
            applyPagePaddingCSS(tab);
        }

        if (hideNewWidget === true) {
            applyNewWidgetButtonCSS(tab);
        }
    }

    function updateAll() {
        browser.tabs.query({
            url: ["*://connect.garmin.com/modern", "*://connect.garmin.com/modern/", "*://connect.garmin.com/modern/dashboard/*"]
        }).then((tabs) => {
            for (let tab of tabs) {
                applyCSS(tab);
            }
        });
    }

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (tab.url.match(/https?:\/\/connect.garmin.com\/modern[\/]?[dashboard\/.*]?/gi)) {
            applyCSS(tab);
        }
    });

    function loadOptions(options) {
        if (options.dashboard != undefined) {
            if (options.dashboard.widgetWidth != undefined) {
                newWidgetWidth = options.dashboard.widgetWidth;
                console.log(`newWidgetWidth = ${newWidgetWidth}`);
            }
            else {
                console.log(`newWidgetWidth not specified, using default value ${hideNewWidget}.`);
            }

            if (options.dashboard.removePadding != undefined) {
                removePadding = options.dashboard.removePadding;
                console.log(`removePadding = ${removePadding}`);
            }
            else {
                console.log(`removePadding not specified, using default value ${hideNewWidget}.`);
            }

            if (options.dashboard.hideNewWidget != undefined) {
                hideNewWidget = options.dashboard.hideNewWidget;
                console.log(`hideNewWidget = ${hideNewWidget}`);
            }
            else {
                console.log(`hideNewWidget not specified, using default value ${hideNewWidget}.`);
            }
        } else {
            console.log(`No options found, using default values.`);
        }
    }

    browser.storage.local.get().then(
        (result) => {
            console.log(`Options loaded, updating all tabs.`);
            loadOptions(result);
            updateAll();
        },
        (error) => {
            console.log(`Error while loading options: ${error}`);
        }
    );

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`Options updated, updating all tabs.`);
        loadOptions(request.options);
        updateAll();
    });
})(jQuery);