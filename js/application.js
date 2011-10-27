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
	defaultUrl: 'TrailsListController/index',
	statusBarStyle: 'black',
	fullscreen: true,
	
	launch: function() {
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		traildevils.views.trailsMapPanel = traildevils.views.viewport.getComponent('trailsMapPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
		
		// get current geolocation
		traildevils.views.geoLocation = new Ext.util.GeoLocation({
			getDistance: function(lat, lng) {
				var earthRadius = 6371; // km
				var dLat = (lat - this.latitude).toRad();
				var dLon = (lng - this.longitude).toRad();
				var thisLatitude = this.latitude.toRad();
				var otherLatitude = lat.toRad();

				var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(thisLatitude) * Math.cos(otherLatitude); 
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				return earthRadius * c;
			}
		});
	}
});
