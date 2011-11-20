/**
 * @class traildevils.views.TrailsMap
 * @extends Ext.Map
 * 
 */

traildevils.views.TrailsMap = Ext.extend(Ext.Map, {
	mapOptions: {
		zoom: 12,
		streetViewControl: false,
		navigationControl: false
	},
	
	setCenterPosition: function(lat, lng) {
		// use panTo() instead of setCenter() because of setCenter doens't really work many times
		this.map.panTo(new google.maps.LatLng(lat, lng));
	}
});

// Create xtype
Ext.reg('trailsMap', traildevils.views.TrailsMap);
