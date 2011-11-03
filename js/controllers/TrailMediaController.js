Ext.regController('trailmedia', {
    'openMediaCarousel': function (options) {
		var mediaCarousel = new Ext.Carousel({
            indicator: true,
            defaults: {
                scroll: 'vertical'
            }
        });
		
		// adding images to carousel
		for(var i = 0; i < options.imgdata.length; i++) {
			mediaCarousel.add({
				xtype: 'trailDetailMediaCarouselImagePanel',
				image: options.imgdata[i],
				// scroll-flag has to be set in definition. doesn't work in class directly.
				scroll: false
			});
		}
		
		traildevils.views.mediaCarouselSheet = new traildevils.views.TrailDetailMediaCarouselSheet({
			carousel: mediaCarousel,
			activeCarouselItem: options.index
		});
		traildevils.views.mediaCarouselSheet.show();
		
	},
	
	'closeMediaCarousel': function (options) {
		traildevils.views.mediaCarouselSheet.hide();
	}
});

traildevils.controllers.trailMediaController = Ext.ControllerManager.get('trailmedia');