(function () {
    console.log("FireFox addon background script loaded!")

    function activitiesLoaded(details) {
        var message = "Activities has now been loaded.";
        console.log(message);
        browser.tabs.sendMessage(details.tabId, {
            message: message
        });
    }

    browser.webRequest.onCompleted.addListener(
        activitiesLoaded, {
            urls: ["https://connect.garmin.com/modern/proxy/activitylist-service/activities/list/*"]
        }
    );

    function activitiesRefreshed(details) {
        var message = "Activities has now been refreshed.";
        console.log(message);
        browser.tabs.sendMessage(details.tabId, {
            message: message
        });
    }

    browser.webRequest.onCompleted.addListener(
        activitiesRefreshed, {
            urls: ["https://connect.garmin.com/modern/proxy/activitylist-service/activities/*"]
        }
    );

    browser.runtime.onMessage.addListener(request => {
        console.log(request.message);
    });
})();