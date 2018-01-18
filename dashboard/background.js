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
                let viewModel = {
                    "activityList": []
                };

                for (let i = 0; i < result.activityList.length; i++) {
                    let activity = {};
                    activity["activityId"] = result.activityList[i].activityId;
                    activity["activityName"] = result.activityList[i].activityName;
                    activity["typeKey"] = result.activityList[i].activityType.typeKey;
                    activity["distance"] = Qty(`${result.activityList[i].distance} m`).toPrec('0.01 km').format('km');
                    activity["duration"] = moment.duration(result.activityList[i].duration, "seconds").format("d[d] h[h]", 1);
                    activity["calories"] = result.activityList[i].calories;
                    activity["averageSpeed"] = result.activityList[i].averageSpeed;
                    activity["elevationGain"] = result.activityList[i].elevationGain;
                    viewModel.activityList.push(activity);
                }

                browser.tabs.sendMessage(tab.id, {
                    viewModel: viewModel
                });
            }});
        }
    });

    function redirect(requestDetails) {
        return {
            redirectUrl: browser.extension.getURL("dashboard/page.html")
        };
    }
    
    browser.webRequest.onBeforeRequest.addListener(
        redirect,
        {urls:["https://connect.garmin.com/modern/extension/"], types:["main_frame"]},
        ["blocking"]
    );

})(jQuery);