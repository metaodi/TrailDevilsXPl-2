/**
 * @class traildevils.views.TrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListPanel = Ext.extend(Ext.Panel, {
	iconCls: 'maps',
	title: 'Trails',
    fullscreen : true,
	dockedItems: [{		
		xtype: 'toolbar',
		title: 'Trailliste'
	}, {
		xtype: 'trailsSearch'
	}, {
		xtype: 'trailsList'
	}]
});

// Create xtype trailListPanel
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);