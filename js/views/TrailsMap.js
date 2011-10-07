/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsMap = Ext.extend(Ext.Map, {
	iconCls: 'locate',
	title: 'Map',
	useCurrentLocation: true,   // Gets user's current location
	mapOptions: {
		  zoom: 12
	}
});

Ext.reg('trailsMap', traildevils.views.TrailsMap);