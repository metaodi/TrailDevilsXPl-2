/**
 * @class traildevils.views.FavoriteTrailsListMainPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.FavoriteTrailsListMainPanel = Ext.extend(Ext.Panel, {
	iconCls: 'favorites',
	title: 'Favoriten',
	layout: 'card',
    cardSwitchAnimation: 'slide',
	
	initComponent: function () {
        this.items = [
            { xtype: 'favoriteTrailsListPanel', id: 'favoriteTrailsListPanel' }
        ];
		
		traildevils.views.FavoriteTrailsListMainPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('favoriteTrailsListMainPanel', traildevils.views.FavoriteTrailsListMainPanel);
