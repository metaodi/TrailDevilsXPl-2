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
		traildevils.views.geoLocation = new Ext.util.GeoLocation({
			firstUpdate: true,
			
			listeners: {
				locationupdate: function(geo) {
					if(this.firstUpdate) {
						traildevils.store.load({
							scope: this,
							callback: function(records, operation, success) {
								traildevils.views.trailsList.refresh();
							}
						});
						this.firstUpdate = false;
					} else {
						traildevils.store.updateDistances();
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
			},
			
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
		
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		traildevils.views.trailsMapPanel = traildevils.views.viewport.getComponent('trailsMapPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
	}
});
