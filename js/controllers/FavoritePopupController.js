Ext.regController('favoritepopup', {
    'showpopup': function (options) {
		var popupText = 'starred';
		if(!options.favorite) {
			popupText = 'unstarred';
		}
		
		traildevils.views.favoritePopupPanel = new traildevils.views.FavoritePopupPanel({
			popupText: popupText
		});
		
		if(options.favorite) {
			// add active class to popup
			traildevils.views.favoritePopupPanel.addCls('act');
		}
		
		traildevils.views.favoritePopupPanel.show('pop');
		// hide popup after 600ms and destroy it after 1000ms
		setTimeout('traildevils.views.favoritePopupPanel.hide()', 800);
		setTimeout('traildevils.views.favoritePopupPanel.destroy()', 1200);
	}
});

traildevils.controllers.favoritePopupController = Ext.ControllerManager.get('favoritepopup');