(function ($) {
    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (tab.url.match(/https?:\/\/connect.garmin.com\/modern[\/]?[dashboard\/.*]?/gi)) {
            console.log(`Laddar aktiviteter för tab med id ${tab.id}.`)
            $.ajax({url: "https://connect.garmin.com/modern/proxy/activitylist-service/activities/phlexo?start=1&limit=30&_=1516279328566", success: function(result) {
                console.log(`Aktiviteter laddade, skickar aktiviterna till content skriptet till tab med id ${tab.id}.`);
                console.log(result);
                browser.tabs.sendMessage(tab.id, {
                    result: result
                });
            }});
        }
    });
})(jQuery);