/**
 * @class traildevils.views.TrailsMapPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsMapPanel = Ext.extend(Ext.Panel, {
	iconCls: 'locate',
	title: 'Map',
	layout: 'fit',
    dockedItems: [{		
		xtype: 'toolbar',
		title: 'Trails in der Nähe'
	}, {
		xtype: 'trailsMap'
	}]
});

// Create xtype trailListPanel
Ext.reg('trailsMapPanel', traildevils.views.TrailsMapPanel);
