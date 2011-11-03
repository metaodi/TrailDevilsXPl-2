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
				scroll: false,
				image: options.imgdata[i],
				layoutOnOrientationChange: true,
				
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				listeners: {
					render: function() {
						var sideToStrech = this.image.getSideToStretch(this.getSize());
						this.data = this.image.data;
						this.tpl = new Ext.XTemplate('<div class="image"><img src="{path}" alt="{name}" style="min-' + sideToStrech + ': 100%; max-' + sideToStrech + ': 100%;" /></div>');
					}
				}
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