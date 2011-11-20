/**
 * @class traildevils.views.FavoriteTrailsListPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.FavoriteTrailsListPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
		this.dockedItems = [
			{
				xtype: 'toolbar',
				title: 'Favoriten',
				items: [
					
					{ xtype: 'spacer' },
					{ 
						iconCls: 'locate',
						iconMask: true,
						handler: function() {
							// show favorite trails on map
							Ext.dispatch({
								controller: traildevils.controllers.trailsMapController,
								action: 'showFavoriteTrailsOnMap'
							});
						}
					}
				]
			}
		];
	
        this.items = [
			{ xtype: 'favoriteTrailsList', id: 'favoriteTrailsList' }
        ];

        traildevils.views.FavoriteTrailsListPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('favoriteTrailsListPanel', traildevils.views.FavoriteTrailsListPanel);
