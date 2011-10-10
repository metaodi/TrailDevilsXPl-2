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
        Ext.apply(traildevils.views, {
            trailsList: new traildevils.views.TrailsList(),
            trailDetailPanel: new traildevils.views.TrailDetailPanel()
        });
		
        this.items = [
            traildevils.views.trailsList,
            traildevils.views.trailDetailPanel
        ]

        traildevils.views.TrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailListPanel
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);
