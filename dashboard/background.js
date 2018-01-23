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
        let details = {};
        details.distance = {
            name: "Sträcka",
            value: Qty(`${activity.distance} m`).to('km').toPrec(0.01).toString()
        };
        details.duration = {
            name: "Tid",
            value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
        };
        details.calories = {
            name: "Kalorier",
            value: activity.calories
        };
        details.averageSpeed = {
            name: "Tempo (min/km)",
            value: Qty(activity.averageSpeed, 'm/s').inverse().to('min/km').toPrec(0.01).toString()
        };
        details.elevationGain = {
            name: "Stigning",
            value: Qty(activity.elevationGain, 'm').toPrec(0.01).toString()
        };
        details.stressScore = {
            name: "Stresspoäng",
            value: 100
        };
        details.trainingEffect = {
            name: "Träningseffekt",
            value: "3.5/5"
        };
        return details;
    }

    function getOtherDetails(activity) {
        let details = {};
        details.distance = {
            name: "Sträcka",
            value: Qty(`${activity.distance} m`).to('km').toPrec(0.01).toString()
        };
        details.duration = {
            name: "Tid",
            value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
        };
        details.calories = {
            name: "Kalorier",
            value: activity.calories
        };
        details.averageSpeed = {
            name: "Hastighet (km/h)",
            value: Qty(activity.averageSpeed, 'm/s').to('km/h').toPrec(0.01).toString()
        };
        if (activity.elevationGain) {
            details.elevationGain = {
                name: "Stigning",
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).toString()
            };
        }
        return details;
    }

    function getActivity(activity) {
        if (!(activity.activityId in activityDetailsCache)) {
            console.log(`Activity with id ${activity.activityId} not found in the cache, loading activity.`);
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
            console.log(`Activity with id ${activity.activityId} was found in the cache.`);
        }
        let started = moment(activity.startTimeLocal);
        let completed = moment(activity.startTimeLocal).add(activity.duration, 'seconds');
        let timePeriod = `${started.format('LLLL')} - `;
        if (started.isSame(completed, 'day')) {
            timePeriod += completed.format('LT');
        }
        else {
            timePeriod += completed.format('LLLL');
        }
        return {
            title: "Aktivitet",
            id: activity.activityId,
            name: activity.activityName,
            type: activity.activityType.typeKey,
            iconClass: getIconClass(activity.activityType.typeKey),
            activityUrl: `/modern/activity/${activity.activityId}`,
            ownerProfileImageUrlSmall: activity.ownerProfileImageUrlSmall,
            timePeriod: timePeriod,
            owner: activity.ownerFullName,
            ownerUrl: `/modern/profile/${activity.ownerDisplayName}`,
            description: activity.description,
            mapImage: browser.extension.getURL("debug/map.png"),
            details: activityDetailsCache[activity.activityId]
        };
    }

    function getSummaryForCurrentWeek() {
        return {
            title: "Summering",
            name: "Denna vecka",
            timePeriod: "not yet impl.",
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
            timePeriod: "not yet impl.",
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

    function setGlobalConfiguration(request) {
        console.log(`Setting time locale to ${request.locale}`);
        moment.locale(request.locale);
    }

    browser.runtime.onMessage.addListener((request, sender, func) => {
        console.log(`Message received from content script.`);
        console.log(request);
        setGlobalConfiguration(request);
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