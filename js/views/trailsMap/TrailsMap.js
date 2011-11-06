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
    },
	
	setCenterPosition: function(lat, lng) {
		// use panTo() instead of setCenter() because of setCenter doens't really work many times
		this.map.panTo(new google.maps.LatLng(lat, lng));
	}
});

// Create xtype
Ext.reg('trailsMap', traildevils.views.TrailsMap);
