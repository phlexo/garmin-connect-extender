(function ($) {
    function load(tab) {
        // Årlig status
        // https://connect.garmin.com/modern/proxy/calendar-service/year/2018

        // Januari
        // https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0

        // Vecka
        // https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0/day/18/start/1

        // Enskild aktivitet
        // https://connect.garmin.com/modern/proxy/activity-service/activity/2434047486?_=1516287552093

        $.ajax({
            url: "https://connect.garmin.com/modern/proxy/activitylist-service/activities/phlexo?start=1&limit=30&_=1516279328566", success: function (result) {
                let viewModel = {
                    "activityList": []
                };

                for (let i = 0; i < result.activityList.length; i++) {
                    viewModel.activityList.push({
                        id: result.activityList[i].activityId,
                        name: result.activityList[i].activityName,
                        type: result.activityList[i].activityType.typeKey,
                        iconClass: `icon-activity-${result.activityList[i].activityType.typeKey}`,
                        link: `/modern/activity/${result.activityList[i].activityId}`,
                        distance: {
                            name: "Sträcka",
                            value: Qty(`${result.activityList[i].distance} m`).toPrec('0.01 km').format('km')
                        },
                        duration: {
                            name: "Tid",
                            value: moment.duration(result.activityList[i].duration, "seconds").format("d[d] h[h]", 1)
                        },
                        calories: {
                            name: "Kalorier",
                            value: result.activityList[i].calories
                        },
                        averageSpeed: {
                            name: "Tempo (min/km)",
                            value: result.activityList[i].averageSpeed
                        },
                        elevationGain: {
                            name: "Stigning",
                            value: result.activityList[i].elevationGain
                        }
                    });
                }

                console.log(result);
                console.log(viewModel);

                browser.tabs.sendMessage(tab.id, {
                    viewModel: viewModel
                });
            }
        });
    }

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
            if (tab.url.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
                load(tab);
            }
        }
    });

    function redirect(requestDetails) {
        return {
            redirectUrl: browser.extension.getURL("dashboard/page.html")
        };
    }

    browser.webRequest.onBeforeRequest.addListener(
        redirect,
        { urls: ["https://connect.garmin.com/modern/extension/"], types: ["main_frame"] },
        ["blocking"]
    );

})(jQuery);