/**
 * @class traildevils.views.FavoriteTrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.FavoriteTrailsListPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
		this.dockedItems = [
			{ xtype: 'toolbar', title: 'Favoriten' }
		];
	
        this.items = [
			{ xtype: 'favoriteTrailsList', id: 'favoriteTrailsList' }
        ];

        traildevils.views.FavoriteTrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('favoriteTrailsListPanel', traildevils.views.FavoriteTrailsListPanel);
