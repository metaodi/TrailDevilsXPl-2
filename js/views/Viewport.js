/**
 * @class traildevils.views.Viewport
 * @extends Ext.TabPanel
 * 
 */

traildevils.views.Viewport = Ext.extend(Ext.TabPanel, {
	id: 'traildevils',
	fullscreen: true,
	
	initComponent: function() {
		this.items = [
			{ xtype: 'trailsListMainPanel', id: 'trailsListMainPanel' },
			{ xtype: 'trailsMapMainPanel', id: 'trailsMapMainPanel' },
			{ xtype: 'favoriteTrailsListMainPanel', id: 'favoriteTrailsListMainPanel' }
		];
		
		this.tabBar = {
			dock: 'bottom',
			layout: {
				align: 'left'
			}
		};
		
		this.listeners = {
			beforecardswitch: function(container, newCard, oldCard, index, animated) {
				// TODO implement this in controllers
				if(oldCard === traildevils.views.trailsMapMainPanel) {
					// if another tab than trailsMap is selected set current view of trailsMap back to map
					traildevils.views.trailsMapMainPanel.setActiveItem('trailsMapPanel', false);
				}
				if(oldCard === traildevils.views.trailsListMainPanel) {
					// if another tab than trailsList is selected set current view of trailsList back to list
					traildevils.views.trailsListMainPanel.setActiveItem('trailsListPanel', false);
				}
				if(oldCard === traildevils.views.favoriteTrailsListMainPanel) {
					// if another tab than favoriteTrailsList is selected set current view of favoriteTrailsList back to list
					traildevils.views.favoriteTrailsListMainPanel.setActiveItem('favoriteTrailsListPanel', false);
				}
				// destory detail panel on each cardswitch
				if(traildevils.views.trailDetailTabPanel !== undefined && !traildevils.views.trailDetailTabPanel.isDestroyed) {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			},
			// after cardswitch
			cardswitch: function(container, newCard, oldCard, index, animated) {
				if(newCard === traildevils.views.trailsMapMainPanel) {
					// if trailsMap is opened redraw all markers
					Ext.dispatch({
						controller: traildevils.controllers.trailsMapController,
						action: 'addMarkers'
					});
				}
				if(oldCard === traildevils.views.trailsMapMainPanel) {
					// if trailsMap is closed reset all controller options
					traildevils.controllers.trailsMapController.resetControllerOptions();
				}
			}
		};
		
        traildevils.views.Viewport.superclass.initComponent.call(this);
	}
});