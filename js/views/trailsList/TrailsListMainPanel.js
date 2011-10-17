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
	activeItem: 'trailsListPanel',
	
	initComponent: function () {
        this.items = [
            { xtype: 'trailsListPanel', id: 'trailsListPanel' }
        ]
		
		traildevils.views.TrailsListMainPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailsListMainPanel
Ext.reg('trailsListMainPanel', traildevils.views.TrailsListMainPanel);
