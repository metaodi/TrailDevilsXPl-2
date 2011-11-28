// create traildevils.util namespace
Ext.namespace('traildevils.util');

/**
 * @class traildevils.util.TrailGeoLocation
 * @extends Ext.util.GeoLocation
 * 
 */

traildevils.util.TrailGeoLocation = Ext.extend(Ext.util.GeoLocation, {
	autoUpdate: false,
	available: true,
	
    listeners: {
		locationupdate: function(geo) {
			this.available = true;
			traildevils.fireEvent('newlocation');
		},
		locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
			this.available = false;
		}
	},
	
	/* source: http://www.movable-type.co.uk/scripts/latlong.html */
	getDistance: function(lat, lng) {
		var earthRadius = 6371000; // m
		var dLat = (lat - this.latitude).toRad();
		var dLng = (lng - this.longitude).toRad();
		var thisLatitude = this.latitude.toRad();
		var otherLatitude = lat.toRad();

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(thisLatitude) * Math.cos(otherLatitude); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return earthRadius * c;
	}
});

// Create xtype
Ext.reg('trailGeoLocation', traildevils.util.TrailGeoLocation);