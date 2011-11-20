Ext.regController('favoritetrailslist', {
    list: function(options) {
		if(traildevils.views.trailDetailTabPanel === undefined) {
			traildevils.views.favoriteTrailsListMainPanel.setActiveItem(
			'favoriteTrailsListPanel', {
				type: 'slide',
				direction: 'right'
			});
		} else {
			traildevils.views.favoriteTrailsListMainPanel.setActiveItem(
			'favoriteTrailsListPanel', {
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			});
		}
	},

    detail: function(options) {
		traildevils.views.trailDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			origin: 'favorite',
			trail: options.trail
		});
		
		traildevils.views.trailDetailTabPanel.backBtn.setHandler(
			function() {
				Ext.dispatch({
					controller: traildevils.controllers.favoriteTrailsListController,
					action: 'list'
				});
			}
		);
		traildevils.views.trailDetailTabPanel.backBtn.setText('Favoriten');
		
		traildevils.views.favoriteTrailsListMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
	},
	
	showPopup: function(options) {
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

traildevils.controllers.favoriteTrailsListController = Ext.ControllerManager.get('favoritetrailslist');