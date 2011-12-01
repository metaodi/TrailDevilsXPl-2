// create traildevils.util namespace
Ext.namespace('traildevils.util');

/**
 * @class traildevils.util.TrailGeoLocation
 * @extends Ext.util.GeoLocation
 * 
 */

traildevils.util.TrailGeoLocation = Ext.extend(Ext.util.GeoLocation, {
	constructor: function() {
		this.superclass.constructor.call(this);
		this.addEvents('newlocation');
	},
	
	autoUpdate: false,
	available: true,
	
    listeners: {
		locationupdate: function(geo) {
			this.available = true;
			this.fireEvent('newlocation');
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
	},
	
	getFormattedDistance: function(distanceInMeters) {
		if(distanceInMeters > 999) {
			// round to one decimal
			return (Math.round(distanceInMeters / 100) / 10) + "km";
		} else {
			return Math.round(distanceInMeters) + "m";
		}
	}
});

// Create xtype
Ext.reg('trailGeoLocation', traildevils.util.TrailGeoLocation);
