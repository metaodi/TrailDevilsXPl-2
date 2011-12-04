Ext.regController('detail', {
	showTrailDetail: function(options) {
		traildevils.views.trailDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			origin: options.origin,
			parentType: options.parentType,
			trail: options.trail
		});
		
		if(options.parentType === 'normal') {
			if(options.origin === 'trails') {
				traildevils.views.trailDetailTabPanel.backBtn.setHandler(
					function() {
						Ext.dispatch({
							controller: traildevils.controllers.trailsController,
							action: 'showTrailsList'
						});
					}
				);
				traildevils.views.trailDetailTabPanel.backBtn.setText('Trails');
				traildevils.views.trailsListMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
			} else if(options.origin === 'map') {
				traildevils.views.trailDetailTabPanel.backBtn.setHandler(
					function() {
						Ext.dispatch({
							controller: traildevils.controllers.mapController,
							action: 'showMap'
						});
					}
				);
				traildevils.views.trailDetailTabPanel.backBtn.setText('Map');
				traildevils.views.trailsMapMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
			}
		} else if(options.parentType === 'favorite') {
			if(options.origin === 'favorite') {
				// change favorite button to remove favorite button
				traildevils.views.trailDetailTabPanel.favoriteBtn.setIconClass('trash');
				traildevils.views.trailDetailTabPanel.favoriteBtn.setHandler(
					function() {
						Ext.dispatch({
							controller: traildevils.controllers.favoriteController,
							action: 'removeFavorite',
							trail: this.trail
						});
					}
				);
				
				traildevils.views.trailDetailTabPanel.backBtn.setHandler(
					function() {
						Ext.dispatch({
							controller: traildevils.controllers.favoriteController,
							action: 'showFavoriteList'
						});
					}
				);
				traildevils.views.trailDetailTabPanel.backBtn.setText('Favoriten');
				traildevils.views.favoriteTrailsListMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
			} else if(options.origin === 'map') {
				// hide remove from favorite button if detailpanel is opened from map with favorites shown
				traildevils.views.trailDetailTabPanel.favoriteBtn.hide();
				traildevils.views.trailDetailTabPanel.backBtn.setHandler(
					function() {
						Ext.dispatch({
							controller: traildevils.controllers.mapController,
							action: 'showMap'
						});
					}
				);
				traildevils.views.trailDetailTabPanel.backBtn.setText('Map');
				traildevils.views.trailsMapMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
			}
		}
	},
	
    openMediaCarousel: function(options) {
		var mediaCarousel = new Ext.Carousel({
            indicator: true,
            defaults: {
                scroll: 'vertical'
            }
        });
		
		// adding images to carousel
		for(var i = 0; i < options.imgdata.length; i++) {
			var cls = 'trailDetailMediaCarouselImagePanel';
			if(i == 0) {
				cls += ' first';
			} else if(i == (options.imgdata.length - 1)) {
				cls += ' last';
			}
			mediaCarousel.add({
				xtype: 'trailDetailMediaCarouselImagePanel',
				image: options.imgdata[i],
				cls: cls,
				// scroll-flag has to be set in definition. doesn't work in class directly.
				scroll: false
			});
		}
		
		traildevils.views.trailDetailMediaCarouselSheet = new traildevils.views.TrailDetailMediaCarouselSheet({
			carousel: mediaCarousel,
			activeCarouselItem: options.index
		});
		traildevils.views.trailDetailMediaCarouselSheet.show();
		
	},
	
	closeMediaCarousel: function(options) {
		traildevils.views.trailDetailMediaCarouselSheet.hide();
	},
	
	carouselImagePanelTap: function(options) {
		// doesn't work on orientation change (should relayout the carousel sheet)
		var sheetToolbar = traildevils.views.trailDetailMediaCarouselSheet.sheetToolbar;
		if(sheetToolbar.isHidden()) {
			sheetToolbar.rendered = true;
			sheetToolbar.show();
		} else {
			sheetToolbar.hide();
			sheetToolbar.rendered = false;
		}
		traildevils.views.trailDetailMediaCarouselSheet.doComponentLayout();
	}
});

traildevils.controllers.detailController = Ext.ControllerManager.get('detail');