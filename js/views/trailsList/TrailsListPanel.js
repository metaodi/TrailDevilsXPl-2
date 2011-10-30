/**
 * @class traildevils.views.TrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
		this.dockedItems = [
			{ xtype: 'toolbar', title: 'Trailliste' },
			{
				xtype: 'toolbar',
				items: [
					{ xtype: 'trailsListSearch' }
				]
			}
		];
	
        this.items = [
			{ xtype: 'trailsList', id: 'trailsList' }
        ];

        traildevils.views.TrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailsListPanel
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);
