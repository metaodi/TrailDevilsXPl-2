Ext.regController('trailmedia', {
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

traildevils.controllers.trailMediaController = Ext.ControllerManager.get('trailmedia');