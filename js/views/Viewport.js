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
			// after cardswitch
			cardswitch: function(container, newCard, oldCard, index, animated) {
				if(newCard === traildevils.views.trailsMapMainPanel) {
					// if trailsMap is opened redraw all markers
					Ext.dispatch({
						controller: traildevils.controllers.mapController,
						action: 'addMarkers'
					});
				}
				if(oldCard === traildevils.views.trailsMapMainPanel) {
					// if trailsMap is closed reset all controller options
					traildevils.controllers.mapController.resetControllerOptions();
				}
				if(oldCard === traildevils.views.favoriteTrailsListMainPanel) {
					// if another tab than favoriteTrailsList is selected set current view of favoriteTrailsList back to list
					traildevils.views.favoriteTrailsListMainPanel.setActiveItem('favoriteTrailsListPanel', false);
					// hide open list options
					traildevils.views.favoriteTrailsList.listOptionsPlugin.doHideOptionsMenuWithoutAnim();
				}
				if(oldCard === traildevils.views.trailsMapMainPanel) {
					// if another tab than trailsMap is selected set current view of trailsMap back to map
					traildevils.views.trailsMapMainPanel.setActiveItem('trailsMapPanel', false);
				}
				if(oldCard === traildevils.views.trailsListMainPanel) {
					// if another tab than trailsList is selected set current view of trailsList back to list
					traildevils.views.trailsListMainPanel.setActiveItem('trailsListPanel', false);
					// hide open list options
					traildevils.views.trailsList.listOptionsPlugin.doHideOptionsMenuWithoutAnim();
				}
				
				// destory detail panel on each cardswitch
				if(traildevils.views.trailDetailTabPanel !== undefined && !traildevils.views.trailDetailTabPanel.isDestroyed) {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			}
		};
		
        traildevils.views.Viewport.superclass.initComponent.call(this);
	}
});