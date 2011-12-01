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
	
	removeFavorite: function(options) {
		options.trail.toggleFavorite();
		
		// remove trail from favorite store 
		var trailToRemove = traildevils.favoritestore.getById(options.trail.data.id);
		if(trailToRemove !== null) {
			traildevils.favoritestore.removeTrail(trailToRemove);
		}
		
		Ext.dispatch({
			controller: traildevils.controllers.favoriteTrailsListController,
			action: 'list'
		});
		
		if(options.callback !== undefined) {
			options.callback.call(options.scope);
		}
	},
	
	toggleFavorite: function(options) {
		var newFavoriteState = options.trail.toggleFavorite();
		
		if(newFavoriteState) {
			// add trail to favorite store if it isn't there already
			if(traildevils.favoritestore.getById(options.trail.data.id) === null) {
				traildevils.favoritestore.addTrail(options.trail);
			}
		} else {
			// remove trail from favorite store 
			var trailToRemove = traildevils.favoritestore.getById(options.trail.data.id);
			if(trailToRemove !== null) {
				traildevils.favoritestore.removeTrail(trailToRemove);
			}
		}
		
		// show favorite popup
		this.showFavoritePopup(newFavoriteState);
	},
	
	/**
     * Shows the favorite popup panel
     * @private
     */
	showFavoritePopup: function(newFavoriteState) {
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