define(["backbone"],function(e){return e.Model.extend({getName:function(){return this.get("name")},getCountry:function(){return this.get("country")},getState:function(){return this.get("state")},getCounty:function(){return this.get("county")},getLat:function(){return this.get("lat")},getLon:function(){return this.get("lon")},getFeature:function(){return this.get("feature")},getCountryCode:function(){return this.get("countryCode")}})});