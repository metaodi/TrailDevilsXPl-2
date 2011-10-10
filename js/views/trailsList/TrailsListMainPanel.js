/**
 * @class traildevils.views.TrailsListMainPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListMainPanel = Ext.extend(Ext.Panel, {
	iconCls: 'maps',
	title: 'Trails',
	layout: 'card',
    cardSwitchAnimation: 'slide',
	
	initComponent: function () {
        this.items = [
            traildevils.views.TrailsListPanel = new traildevils.views.TrailsListPanel(),
            traildevils.views.TrailDetailPanel = new traildevils.views.TrailDetailPanel()
        ]

        traildevils.views.TrailsListMainPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailsListMainPanel
Ext.reg('trailsListMainPanel', traildevils.views.TrailsListMainPanel);
