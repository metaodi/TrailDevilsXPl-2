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
		this.viewport = new traildevils.Viewport({
            application: this
        });
	}
});
