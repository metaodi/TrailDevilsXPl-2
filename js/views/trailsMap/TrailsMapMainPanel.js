/**
 * @class traildevils.views.TrailsMapMainPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsMapMainPanel = Ext.extend(Ext.Panel, {
	iconCls: 'locate',
	title: 'Map',
	layout: 'card',
	
	initComponent: function () {
		this.items = [
			{ xtype: 'trailsMapPanel', id: 'trailsMapPanel' }
		]
		
        traildevils.views.TrailsMapMainPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsMapMainPanel', traildevils.views.TrailsMapMainPanel);
