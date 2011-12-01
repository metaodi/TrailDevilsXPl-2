/**
 * @class traildevils.views.TrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsListPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
		this.dockedItems = [
			{ xtype: 'toolbar', title: 'Trails' },
			{
				xtype: 'toolbar',
				id: 'trailsListSearchToolbar',
				cls: 'trailsListSearchToolbar',
				ui: 'light',
				
				items: [
					{ xtype: 'trailsListSearch', id: 'trailsListSearch' }
				]
			}
		];
	
        this.items = [
			{ xtype: 'trailsList', id: 'trailsList' }
        ];

        traildevils.views.TrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsListPanel', traildevils.views.TrailsListPanel);
