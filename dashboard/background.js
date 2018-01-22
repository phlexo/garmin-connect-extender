(function ($) {
    function getExtendedRunningDetails(activity) {
        return {
            stressScore: {
                name: "Stresspoäng",
                value: 100
            }
        };
    }

    function getRunningDetails(activity) {
        return Object.assign({
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
        }, getExtendedRunningDetails(activity));
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
        let viewModel = {
            title: "Aktivitet",
            id: activity.activityId,
            name: activity.activityName,
            type: activity.activityType.typeKey,
            iconClass: `icon-activity-${activity.activityType.typeKey}`,
            link: `/modern/activity/${activity.activityId}`,
            ownerProfileImageUrlSmall: activity.ownerProfileImageUrlSmall,
            started: activity.startTimeLocal,
            completed: null,
            owner: activity.ownerFullName,
            ownerUrl: `https://connect.garmin.com/modern/profile/${activity.ownerDisplayName}`,
            description: activity.description,
            mapImage: browser.extension.getURL("debug/map.png")
        };
        switch (activity.activityType.typeKey) {
            case "running":
                viewModel.details = getRunningDetails(activity);
                break;
            default:
                viewModel.details = getOtherDetails(activity);
                break;
        }
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
                console.log("Sending live data.");
                console.log(result);
                browser.tabs.sendMessage(tab.id, {
                    feed: resultToFeed(result)
                });
            }
        });
    }

    function mock(tab) {
        console.log("Sending mock data.");
        console.log(resultMock);
        browser.tabs.sendMessage(tab.id, {
            feed: resultToFeed(resultMock)
        });
    }

    browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
        if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
            if (tab.url.match(/file:\/\/\/.*\/debug\/garmin-connect-extender\.html/gi)) {
                console.log("Debug page has been loaded.")
                mock(tab);
            }
            else if (tab.url.match(/https?:\/\/connect.garmin.com\/modern\/dashboard\/.*/gi)) {
                console.log("Live page has been loaded.")
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