/**
 * @class traildevils.util.TrailGeoLocation
 * @extends Ext.util.GeoLocation
 * 
 */

traildevils.views.TrailGeoLocation = Ext.extend(Ext.util.GeoLocation, {
    getDistance: function(lat, lng) {
        var earthRadius = 6371; // km
		var dLat = (lat - this.latitude).toRad();
		var dLon = (lng - this.longitude).toRad();
		var thisLatitude = this.latitude.toRad();
		var otherLatitude = lat.toRad();

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(thisLatitude) * Math.cos(otherLatitude); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		return earthRadius * c;
    }
});
