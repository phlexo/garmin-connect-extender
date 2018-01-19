(function ($) {
    function getRunningDetails(activity) {
        return {
            distance: {
                name: "Sträcka",
                value: Qty(`${activity.distance} m`).toPrec('0.01 km').format('km')
            },
            duration: {
                name: "Tid",
                value: moment.duration(activity.duration, "seconds").format("d[d] h[h]", 1)
            },
            calories: {
                name: "Kalorier",
                value: activity.calories
            },
            averageSpeed: {
                name: "Tempo (min/km)",
                value: activity.averageSpeed
            },
            elevationGain: {
                name: "Stigning",
                value: activity.elevationGain
            }
        };
    }

    function getActivity(activity) {
        return {
            id: activity.activityId,
            name: activity.activityName,
            type: activity.activityType.typeKey,
            iconClass: `icon-activity-${activity.activityType.typeKey}`,
            link: `/modern/activity/${activity.activityId}`,
            runningDetails: getRunningDetails(activity)
        };
    }

    function getSummary() {
        return null;
    }

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
                console.log(result);
                let feed = [];
                for (let i = 0; i < result.activityList.length; i++) {
                    feed.push({
                        summary: getSummary(),
                        activity: getActivity(result.activityList[i])
                    });
                }
                console.log(feed);
                browser.tabs.sendMessage(tab.id, {
                    feed: feed
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