/**
 * @class traildevils.views.TrailsMap
 * @extends Ext.Map
 * 
 */

traildevils.views.TrailsMap = Ext.extend(Ext.Map, {
	useCurrentLocation: true,   // Gets user's current location
	mapOptions: {
		zoom: 12
	},

	initComponent: function () {
		this.listeners = {
			maprender: function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsMapController,
					action: 'addMarkers',
					map: this.map
				});
			}
		}
		
        traildevils.views.TrailsMap.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsMap', traildevils.views.TrailsMap);
