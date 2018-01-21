require.config({packages:[{name:"less",location:"corp-wellness/js/lib/require-less",main:"less"},{name:"async",location:"corp-wellness/js/lib/",main:"async"}]}),define("corp-wellness/js/routes/MainRoutes",["models/user/ViewerUserPreferences"],function(e){Window.App.myWellnessAdminGroups=function(){Window.App.navigate("profile/"+this.displayName+"/groups",{trigger:!0,replace:!0})},Window.App.groupList=function(r,p){var i=this;require(["corp-wellness/js/pages/group/GroupList"],function(o){var s=new o({userPreferences:e,displayName:r,programId:p});i.displayPage(s)})},Window.App.wellnessAdminGroupDetail=function(r){var p=this;require(["corp-wellness/js/pages/group/GroupDetail"],function(i){var o=new i({groupId:r,userPreferences:e});p.displayPage(o)})},Window.App.participantDetail=function(r,p){var i=this;require(["corp-wellness/js/pages/participant/ParticipantDetail"],function(o){var s=new o({userPreferences:e,displayName:r,programId:p});i.displayPage(s)})},Window.App.groupDetail=function(r,p,i){var o=this;require(["corp-wellness/js/pages/group/GroupDetail"],function(s){var a=new s({userPreferences:e,displayName:r,programId:p,groupId:i});o.displayPage(a)})},Window.App.groupCreate=function(r,p){var i=this;require(["corp-wellness/js/pages/group/GroupCreate"],function(o){var s=new o({userPreferences:e,displayName:r,programId:p});i.displayPage(s)})},Window.App.report=function(r,p){var i=this;require(["corp-wellness/js/pages/report/Report"],function(o){var s=new o({userPreferences:e,programId:r,reportTypeId:p});i.displayPage(s)})},Window.App.programSettings=function(r,p){var i=this;require(["corp-wellness/js/pages/settings/ProgramSettings"],function(o){var s=new o({userPreferences:e,displayName:r,programId:p});i.displayPage(s)})},Window.App.vivohubList=function(){var r=this;require(["corp-wellness/js/pages/vivohub/VivohubList"],function(p){var i=new p({userPreferences:e});r.displayPage(i)})},Window.App.singleVivohub=function(r){var p=this;require(["corp-wellness/js/pages/vivohub/SingleVivohub"],function(i){var o=new i({userPreferences:e,unitId:r});p.displayPage(o)})},Window.App.route("wellnessAdminGroup/:groupId","wellnessAdminGroupDetail"),Window.App.route("profile/:displayName/cwcp/participant/:programId","participantDetail"),Window.App.route("profile/:displayName/cwcp/participant","participantDetail"),Window.App.route("profile/:displayName/cwcp/groups/:programId","groupList"),Window.App.route("profile/:displayName/cwcp/program/:programId/group/:groupId","groupDetail"),Window.App.route("profile/:displayName/cwcp/program/:programId/group/create","groupCreate"),Window.App.route("cwcp/report/program/:programId/reportType/:reportTypeId","report"),Window.App.route("profile/:displayName/cwcp/settings/:programId","programSettings"),Window.App.route("vivohubs","vivohubList"),Window.App.route("vivohubs/:unitId","singleVivohub")});