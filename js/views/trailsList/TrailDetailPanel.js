/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
        this.items = [
			{ xtype: 'trailDetailContentPanel', id: 'trailDetailContentPanel' }
        ];
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				title: 'Traildetail',
				items: [
					{
						text: 'Zurück',
						ui: 'back',
						handler: function(button, event) {
							Ext.dispatch({
								controller: traildevils.controllers.trailsListController,
								action: 'index'
							})
						}
					},
					{ xtype: 'spacer' },
					{ iconCls: 'star', iconMask: true, ui: 'plain' }
				]
			}
		];
		
        traildevils.views.TrailDetailPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailDetailPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);