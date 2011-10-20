/**
 * @class traildevils.views.TrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListPanel = Ext.extend(Ext.Panel, {	
	layout: 'fit',
	dockedItems: [
		{ xtype: 'toolbar', title: 'Trailliste' },
		{
			xtype: 'toolbar',
			items: [
				{ xtype: 'trailsSearch' }
			]
		}
	],
	
	initComponent: function () {
        this.items = [
			{ xtype: 'trailsList', id: 'trailsList' }
        ]

        traildevils.views.TrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailsListPanel
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);
