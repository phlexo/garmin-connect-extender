define(["backbone"],function(e){return e.Model.extend({getLatitude:function(){return this.get("latitude")},getLongitude:function(){return this.get("longitude")},setLatitude:function(e){return this.set("latitude",e),this},setLongitude:function(e){return this.set("longitude",e),this}})});