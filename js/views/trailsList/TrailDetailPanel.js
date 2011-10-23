/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	cls: 'trailDetailPanel',
	trail: null,
	
	initComponent: function() {
		// corp title to max. 12 characters
		var title = this.trail.data.title;
		if(title.length > 12) {
			title = this.trail.data.title.substring(0, 12) + "...";
		}
		
        this.dockedItems = [{
            xtype: 'toolbar',
            title: title,
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
				}/*, {
					xtype: 'trailDetailMediaMainPanel',
					data: this.trail.data
				}*/
			]
        }];
        
        traildevils.views.TrailDetailPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailDetailPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);