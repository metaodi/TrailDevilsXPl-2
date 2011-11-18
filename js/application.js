/**
 * This file sets up the Traildevils application. We register an application called 'traildevils'.
 * This automatically sets up a global variable with the same name and the following namespaces:
 * - traildevils.controllers
 * - traildevils.views
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
		traildevils.store = Ext.getStore('TrailsLocal');
		traildevils.remotestore = Ext.getStore('Trails');
		
		//app is offline until told otherwise
		traildevils.online = false;
		
		// get current geolocation
		traildevils.geo = new traildevils.util.TrailGeoLocation();
		traildevils.geo.updateLocation(function() {
			traildevils.store.loadPage(1);
		});
		traildevils.geo.setAutoUpdate(true);
		
		
		// initialize viewport
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		traildevils.views.trailsMapMainPanel = traildevils.views.viewport.getComponent('trailsMapMainPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
		traildevils.views.trailsListSearchToolbar = traildevils.views.trailsListPanel.getComponent('trailsListSearchToolbar');
		
		// trailsListSearchToolbar Components
		traildevils.views.trailsListSearch = traildevils.views.trailsListSearchToolbar.getComponent('trailsListSearch');
		
		
		traildevils.views.trailsMap = Ext.getCmp('trailsMap');
	}
});
