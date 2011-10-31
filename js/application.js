/**
 * This file sets up the TrailDevils application. We register an application called 'traildevils' - this automatically sets up
 * a global variable with the same name.
 * 
 */ 
Ext.regApplication({
	name: 'traildevils',
	tabletStartupScreen: 'resources/images/phone_startup.jpg',
	phoneStartupScreen: 'resources/images/phone_startup.jpg',
	icon: 'resources/images/app_icon.jpg',
	glossOnIcon: true,
	//defaultUrl: 'list',
	statusBarStyle: 'black',
	fullscreen: true,
	
	launch: function() {
		/** Converts numeric degrees to radians */
		if (typeof(Number.prototype.toRad) === "undefined") {
			Number.prototype.toRad = function() {
				return this * Math.PI / 180;
			}
		}
		
		// initialize store
		traildevils.store = Ext.getStore('Trails');
		
		// get current geolocation
		traildevils.views.geoLocation = new traildevils.views.TrailGeoLocation({
			listeners: {
				firstUpdate: true,
				
				locationupdate: function(geo) {
					if(this.firstUpdate) {
						traildevils.store.load();
						this.firstUpdate = false;
					} else {
						traildevils.store.updateDistances();
						traildevils.store.sort();
						traildevils.views.trailsList.refresh();
					}
				},
				locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					if(bTimeout){
						alert('Timeout occurred.');
					} else {
						alert('Error occurred.');
					}
				}
			}
		});
		
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		traildevils.views.trailsMapMainPanel = traildevils.views.viewport.getComponent('trailsMapMainPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
	}
});
