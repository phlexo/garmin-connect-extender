define([
    'models/user/ViewerUserPreferences',
    'models/user/ViewerSocialProfile',
    'models/user/ViewerUserBiometrics',
], function(viewerUserPreferences, viewerSocialProfile, viewerUserBiometrics) {
    Window.App.MATSupportPage = function() {
        // We require the view here, rather than in the define() above. This is to ensure a lightweight
        // router that downloads its resources on demand.
        var _this = this;
        require([
            'views/main/react/ReactComponentPageView'
        ], function(ReactComponentPageView) {
            Window.App.displayPage(new ReactComponentPageView({
                userPreferences : _this.userPreferences,
                page: MATSupportPageComponent // Global from web-react
            }));
        });
    };

    Window.App.ProfilePage = function(displayName) {
        require([
            'views/main/react/ReactComponentPageView'
        ], function(ReactComponentPageView) {
            var viewerSocialProfileJson = viewerSocialProfile.toJSON();

            Window.App.displayPage(new ReactComponentPageView({
                displayName: displayName || viewerSocialProfileJson.displayName,
                viewerSocialProfile: viewerSocialProfileJson,
                page: ProfilePage
            }));
        });
    };

    Window.App.CalendarPage = function(year, month, queryString) {
        require([
            'views/main/react/ReactComponentPageView'
        ], function(ReactComponentPageView) {
            Window.App.displayPage(new ReactComponentPageView({
                viewerUserPreferences: viewerUserPreferences.toJSON(),
                viewerUserBiometrics: viewerUserBiometrics.toJSON(),
                page: CalendarPage,
                year: year,
                month: month,
                code: queryString
            }));
        });
    };

    Window.App.CreateSegmentFromActivity = function(activityId) {
        require([
            'views/main/react/ReactComponentPageView'
        ], function(ReactComponentPageView) {
            var viewerSocialProfileJson = viewerSocialProfile.toJSON();
            Window.App.displayPage(new ReactComponentPageView({
                viewerUserPreferences: viewerUserPreferences.toJSON(),
                viewerUserBiometrics: viewerUserBiometrics.toJSON(),
                viewerSocialProfileJson: viewerSocialProfileJson,
                page: CreateSegmentFromActivityPage,
                activityId: activityId,
                displayName: viewerSocialProfileJson.displayName
            }));
        });
    };

    Window.App.DivingPage = function() {
        require([
            'views/main/react/ReactComponentPageView'
        ], function(ReactComponentPageView) {
            var viewerSocialProfileJson = viewerSocialProfile.toJSON();

            Window.App.displayPage(new ReactComponentPageView({
                displayName: viewerSocialProfileJson.displayName,
                viewerSocialProfile: viewerSocialProfileJson,
                page: DivingPage
            }));
        });
    };

    Window.App.route('admin/support-tool-mat','MATSupportPage');
    Window.App.route('profile(/:displayName)', 'ProfilePage');
    Window.App.route('calendar(/:year/:month)', 'CalendarPage');
    if(viewerSocialProfile.get('userRoles').indexOf("ROLE_MBTESTER") > -1) {
        Window.App.route('segment/createFromActivity(/:activityId)', 'CreateSegmentFromActivity');
    }
    Window.App.route('diving', 'DivingPage');
});