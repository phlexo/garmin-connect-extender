define(["underscore","collections/course/CourseElevations","models/course/CourseElevation"],function(e,t,n){var r=function(e){};return r.prototype.fetch=function(i,s){var o=new t,u=null;e.each(i.geoPoints,function(t){e.each(t.points,function(e){e.elevation=null,u=new n({latitude:e.lat,longitude:e.lng}),o.add(u)})}),o.fetch({success:function(){i.success&&(e.each(i.geoPoints,function(t){e.each(t.points,function(e){e.elevation=o.getElevationByLatLng(e.lat,e.lng)})}),i.success.call(s,i.geoPoints))},error:function(e,t,n){i.error&&i.error.call(s,n,t)}})},r});