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
		Ext.apply(this, {
			items: [
				{ xtype: 'trailsListMainPanel', id: 'trailsListMainPanel' },
				{ xtype: 'trailsMapMainPanel', id: 'trailsMapMainPanel' }
			],
			
			tabBar: {
				dock: 'bottom',
				scroll: {
					direction: 'horizontal'
				},
				layout: {
					align: 'left'
				}
			}
		});
		
        traildevils.views.Viewport.superclass.initComponent.call(this);
	}
});
