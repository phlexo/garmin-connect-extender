define(["collections/course/PopularityRoutes","views/utils/LeafletMap/utils/Util","views/utils/LeafletMap/utils/MapUtil"],function(e,t,n){var r=function(){};return r.prototype.fetch=function(i,s){var o=i.courseType?t.PopularityRouteTypes[i.courseType.toUpperCase()]||t.PopularityRouteTypes.ROAD_CYCLING:t.PopularityRouteTypes.ROAD_CYCLING,u=new e({startLat:i.start[0],startLon:i.start[1],endLat:i.end[0],endLon:i.end[1],courseType:o}),a=[],f=0,l,c,h;u.fetch({success:function(e,r,o){if(i.success)if(o.xhr.status===200&&e){e.each(function(e){a.push([e.getLatitude(),e.getLongitude(),0,0])});for(l=0;l<e.models.length-1;l++)c=e.models[l],h=e.models[l+1],f+=n.calculateDistanceBetweenPointsInMeters(c.getLatitude(),c.getLongitude(),h.getLatitude(),h.getLongitude());i.success.call(s,{points:a,meters:f})}else o.xhr.status===204?i.error.call(s,o.xhr.statusText,o.xhr.status,t.ErrorCodes.PR_NO_ROUTING_DATA):i.error.call(s,o.xhr.statusText,o.xhr.status,t.ErrorCodes.PR_GENERIC)},error:function(e,n){i.error&&i.error.call(s,n.statusText,n.status,t.ErrorCodes.PR_GENERIC)}})},r});