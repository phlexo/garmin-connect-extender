(function ($) {
    const debug = true;

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

    function getWeekSummary(year, week, result) {
        let summary = new Map();
        summary.set('total', {
            duration: 0,
            distance: 0
        });
        for (let i = 0; i < result.activityList.length; i++) {
            let startTime = moment(result.activityList[i].startTimeLocal);
            if (year === startTime.year() && week === startTime.week()) {
                summary.get('total').duration += result.activityList[i].duration
                summary.get('total').distance += result.activityList[i].distance
                switch (result.activityList[i].activityType.typeKey.split('_').pop()) {
                    case "running":
                        if (!summary.has('running')) {
                            summary.set('running', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summary.get('running').duration += result.activityList[i].duration;
                            summary.get('running').distance += result.activityList[i].distance;
                        }
                        break;
                    case "cycling":
                        if (!summary.has('cycling')) {
                            summary.set('cycling', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summary.get('cycling').duration += result.activityList[i].duration;
                            summary.get('cycling').distance += result.activityList[i].distance;
                        }
                        break;
                    case "swimming":
                        if (!summary.has('swimming')) {
                            summary.set('swimming', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summary.get('swimming').duration += result.activityList[i].duration;
                            summary.get('swimming').distance += result.activityList[i].distance;
                        }
                        break;
                    default:
                        if (!summary.has('other')) {
                            summary.set('other', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summary.get('other').duration += result.activityList[i].duration;
                            summary.get('other').distance += result.activityList[i].distance;
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

    function getViewModel(result) {
        let viewModel = {
            years: new Map()
        };
        for (let i = 0; i < result.activityList.length; i++) {
            let startTime = moment(result.activityList[i].startTimeLocal);
            let year = startTime.year();
            if (!viewModel.years.has(year)) {
                viewModel.years.set(year, {
                    weeks: new Map()
                });
            }
            let week = startTime.week();
            if (!viewModel.years.get(year).weeks.has(week)) {
                let summary = getWeekSummary(year, week, result);
                viewModel.years.get(year).weeks.set(week, getWeekViewModel(year, week, summary));
            }
            viewModel.years.get(year).weeks.get(week).activities.set(result.activityList[i].activityId, getActivityViewModel(result.activityList[i]));
        }
        return viewModel;
    }

    function loadActivities(displayName, start, limit) {
        return new Promise((resolve, reject) => {
            if (debug) {
                resolve(new Mock().getActivityList());
            }
            else {
                $.ajax({
                    url: `https://connect.garmin.com/modern/proxy/activitylist-service/activities/${displayName}?start=${start}&limit=${limit}&_=${Math.floor(Math.random() * Math.floor(9999999999999))}`
                }).done((result) => {
                    resolve(result);
                });
            }
        });
    }

    function sendViewModel(viewModel, tabId) {
        return new Promise((resolve, reject) => {
            browser.tabs.sendMessage(tabId, {
                viewModel: viewModel
            });
        });
    }

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        loadActivities('phlexo', 1, 30).then((result) => {
            var viewModel = getViewModel(result);
            return sendViewModel(viewModel, sender.tab.id);
        }).catch((error) => {
            console.log(error);
        });
    });
})(jQuery);