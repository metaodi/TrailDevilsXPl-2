Ext.regController('favoritetrailslist', {
    list: function(options) {
		traildevils.views.favoriteTrailsListMainPanel.setActiveItem(
			'favoriteTrailsListPanel', {
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			}
		);
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
	
	toggleFavorite: function(options) {
		var newFavoriteState = options.trail.toggleFavorite();
		
		if(newFavoriteState) {
			// add trail to favorite store 
			traildevils.favoritestore.add(options.trail);
		} else {
			// remove trail from favorite store 
			var trailToRemove = traildevils.favoritestore.getById(options.trail.data.id);
			if(trailToRemove !== undefined) {
				traildevils.favoritestore.remove(trailToRemove);
			}
		}
		
		// show favorite popup
		this.toggleFavoritePopup(newFavoriteState);
	},
	
	/**
     * Removes all markers from map
     * @private
     */
	toggleFavoritePopup: function(newFavoriteState) {
		var popupText = 'starred';
		if(!newFavoriteState) {
			popupText = 'unstarred';
		}
		
		traildevils.views.favoritePopupPanel = new traildevils.views.FavoritePopupPanel({
			popupText: popupText
		});
		
		if(newFavoriteState) {
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