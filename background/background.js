(function () {
    var extraElementWidth = 0;
    var removePadding = false;

    function newElementWidth(originalElementWidth) {
        return originalElementWidth + extraElementWidth;
    }

    function update(tab) {

        var css = ``;

        if (extraElementWidth != 0) {
            console.log(`Updating the widget width on ${tab.url}`);
            css += `.widget-column { width: ${newElementWidth(340)}px; }
                    .widget { width: ${newElementWidth(320)}px; }
                    .widget-activities .activities-other-attributes { width: ${newElementWidth(320)}px; }
                    .widget-activities .inline-edit-target { width: ${newElementWidth(220)}px; max-width: ${newElementWidth(220)}px; }
                    .widget-footer { width: ${newElementWidth(290)}px; }
                    .widget .activity-list td:first-child a { width: ${newElementWidth(80)}px; }
                    .widget-activities .inline-edit-editable-text { width: ${newElementWidth(190)}px; }
                    .workout-to-calendar .calendar-month table, .widget.calendar-month table { width : ${newElementWidth(319)}px; }
                    .manage-widgets { display: none; }`;
        }
        else {
            console.log(`Not updating the widget width on ${tab.url}`);
        }

        if (removePadding) {
            console.log(`Updating the page padding on ${tab.url}`);
            css += `.main-body { width: calc(100% - 40px); }
            .main-body > .content:not(.page) { max-width: 100%; margin-left: 20px; margin-right: 20px; }`;
        }
        else {
            console.log(`Not updating the page padding on ${tab.url}`);
        }

        browser.tabs.insertCSS(tab.id, {
            code: css
        }).then(null, (error) => {
            console.log(`Error at ${tab.url}: ${error}`);
        });
    }

    function updateAll() {
        browser.tabs.query({
            url: ["*://connect.garmin.com/modern/", "*://connect.garmin.com/modern/dashboard/*"]
        }).then((tabs) => {
            for (let tab of tabs) {
                update(tab);
            }
        });
    }

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (tab.url.match(/https?:\/\/connect.garmin.com\/modern\/[dashboard\/.*]?/gi)) {
            update(tab);
        }
    });

    browser.storage.local.get().then(
        (item) => {
            if (item.widget) {
                if (item.widget.width && item.widget.width > 0) {
                    extraElementWidth = item.widget.width - 340;
                }
                if (item.widget.removePadding) {
                    removePadding = true;
                }
            }
            updateAll();
        },
        (error) => {
            console.log(`Error while loading settings: ${error}`);
        }
    );
})();