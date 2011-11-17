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
            { xtype: 'trailsListPanel', id: 'trailsListPanel' }
        ];
		
		traildevils.views.TrailsListMainPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsListMainPanel', traildevils.views.TrailsListMainPanel);
