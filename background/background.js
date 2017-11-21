(function () {
    function GetNewWidth(originalWidth) {
        return (originalWidth + 100) + "px";
    }

    var css = `
.main-body { width: calc(100% - 40px); }
.main-body > .content:not(.page) { max-width: 100%; margin-left: 20px; margin-right: 20px; }
.widget-column { width: ${GetNewWidth(340)}; }
.widget { width: ${GetNewWidth(320)}; }
.widget-activities .activities-other-attributes { width: ${GetNewWidth(320)}; }
.widget-activities .inline-edit-target { width: ${GetNewWidth(220)}; max-width: ${GetNewWidth(220)}; }
.widget-footer { width: ${GetNewWidth(290)}; }
.widget .activity-list td:first-child a { width: ${GetNewWidth(80)}; }
.widget-activities .inline-edit-editable-text { width: ${GetNewWidth(190)}; }
.workout-to-calendar .calendar-month table, .widget.calendar-month table { width : ${GetNewWidth(319)}; }
.manage-widgets { display: none; }
`;

    function update(tab) {
        function onError(error) {
            console.log(`Error: ${error}`);
        }

        var insertingCSS = browser.tabs.insertCSS({
            code: css
        });

        insertingCSS.then(tab, onError);
    }

    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            update(tab);
        }
    });

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        update(tab);
    });
})();