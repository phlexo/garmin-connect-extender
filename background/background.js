(function () {
    var originalWidgetWidth = 340;
    var newWidgetWidth = -1;
    var removePadding = false;

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
        .manage-widgets { display: none; }`;

        if (newElementWidth < 0) {
            console.log(`Removing CSS for setting widget width on ${tab.url}.`);
            browser.tabs.removeCSS(tab.id, {
                code: css
            });
        }
        else {
            console.log(`Inserting CSS for setting widget width on ${tab.url}.`);
            browser.tabs.insertCSS(tab.id, {
                code: css
            });
        }
    }

    function applyPagePaddingCSS(tab) {
        var css = `.main-body { width: calc(100% - 40px); }
        .main-body > .content:not(.page) { max-width: 100%; margin-left: 20px; margin-right: 20px; }`;

        if (removePadding === false) {
            console.log(`Removing CSS for setting the page padding on ${tab.url}.`);
            browser.tabs.removeCSS(tab.id, {
                code: css
            });
        }
        else {
            console.log(`Inserting CSS for setting the page padding on ${tab.url}.`);
            browser.tabs.insertCSS(tab.id, {
                code: css
            });
        }
    }

    function updateAll() {
        browser.tabs.query({
            url: ["*://connect.garmin.com/modern/", "*://connect.garmin.com/modern/dashboard/*"]
        }).then((tabs) => {
            for (let tab of tabs) {
                console.log(`updateAll() tab.url=${tab.url}`);
                applyWidgetWidthCSS(tab);
                applyPagePaddingCSS(tab);
            }
        });
    }

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (tab.url.match(/https?:\/\/connect.garmin.com\/modern\/[dashboard\/.*]?/gi)) {
            console.log(`onUpdated() tab.url=${tab.url}`);
            applyWidgetWidthCSS(tab);
            applyPagePaddingCSS(tab);
        }
    });

    function loadOptions(options) {
        if (options.widget != undefined) {
            if (options.widget.width != undefined) {
                newWidgetWidth = options.widget.width;
                console.log(`newWidgetWidth=${newWidgetWidth}`);
            }
            if (options.widget.removePadding != undefined) {
                removePadding = options.widget.removePadding;
                console.log(`removePadding=${removePadding}`);
            }
        }
    }

    browser.storage.local.get().then(
        (options) => {
            loadOptions(options);
            updateAll();
        },
        (error) => {
            console.log(`Error while loading settings: ${error}`);
        }
    );

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`onMessage() Options updated`);
        loadOptions(request.options);
        updateAll();
    });
})();