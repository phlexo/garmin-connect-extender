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

    function getActivity(activity) {
        let viewModel = {
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

    function getWeek(weekNumber, year, weekName, result) {
        let summaries = new Map();
        summaries.set('total', {
            duration: 0,
            distance: 0
        });
        for (let i = 0; i < result.activityList.length; i++) {
            let tempWeekName = moment(result.activityList[i].startTimeLocal).format('Y_w');
            if (weekName === tempWeekName) {
                summaries.get('total').duration += result.activityList[i].duration
                summaries.get('total').distance += result.activityList[i].distance
                switch (result.activityList[i].activityType.typeKey.split('_').pop()) {
                    case "running":
                        if (!summaries.has('running')) {
                            summaries.set('running', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summaries.get('running').duration += result.activityList[i].duration;
                            summaries.get('running').distance += result.activityList[i].distance;
                        }
                        break;
                    case "cycling":
                        if (!summaries.has('cycling')) {
                            summaries.set('cycling', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summaries.get('cycling').duration += result.activityList[i].duration;
                            summaries.get('cycling').distance += result.activityList[i].distance;
                        }
                        break;
                    case "swimming":
                        if (!summaries.has('swimming')) {
                            summaries.set('swimming', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summaries.get('swimming').duration += result.activityList[i].duration;
                            summaries.get('swimming').distance += result.activityList[i].distance;
                        }
                        break;
                    default:
                        if (!summaries.has('other')) {
                            summaries.set('other', {
                                duration: result.activityList[i].duration,
                                distance: result.activityList[i].distance
                            });
                        }
                        else {
                            summaries.get('other').duration += result.activityList[i].duration;
                            summaries.get('other').distance += result.activityList[i].distance;
                        }
                        break;
                }
            }
        }
        let viewModel = {
            timePeriod: `${browser.i18n.getMessage("week")} ${weekNumber} ${year}`,
            summaries: new Map()
        };
        viewModel.summaries.set('total', {
            name: `${browser.i18n.getMessage("activityTotal")}`,
            details: [
                `${moment.duration(summaries.get('total').duration, 'seconds').format("HH:mm:ss")}`,
                `${Qty(summaries.get('total').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
            ]
        });
        if (summaries.has('swimming')) {
            viewModel.summaries.set('swimming', {
                name: `${browser.i18n.getMessage("activitySwimming")}`,
                details: [
                    `${moment.duration(summaries.get('swimming').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summaries.get('swimming').distance, 'm').toPrec(1).scalar.toLocaleString()} m`
                ]
            });
        }
        if (summaries.has('running')) {
            viewModel.summaries.set('running', {
                name: `${browser.i18n.getMessage("activityRunning")}`,
                details: [
                    `${moment.duration(summaries.get('running').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summaries.get('running').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        if (summaries.has('cycling')) {
            viewModel.summaries.set('cycling', {
                name: `${browser.i18n.getMessage("activityCycling")}`,
                details: [
                    `${moment.duration(summaries.get('cycling').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summaries.get('cycling').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        if (summaries.has('other')) {
            viewModel.summaries.set('other', {
                name: `${browser.i18n.getMessage("activityOther")}`,
                details: [
                    `${moment.duration(summaries.get('other').duration, 'seconds').format("HH:mm:ss")}`,
                    `${Qty(summaries.get('other').distance, 'm').to('km').toPrec(0.01).scalar.toLocaleString()} km`
                ]
            });
        }
        return viewModel;
    }

    function getViewModel(result) {
        let viewModel = {
            id: `gce-container`,
            years: new Map()
        };
        for (let i = 0; i < result.activityList.length; i++) {
            let startTime = moment(result.activityList[i].startTimeLocal);
            let year = startTime.year();
            if (!viewModel.years.has(year)) {
                viewModel.years.set(year, Object.assign({
                    id: `gce-${year}`,
                    weeks: new Map()
                }));
            }
            let week = startTime.week();
            if (!viewModel.years.get(year).weeks.has(week)) {
                viewModel.years.get(year).weeks.set(week, Object.assign({
                    id: `gce-${year}-${week}`,
                    title: browser.i18n.getMessage("summary"),
                    activities: new Map()
                }, getWeek(week, year, `${year}_${week}`, result)));
            }
            viewModel.years.get(year).weeks.get(week).activities.set(result.activityList[i].activityId, Object.assign({
                id: `gce-${result.activityList[i].activityId}`,
                title: browser.i18n.getMessage("activity")
            }, getActivity(result.activityList[i])));
        }
        return viewModel;
    }

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.type) {
            case "feed":
                $.ajax({
                    // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018" // Årlig status
                    // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0" // Januari
                    // url: "https://connect.garmin.com/modern/proxy/calendar-service/year/2018/month/0/day/18/start/1" // Vecka
                    // url: "https://connect.garmin.com/modern/proxy/activity-service/activity/2434047486?_=1516287552093" // Enskild aktivitet
                    url: "https://connect.garmin.com/modern/proxy/activitylist-service/activities/phlexo?start=1&limit=30&_=1516279328566"
                }).done(function(result) {
                    browser.tabs.sendMessage(sender.tab.id, {
                        viewModel: getViewModel(result)
                    });
                });
                break;
            case "feedMock":
                let mock = new Mock();
                let result = mock.getActivityList();
                setTimeout(() => {
                    browser.tabs.sendMessage(sender.tab.id, {
                        viewModel: getViewModel(result)
                    });
                }, 1000);
                break;
        }
    });
})(jQuery);