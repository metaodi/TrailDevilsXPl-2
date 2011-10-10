/**
 * @class traildevils.views.TrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListPanel = Ext.extend(Ext.Panel, {
	iconCls: 'maps',
	title: 'Trails',
	layout: 'card',
    cardSwitchAnimation: 'slide',
	
	dockedItems: [{
		xtype: 'toolbar',
		title: 'Trailliste'
	}, {
		xtype: 'toolbar',
		items: [{
			xtype: 'trailsSearch'
		}]
	}],
	
	initComponent: function () {
        this.items = [
            traildevils.views.TrailsList = new traildevils.views.TrailsList()
        ]

        traildevils.views.TrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailsListPanel
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);
