/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	trail: null,
	fullscreen: true,
	
	initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.trail.data.title,
            items: [
				{
					text: 'Zurück',
					ui: 'back',
					handler: function(button, event) {
						Ext.dispatch({
							controller: traildevils.controllers.trailsListController,
							action: 'index',
							detailPanel: this.up()
						});
					}
				},
				{ xtype: 'spacer' },
				{ iconCls: 'star', iconMask: true, ui: 'plain' }
			]
        }];
        
        this.items = [{
			xtype: 'tabpanel',
			items: [
				{
					xtype: 'trailDetailInfoPanel',
					data: this.trail.data
				}, {
					xtype: 'trailDetailMediaMainPanel',
					data: this.trail.data
				}
			]
        }];
        
        traildevils.views.TrailDetailPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailDetailPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);