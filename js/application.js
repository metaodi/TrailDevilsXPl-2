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
	statusBarStyle: 'black',
	fullscreen: true,
	
	launch: function() {
		// app is offline until told otherwise
		traildevils.online = false;
		
		// initialize store
		traildevils.store = Ext.getStore('TrailsLocal');
		traildevils.remotestore = Ext.getStore('Trails');
		traildevils.favoritestore = Ext.getStore('FavoriteTrailsLocal');
		
		// add loadmask to remotestore
		traildevils.remotestore.loadMask = new Ext.LoadMask(Ext.getBody(), {
			msg: 'Lade Trails...',
			store: traildevils.remotestore
		});
		
		// get current geolocation
		traildevils.geo = new traildevils.util.TrailGeoLocation();
		traildevils.geo.updateLocation(function() {
			traildevils.favoritestore.load();
			traildevils.store.load();
		});
		traildevils.geo.setAutoUpdate(true);
		
		// initialize viewport
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// make components globally available
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		traildevils.views.trailsMapMainPanel = traildevils.views.viewport.getComponent('trailsMapMainPanel');
		traildevils.views.favoriteTrailsListMainPanel = traildevils.views.viewport.getComponent('favoriteTrailsListMainPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
		traildevils.views.trailsListSearchToolbar = traildevils.views.trailsListPanel.getComponent('trailsListSearchToolbar');
		// trailsListSearchToolbar Components
		traildevils.views.trailsListSearch = traildevils.views.trailsListSearchToolbar.getComponent('trailsListSearch');
		
		// trailsMapMainPanel Components
		traildevils.views.trailsMapPanel = traildevils.views.trailsMapMainPanel.getComponent('trailsMapPanel');
		// trailsMapPanel Components
		traildevils.views.trailsMap = traildevils.views.trailsMapPanel.getComponent('trailsMap');
		
		// favoriteTrailsList
		traildevils.views.favoriteTrailsList = Ext.getCmp('favoriteTrailsList');
		
		
		//add log listener for all relevant events
		traildevils.on({
			scope: this,
			storedatachanged: function() {this.logEvent('[traildevils.store] datachanged')},
			storedatarefreshed: function() {this.logEvent('[traildevils.store] datarefreshed')},
			beforestoreload: function() {this.logEvent('[traildevils.store] beforestoreload')},
			favoritedatachanged: function() {this.logEvent('[traildevils.favoritestore] datachanged')},
			locationchanged: function() {this.logEvent('[traildevils.geo] locationchanged')}
		});
	},
	
	logEvent: function(eventname) {
		console.log('Event fired: ' + eventname);
	}
});
