/**
 * @class traildevils.views.Viewport
 * @extends Ext.TabPanel
 * 
 * The viewport is the application's shell - the parts of the UI that don't change. 
 * 
 */
traildevils.views.Viewport = Ext.extend(Ext.TabPanel, {
	id: 'traildevils',
	fullscreen: true,
	
	initComponent: function() {
		this.items = [
			{ xtype: 'trailsListMainPanel', id: 'trailsListMainPanel' },
			{ xtype: 'trailsMapMainPanel', id: 'trailsMapMainPanel' }
		];
		
		this.tabBar = {
			dock: 'bottom',
			scroll: {
				direction: 'horizontal'
			},
			layout: {
				align: 'left'
			}
		};
		
		this.listeners = {
			beforecardswitch: function(container, newCard, oldCard, index, animated) {
				if(newCard === traildevils.views.trailsMapMainPanel) {
					// if trailsMap is opened and map is already rendered redraw all markers
					if(traildevils.views.trailsMap.rendered) {
						Ext.dispatch({
							controller: traildevils.controllers.trailsMapController,
							action: 'addMarkers'
						});
					}
				}
				
				// TODO implement this in controllers
				if(oldCard === traildevils.views.trailsMapMainPanel) {
					// if another tab than trailsMap is selected set current view of trailsMap back to map
					traildevils.views.trailsMapMainPanel.setActiveItem('trailsMapPanel', false);
				}
				if(oldCard === traildevils.views.trailsListMainPanel) {
					// if another tab than trailsList is selected set current view of trailsList back to list
					traildevils.views.trailsListMainPanel.setActiveItem('trailsListPanel', false);
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
