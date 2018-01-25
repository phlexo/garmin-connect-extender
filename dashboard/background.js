(function ($) {
    console.log("dashboard/background.js is loaded.");

    browser.i18n.getAcceptLanguages().then((languages) => {
        if (languages.length > 0) {
            console.log(`Setting locale for moment.js to ${languages[0]}.`);
            moment.locale(languages[0]);
        }
    });

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
        if (typeof activity.distance === 'number') {
            details.distance = {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            };
        }
        if (typeof activity.duration === 'number') {
            details.duration = {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format('HH:mm:ss')
            };
        }
        if (typeof activity.calories === 'number') {
            details.calories = {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            };
        }
        if (typeof activity.averageSpeed === 'number') {
           details.averageSpeed = {
                name: `${browser.i18n.getMessage("detailsPace")} [min/km]`,
                value: moment.duration(Qty(activity.averageSpeed, 'm/s').inverse().to('min/km').toPrec(0.01).scalar, 'minutes').format('m:ss')
            };
        }
        if (typeof activity.elevationGain === 'number') {
            details.elevationGain = {
                name: `${browser.i18n.getMessage("detailsElevationGain")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            };
        }
        return details;
    }

    function getCyclingDetails(activity) {
        let details = {};
        if (typeof activity.distance === 'number') {
            details.distance = {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            };
        }
        if (typeof activity.duration === 'number') {
            details.duration = {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
            };
        }
        if (typeof activity.calories === 'number') {
            details.calories = {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            };
        }
        if (typeof activity.averageSpeed === 'number') {
            details.averageSpeed = {
                name: `${browser.i18n.getMessage("detailsSpeed")} [km/h]`,
                value: Qty(activity.averageSpeed, 'm/s').to('km/h').toPrec(0.01).scalar.toLocaleString()
            };
        }
        if (typeof activity.elevationGain === 'number') {
            details.elevationGain = {
                name: `${browser.i18n.getMessage("detailsElevationGain")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            };
        }
        return details;
    }

    function getSwimmingDetails(activity) {
        let details = {};
        if (typeof activity.distance === 'number') {
            details.distance = {
                name: `${browser.i18n.getMessage("detailsDistance")} [m]`,
                value: Qty(activity.distance, 'm').toPrec(1).scalar.toLocaleString()
            };
        }
        if (typeof activity.duration === 'number') {
            details.duration = {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format('HH:mm:ss')
            };
        }
        if (typeof activity.calories === 'number') {
            details.calories = {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            };
        }
        if (typeof activity.averageSpeed === 'number') {
            details.averageSpeed = {
                name: `${browser.i18n.getMessage("detailsPace")} [min/100m]`,
                value: moment.duration(Qty(activity.averageSpeed, 'm/s').inverse().toPrec(0.01).scalar*100, 'seconds').format('m:ss')
            };
        }
        return details;
    }

    function getOtherDetails(activity) {
        let details = {};
        if (typeof activity.distance === 'number') {
            details.distance = {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            };
        }
        if (typeof activity.duration === 'number') {
            details.duration = {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
            };
        }
        if (typeof activity.calories === 'number') {
            details.calories = {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            };
        }
        if (typeof activity.averageSpeed === 'number') {
            details.averageSpeed = {
                name: `${browser.i18n.getMessage("detailsSpeed")} [km/h]`,
                value: Qty(activity.averageSpeed, 'm/s').to('km/h').toPrec(0.01).scalar.toLocaleString()
            };
        }
        if (typeof activity.elevationGain === 'number') {
            details.elevationGain = {
                name: `${browser.i18n.getMessage("detailsSpeed")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            };
        }
        return details;
    }

    function getActivity(activity) {
        if (!(activity.activityId in activityDetailsCache)) {
            console.log(`Activity with id ${activity.activityId} not found in the cache, loading activity.`);
            var tokens = activity.activityType.typeKey.split('_');
            switch (tokens[tokens.length-1]) {
                case "running":
                    activityDetailsCache[activity.activityId] = getRunningDetails(activity);
                    break;
                case "swimming":
                    activityDetailsCache[activity.activityId] = getSwimmingDetails(activity);
                    break;
                case "cycling":
                    activityDetailsCache[activity.activityId] = getCyclingDetails(activity);
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
            title: browser.i18n.getMessage("activity"),
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

    function getSummaryForWeek(weekNumber, year, weekName, result) {
        let summary = {};
        for (let i = 0; i < result.activityList.length; i++) {
            let tempWeekName = moment(result.activityList[i].startTimeLocal).format('Y_w');
            if (weekName === tempWeekName) {
                let tokens = result.activityList[i].activityType.typeKey.split('_');
                let activityType = tokens[tokens.length-1];
                switch (activityType) {
                    case "running":
                        if (summary.running === undefined) {
                            summary.running = {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            };
                        }
                        else {
                            summary.running.duration += result.activityList[i].duration;
                            summary.running.distance += result.activityList[i].distance;
                        }
                        break;
                    case "cycling":
                        if (summary.cycling === undefined) {
                            summary.cycling = {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            };
                        }
                        else {
                            summary.cycling.duration += result.activityList[i].duration;
                            summary.cycling.distance += result.activityList[i].distance;
                        }
                        break;
                    case "swimming":
                        if (summary.swimming === undefined) {
                            summary.swimming = {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            };
                        }
                        else {
                            summary.swimming.duration += result.activityList[i].duration;
                            summary.swimming.distance += result.activityList[i].distance;
                        }
                        break;
                    default:
                        if (summary.other === undefined) {
                            summary.other = {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            };
                        }
                        else {
                            summary.other.duration += result.activityList[i].duration;
                            summary.other.distance += result.activityList[i].distance;
                        }
                        break;
                }
            }
        }
        let viewModel = {
            title: browser.i18n.getMessage("summary"),
            timePeriod: `${browser.i18n.getMessage("week")} ${weekNumber} ${year}`,
            activities: {}
        };
        if (summary.swimming != undefined) {
            viewModel.activities.swimming = {
                name: `${browser.i18n.getMessage("activitySwimming")}`,
                details: [
                    `${moment.duration(summary.swimming.duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.swimming.distance, 'm').toPrec(1).scalar.toLocaleString()} m`
                ]
            };
        }
        if (summary.running != undefined) {
            viewModel.activities.running = {
                name: `${browser.i18n.getMessage("activityRunning")}`,
                details: [
                    `${moment.duration(summary.running.duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.running.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            };
        }
        if (summary.cycling != undefined) {
            viewModel.activities.cycling = {
                name: `${browser.i18n.getMessage("activityCycling")}`,
                details: [
                    `${moment.duration(summary.cycling.duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.cycling.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            };
        }
        if (summary.other != undefined) {
            viewModel.activities.other = {
                name: `${browser.i18n.getMessage("activityOther")}`,
                details: [
                    `${moment.duration(summary.other.duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.other.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            };
        }
        return viewModel;
    }

    function convertResultToFeed(result) {
        let feed = [];
        let weekName = null;
        for (let i = 0; i < result.activityList.length; i++) {
            let startTime = moment(result.activityList[i].startTimeLocal);
            let tempWeekName = startTime.format('Y_w');
            if (weekName != tempWeekName) {
                feed.push({
                    title: "Summering",
                    summary: getSummaryForWeek(startTime.week(), startTime.year(), tempWeekName, result)
                });
                weekName = tempWeekName;
            }
            feed.push({
                title: "Aktivitet",
                activity: getActivity(result.activityList[i])
            });
        }
        return feed;
    }

    function handleFeedRequest() {
        return new Promise(resolve => {
            console.log("Requesting live data.");
            $.ajax({
                // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018" // Årlig status
                // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0" // Januari
                // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0/day/18/start/1" // Vecka
                // url: "https://connect.garmin.com/modern/proxy/activity-service/activity/2434047486?_=1516287552093" // Enskild aktivitet
                url: "https://connect.garmin.com/modern/proxy/activitylist-service/activities/phlexo?start=1&limit=30&_=1516279328566"
            }).done(function(result) {
                console.log("Live data received.");
                console.log(result);
                console.log("Converting live data to feed.");
                let feed = convertResultToFeed(result);
                console.log("Live result converted to feed.");
                console.log(feed);
                resolve({
                    feed: feed
                });
            });
        });
    }

    function handleFeedRequestMock() {
        return new Promise(resolve => {
            console.log("Requesting mock data.");
            let mock = new Mock();
            let result = mock.getActivityList();
            setTimeout(() => {
                console.log("Mock data received.");
                console.log(result);
                console.log("Converting mock data to feed.");
                let feed = convertResultToFeed(result);
                console.log("Mock result converted to feed.");
                console.log(feed);
                resolve({
                    feed: feed
                });
            }, 1000);
        });
    }

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`Message received from content script.`);
        console.log(request);
        if (sender.tab.url.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi)) {
            console.log("Debug page has been loaded.");
            return handleFeedRequestMock();
        }
        else if (sender.tab.url.match(/https?:\/\/connect.garmin.com\/modern.*/gi)) {
            console.log("Live page has been loaded.");
            return handleFeedRequest();
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