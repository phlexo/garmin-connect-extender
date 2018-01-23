(function ($) {
    console.log("dashboard/background.js is loaded.");

    let activityDetailsCache = {};

    function getIconClass(typeKey) {
        var tokens = typeKey.split('_');
        switch (tokens[tokens.length-1]) {
            case "running":
                return "icon-activity-running";
            case "cycling":
                return "icon-activity-cycling";
            case "swimming":
                return "icon-activity-swimming";
            default:
                return "icon-activity-other";
        }
    }

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
            },
            stressScore: {
                name: "Stresspoäng",
                value: 100
            },
            trainingEffect: {
                name: "Träningseffekt",
                value: "3.5/5"
            }
        };
    }

    function getOtherDetails(activity) {
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
                name: "Hastighet (km/h)",
                value: activity.averageSpeed
            },
            elevationGain: {
                name: "Stigning",
                value: activity.elevationGain
            }
        };
    }

    function getActivity(activity) {
        if (!(activity.activityId in activityDetailsCache)) {
            console.log(`Activity with id {activity.activityId} not found in the cache, loading activity.`);
            switch (activity.activityType.typeKey) {
                case "running":
                    activityDetailsCache[activity.activityId] = getRunningDetails(activity);
                    break;
                default:
                    activityDetailsCache[activity.activityId] = getOtherDetails(activity);
                    break;
            }
        }
        else {
            console.log(`Activity with id {activity.activityId} was found in the cache.`);
        }
        let viewModel = {
            title: "Aktivitet",
            id: activity.activityId,
            name: activity.activityName,
            type: activity.activityType.typeKey,
            iconClass: getIconClass(activity.activityType.typeKey),
            link: `/modern/activity/${activity.activityId}`,
            ownerProfileImageUrlSmall: activity.ownerProfileImageUrlSmall,
            started: activity.startTimeLocal,
            completed: null,
            owner: activity.ownerFullName,
            ownerUrl: `https://connect.garmin.com/modern/profile/${activity.ownerDisplayName}`,
            description: activity.description,
            mapImage: browser.extension.getURL("debug/map.png"),
            details: activityDetailsCache[activity.activityId]
        };
        return viewModel;
    }

    function getSummaryForCurrentWeek() {
        return {
            title: "Summering",
            name: "Denna vecka",
            details: {
                cycling: {
                    name: "Cykling",
                    value: "100km"
                },
                running: {
                    name: "Löpning",
                    value: "60km"
                },
                swimming: {
                    name: "Simning",
                    value: "6km"
                }
            }
        };
    }

    function getSummaryForWeek(week) {
        return {
            title: "Summering",
            name: `Vecka ${week}`,
            details: {
                cycling: {
                    name: "Cykling",
                    value: "100km"
                },
                running: {
                    name: "Löpning",
                    value: "60km"
                },
                swimming: {
                    name: "Simning",
                    value: "6km"
                }
            }
        };
    }

    function resultToFeed(result) {
        let feed = [];
        feed.push({
            title: "Summering",
            summary: getSummaryForCurrentWeek()
        });
        for (let i = 0; i < result.activityList.length; i++) {
            if (i%5==4) {
                feed.push({
                    title: "Summering",
                    summary: getSummaryForWeek(17)
                });
            }
            feed.push({
                title: "Aktivitet",
                activity: getActivity(result.activityList[i])
            });
        }
        console.log("Result converted to feed.");
        console.log(feed);
        return feed;
    }

    function sendResponse(func) {
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
                console.log("Sending live data.");
                func({
                    feed: resultToFeed(result)
                });
            }
        });
    }

    function sendMockResponse(func) {
        let mock = new Mock();
        console.log("Sending mock data.");
        func({
            feed: resultToFeed(mock.getActivityList())
        });
    }

    browser.runtime.onMessage.addListener((request, sender, func) => {
        console.log(`Message received from content script.`);
        console.log(request);
        if (sender.tab.url.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi)) {
            console.log("Debug page has been loaded.");
            sendMockResponse(func);
        }
        else if (sender.tab.url.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
            console.log("Live page has been loaded.");
            sendResponse(func);
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