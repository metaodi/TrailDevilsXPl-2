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
		//traildevils.store = Ext.getStore('Trails');
		traildevils.store = Ext.getStore('TrailsLocal');
		traildevils.remotestore = Ext.getStore('Trails');
		
		
		// get current geolocation
		traildevils.views.geoLocation = new traildevils.views.TrailGeoLocation({
			listeners: {
				firstUpdate: true,
				
				locationupdate: function(geo) {
					if(this.firstUpdate) {
						// load first page of data
						traildevils.store.loadPage(1);
						this.firstUpdate = false;
					} else {
						traildevils.store.updateDistances();
						traildevils.store.sort();
						traildevils.views.trailsList.refresh();
					}
				},
				locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
					if(bTimeout){
						console.log('Timeout occurred.');
					} else {
						console.log('Error occurred.');
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
		
		
		traildevils.views.trailsMap = Ext.getCmp('trailsMap');
	}
});
