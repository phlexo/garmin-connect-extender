(function ($) {
    browser.i18n.getAcceptLanguages().then((languages) => {
        if (languages.length > 0) {
            moment.locale(languages[0]);
        }
    });

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        browser.tabs.insertCSS(tab.id, {
            file: browser.extension.getURL("dashboard/style.css")
        });
    });

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
        let viewModel = {
            title: browser.i18n.getMessage("activity"),
            id: activity.activityId,
            name: activity.activityName,
            type: activity.activityType.typeKey,
            iconClass: null,
            activityUrl: `/modern/activity/${activity.activityId}`,
            ownerProfileImageUrlSmall: activity.ownerProfileImageUrlSmall,
            timePeriod: null,
            owner: activity.ownerFullName,
            ownerUrl: `/modern/profile/${activity.ownerDisplayName}`,
            description: activity.description,
            mapImage: browser.extension.getURL("debug/map.png"),
            details: null
        };
        switch (activity.activityType.typeKey.split('_').pop()) {
            case "running":
                viewModel.details = getRunningDetails(activity);
                viewModel.iconClass = "icon-activity-running";
                break;
            case "swimming":
                viewModel.details = getSwimmingDetails(activity);
                viewModel.iconClass = "icon-activity-swimming";
                break;
            case "cycling":
                viewModel.details = getCyclingDetails(activity);
                viewModel.iconClass = "icon-activity-cycling";
                break;
            default:
                viewModel.details = getOtherDetails(activity);
                viewModel.iconClass = "icon-activity-other";
                break;
        }
        let started = moment(activity.startTimeLocal);
        let completed = moment(activity.startTimeLocal).add(activity.duration, 'seconds');
        viewModel.timePeriod = `${started.format('LLLL')} - `;
        if (started.isSame(completed, 'day')) {
            viewModel.timePeriod += completed.format('LT');
        }
        else {
            viewModel.timePeriod += completed.format('LLLL');
        }
        return viewModel;
    }

    function getSummaryForWeek(weekNumber, year, weekName, result) {
        let summary = {
            total: {
                duration: 0,
                distance: 0
            }
        };
        for (let i = 0; i < result.activityList.length; i++) {
            let tempWeekName = moment(result.activityList[i].startTimeLocal).format('Y_w');
            if (weekName === tempWeekName) {
                summary.total.duration += result.activityList[i].duration
                summary.total.distance += result.activityList[i].distance
                switch (result.activityList[i].activityType.typeKey.split('_').pop()) {
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
            activities: {
                total: {
                    name: `${browser.i18n.getMessage("activityTotal")}`,
                    details: [
                        `${moment.duration(summary.total.duration, 'seconds').format("HH:mm:ss")}`,
                        `${Qty(summary.total.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                    ]
                }
            }
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

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.type) {
            case "feed":
                return new Promise(resolve => {
                    $.ajax({
                        // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018" // Årlig status
                        // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0" // Januari
                        // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0/day/18/start/1" // Vecka
                        // url: "https://connect.garmin.com/modern/proxy/activity-service/activity/2434047486?_=1516287552093" // Enskild aktivitet
                        url: "https://connect.garmin.com/modern/proxy/activitylist-service/activities/phlexo?start=1&limit=30&_=1516279328566"
                    }).done(function(result) {
                        let feed = convertResultToFeed(result);
                        resolve({
                            feed: feed
                        });
                    });
                });
            case "feedMock":
                return new Promise(resolve => {
                    let mock = new Mock();
                    let result = mock.getActivityList();
                    setTimeout(() => {
                        let feed = convertResultToFeed(result);
                        resolve({
                            feed: feed
                        });
                    }, 1000);
                });
        }
    });
})(jQuery);