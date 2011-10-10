/**
 * This file sets up the TrailDevils application. We register an application called 'traildevils' - this automatically sets up
 * a global variable with the same name.
 * 
 */ 
Ext.regApplication({
	name: 'traildevils',
	tabletStartupScreen: 'view/images/phone_startup.jpg',
	phoneStartupScreen: 'view/images/phone_startup.jpg',
	icon: 'view/images/app_icon.jpg',
	glossOnIcon: true,
	
	launch: function() {
		traildevils.views.viewport = new traildevils.views.Viewport();
		
		// viewport Components
		traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		
		// trailsListMainPanel Components
		traildevils.views.trailsListPanel = traildevils.views.trailsListMainPanel.getComponent('trailsListPanel');
		traildevils.views.trailDetailPanel = traildevils.views.trailsListMainPanel.getComponent('trailDetailPanel');
		
		// trailsListPanel Components
		traildevils.views.trailsList = traildevils.views.trailsListPanel.getComponent('trailsList');
		
		// trailDetailPanel Components
		traildevils.views.trailDetailContentPanel = traildevils.views.trailDetailPanel.getComponent('trailDetailContentPanel');
	}
});
