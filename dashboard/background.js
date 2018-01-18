(function ($) {
    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (tab.url.match(/https?:\/\/connect.garmin.com\/modern\/dashboard.*/gi)) {
            console.log(`Laddar aktiviteter för tab med id ${tab.id}.`)

            // Årlig status
            // https://connect.garmin.com/modern/proxy/calendar-service/year/2018

            // Januari
            // https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0

            // Vecka
            // https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0/day/18/start/1

            // Enskild aktivitet
            // https://connect.garmin.com/modern/proxy/activity-service/activity/2434047486?_=1516287552093

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