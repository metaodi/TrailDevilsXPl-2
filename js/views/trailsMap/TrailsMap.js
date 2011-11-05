/**
 * @class traildevils.views.TrailsMap
 * @extends Ext.Map
 * 
 */

traildevils.views.TrailsMap = Ext.extend(Ext.Map, {
	rendered: false,
	
	mapOptions: {
		zoom: 12,
		streetViewControl: false,
		navigationControl: false
	},

	initComponent: function () {
		this.listeners = {
			maprender: function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsMapController,
					action: 'addMarkers'
				});
				this.rendered = true;
			}
		}
		
        traildevils.views.TrailsMap.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsMap', traildevils.views.TrailsMap);
