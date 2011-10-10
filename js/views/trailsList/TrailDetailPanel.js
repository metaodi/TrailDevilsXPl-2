/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	
	
	initComponent: function () {
        this.items = [
            traildevils.views.TrailDetailContentPanel = new traildevils.views.TrailDetailContentPanel()
        ];
		
		this.dockedItems = [{
			xtype: 'toolbar',
			title: 'Traildetail',
			items: [{
				xtype: 'button',
				text: 'Zurück',
				ui: 'back',
				handler: function(button, event) {
					Ext.dispatch({
						controller: traildevils.controllers.trailsListController,
						action: 'index'
					})
				}
			}]
		}];
		
        traildevils.views.TrailDetailPanel.superclass.initComponent.apply(this, arguments);
    }
	
	
});

// Create xtype trailDetailPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);