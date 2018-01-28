(function ($) {
    let activityCache = new Map();

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
        let details = new Map();
        if (typeof activity.distance === 'number') {
            details.set('distance', {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            });
        }
        if (typeof activity.duration === 'number') {
            details.set('duration', {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format('HH:mm:ss')
            });
        }
        if (typeof activity.calories === 'number') {
            details.set('calories', {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            });
        }
        if (typeof activity.averageSpeed === 'number') {
           details.set('averageSpeed', {
                name: `${browser.i18n.getMessage("detailsPace")} [min/km]`,
                value: moment.duration(Qty(activity.averageSpeed, 'm/s').inverse().to('min/km').toPrec(0.01).scalar, 'minutes').format('m:ss')
            });
        }
        if (typeof activity.elevationGain === 'number') {
            details.set('elevationGain', {
                name: `${browser.i18n.getMessage("detailsElevationGain")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            });
        }
        return details;
    }

    function getCyclingDetails(activity) {
        let details = new Map();
        if (typeof activity.distance === 'number') {
            details.set('distance', {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            });
        }
        if (typeof activity.duration === 'number') {
            details.set('duration', {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
            });
        }
        if (typeof activity.calories === 'number') {
            details.set('calories', {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            });
        }
        if (typeof activity.averageSpeed === 'number') {
            details.set('averageSpeed', {
                name: `${browser.i18n.getMessage("detailsSpeed")} [km/h]`,
                value: Qty(activity.averageSpeed, 'm/s').to('km/h').toPrec(0.01).scalar.toLocaleString()
            });
        }
        if (typeof activity.elevationGain === 'number') {
            details.set('elevationGain', {
                name: `${browser.i18n.getMessage("detailsElevationGain")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            });
        }
        return details;
    }

    function getSwimmingDetails(activity) {
        let details = new Map();
        if (typeof activity.distance === 'number') {
            details.set('distance', {
                name: `${browser.i18n.getMessage("detailsDistance")} [m]`,
                value: Qty(activity.distance, 'm').toPrec(1).scalar.toLocaleString()
            });
        }
        if (typeof activity.duration === 'number') {
            details.set('duration', {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format('HH:mm:ss')
            });
        }
        if (typeof activity.calories === 'number') {
            details.set('calories', {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            });
        }
        if (typeof activity.averageSpeed === 'number') {
            details.set('averageSpeed', {
                name: `${browser.i18n.getMessage("detailsPace")} [min/100m]`,
                value: moment.duration(Qty(activity.averageSpeed, 'm/s').inverse().toPrec(0.01).scalar*100, 'seconds').format('m:ss')
            });
        }
        return details;
    }

    function getOtherDetails(activity) {
        let details = new Map();
        if (typeof activity.distance === 'number') {
            details.set('distance', {
                name: `${browser.i18n.getMessage("detailsDistance")} [km]`,
                value: Qty(activity.distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()
            });
        }
        if (typeof activity.duration === 'number') {
            details.set('duration', {
                name: `${browser.i18n.getMessage("detailsTime")}`,
                value: moment.duration(activity.duration, 'seconds').format("HH:mm:ss")
            });
        }
        if (typeof activity.calories === 'number') {
            details.set('calories', {
                name: `${browser.i18n.getMessage("detailsCalories")} [kcal]`,
                value: activity.calories.toLocaleString()
            });
        }
        if (typeof activity.averageSpeed === 'number') {
            details.set('averageSpeed', {
                name: `${browser.i18n.getMessage("detailsSpeed")} [km/h]`,
                value: Qty(activity.averageSpeed, 'm/s').to('km/h').toPrec(0.01).scalar.toLocaleString()
            });
        }
        if (typeof activity.elevationGain === 'number') {
            details.set('elevationGain', {
                name: `${browser.i18n.getMessage("detailsSpeed")} [m]`,
                value: Qty(activity.elevationGain, 'm').toPrec(0.01).scalar.toLocaleString()
            });
        }
        return details;
    }

    function getActivityViewModel(activity) {
        let viewModel = {
            title: browser.i18n.getMessage("activity"),
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

    function getWeekSummary(year, week) {
        let summary = new Map();
        summary.set('total', {
            duration: 0,
            distance: 0
        });
        for (var [activityId, activity] of activityCache) {
            let startTime = moment(activity.startTimeLocal);
            if (year === startTime.year() && week === startTime.week()) {
                summary.get('total').duration += activity.duration
                summary.get('total').distance += activity.distance
                switch (activity.activityType.typeKey.split('_').pop()) {
                    case "running":
                        if (!summary.has('running')) {
                            summary.set('running', {
                                duration: activity.duration,
                                distance: activity.distance
                            });
                        }
                        else {
                            summary.get('running').duration += activity.duration;
                            summary.get('running').distance += activity.distance;
                        }
                        break;
                    case "cycling":
                        if (!summary.has('cycling')) {
                            summary.set('cycling', {
                                duration: activity.duration,
                                distance: activity.distance
                            });
                        }
                        else {
                            summary.get('cycling').duration += activity.duration;
                            summary.get('cycling').distance += activity.distance;
                        }
                        break;
                    case "swimming":
                        if (!summary.has('swimming')) {
                            summary.set('swimming', {
                                duration: activity.duration,
                                distance: activity.distance
                            });
                        }
                        else {
                            summary.get('swimming').duration += activity.duration;
                            summary.get('swimming').distance += activity.distance;
                        }
                        break;
                    default:
                        if (!summary.has('other')) {
                            summary.set('other', {
                                duration: activity.duration,
                                distance: activity.distance
                            });
                        }
                        else {
                            summary.get('other').duration += activity.duration;
                            summary.get('other').distance += activity.distance;
                        }
                        break;
                }
            }
        }
        return summary;
    }

    function getWeekViewModel(year, week, summary) {
        let viewModel = {
            title: browser.i18n.getMessage("summary"),
            timePeriod: `${browser.i18n.getMessage("week")} ${week} ${year}`,
            summary: new Map(),
            activities: new Map()
        };
        viewModel.summary.set('total', {
            name: `${browser.i18n.getMessage("activityTotal")}`,
            details: [
                `${moment.duration(summary.get('total').duration, 'seconds').format("HH:mm:ss")}`,
                `${Qty(summary.get('total').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
            ]
        });
        if (summary.has('swimming')) {
            viewModel.summary.set('swimming', {
                name: `${browser.i18n.getMessage("activitySwimming")}`,
                details: [
                    `${moment.duration(summary.get('swimming').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.get('swimming').distance, 'm').toPrec(1).scalar.toLocaleString()} m`
                ]
            });
        }
        if (summary.has('running')) {
            viewModel.summary.set('running', {
                name: `${browser.i18n.getMessage("activityRunning")}`,
                details: [
                    `${moment.duration(summary.get('running').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.get('running').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        if (summary.has('cycling')) {
            viewModel.summary.set('cycling', {
                name: `${browser.i18n.getMessage("activityCycling")}`,
                details: [
                    `${moment.duration(summary.get('cycling').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.get('cycling').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        if (summary.has('other')) {
            viewModel.summary.set('other', {
                name: `${browser.i18n.getMessage("activityOther")}`,
                details: [
                    `${moment.duration(summary.get('other').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summary.get('other').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        return viewModel;
    }

    function getViewModel() {
        let viewModel = {
            years: new Map()
        };
        for (var [activityId, activity] of activityCache) {
            let startTime = moment(activity.startTimeLocal);
            let year = startTime.year();
            if (!viewModel.years.has(year)) {
                viewModel.years.set(year, {
                    weeks: new Map()
                });
            }
            let week = startTime.week();
            if (!viewModel.years.get(year).weeks.has(week)) {
                let summary = getWeekSummary(year, week);
                viewModel.years.get(year).weeks.set(week, getWeekViewModel(year, week, summary));
            }
            viewModel.years.get(year).weeks.get(week).activities.set(activityId, getActivityViewModel(activity));
        }
        return viewModel;
    }

    function loadActivities(displayName, start, limit) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://connect.garmin.com/modern/proxy/activitylist-service/activities/${displayName}?start=${start}&limit=${limit}&_=${Math.floor(Math.random() * Math.floor(9999999999999))}`
            }).done((result) => {
                resolve(result);
            });
        });
    }
    
    function loadRemainingActivities(displayName, start, limit) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://connect.garmin.com/modern/proxy/activitylist-service/activities/${displayName}?start=${start}&limit=${limit}&_=${Math.floor(Math.random() * Math.floor(9999999999999))}`
            }).done((result) => {
                resolve(result);
            });
        });
    }

    function updateCache(result) {
        for (let i = 0; i < result.activityList.length; i++) {
            activityCache.set(result.activityList[i].activityId, result.activityList[i]);
        }
    }

    function sendViewModel(viewModel, tabId) {
        return new Promise((resolve, reject) => {
            browser.tabs.sendMessage(tabId, {
                viewModel: viewModel
            });
        });
    }

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        loadActivities(request.displayName, request.start, request.limit).then((result) => {
            updateCache(result);
        }).then(() => {
            return loadRemainingActivities(request.displayName, request.start + request.limit, 10);
        }).then((result) => {
            updateCache(result);
        }).then((result) => {
            return sendViewModel(getViewModel(), sender.tab.id);
        }).catch((error) => {
            console.log(error);
        });
    });
})(jQuery);