/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsMap = Ext.extend(Ext.Map, {
	fullscreen: true,
	useCurrentLocation: true,   // Gets user's current location
	mapOptions: {
		zoom: 12
	}
});

// Create xtype trailsMap
Ext.reg('trailsMap', traildevils.views.TrailsMap);