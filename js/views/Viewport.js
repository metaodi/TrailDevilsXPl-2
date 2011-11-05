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
				if(newCard == traildevils.views.trailsMapMainPanel) {
					// if trailsMap is opened and map is already rendered redraw all markers
					if(traildevils.views.trailsMap.rendered) {
						Ext.dispatch({
							controller: traildevils.controllers.trailsMapController,
							action: 'addMarkers'
						});
					}
				} else {
					// if another view is opened set current view of trailsMap back to map
					Ext.dispatch({
						controller: traildevils.controllers.trailsMapController,
						action: 'map'
					});
				}
			}
		};
		
        traildevils.views.Viewport.superclass.initComponent.call(this);
	}
});
