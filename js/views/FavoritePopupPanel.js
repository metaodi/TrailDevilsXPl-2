/**
 * @class traildevils.views.FavoritePopupPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.FavoritePopupPanel = Ext.extend(Ext.Panel, {
	floating: true,
	centered: true,
	width: 110,
	height: 110,
	cls: 'favoritePopupPanel',
	popupText: 'unstarred',
	
	initComponent: function() {
		this.html = '<p>' + this.popupText + '</p>';
		
        traildevils.views.FavoritePopupPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('favoritePopupPanel', traildevils.views.FavoritePopupPanel);