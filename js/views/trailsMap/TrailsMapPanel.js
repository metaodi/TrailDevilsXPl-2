/**
 * @class traildevils.views.TrailsMapPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsMapPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
		this.dockedItems = [
			{		
				xtype: 'toolbar',
				title: 'Trails in der Nähe'
			}
		];
		
		this.items = [
			{ xtype: 'trailsMap', id: 'trailsMap' }
		]
		
        traildevils.views.TrailsMapPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsMapPanel', traildevils.views.TrailsMapPanel);
