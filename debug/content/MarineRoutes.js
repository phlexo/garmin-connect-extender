define("marine/js/routes/MarineRoutes",["models/user/ViewerUserPreferences"],function(e){var r={page:"quickdrawDetails",pageFullScreen:"fullScreen"};Window.App.quickdrawDetails=function(a){var i=this;require(["marine/js/pages/quickdraw_details/QuickdrawPage"],function(u){var n=new u({userPreferences:e,fullPage:a===r.pageFullScreen,routeFragments:r});i.displayPage(n)})},Window.App.route(r.page+"(/:full)","quickdrawDetails")});