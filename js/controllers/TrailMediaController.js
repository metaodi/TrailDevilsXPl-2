Ext.regController('TrailMediaController',{
    'index': function() {
		Ext.Msg.alert('TODO', 'Thumbslist laden');
		//traildevils.views.trailDetailMediaPanel.setActiveItem(trailDetailMediaPanelOriginal, 'slide');
	},

    'carousel': function (options) {
		var mediaCarousel = new traildevils.views.TrailDetailMediaCarouselPanel({
			listeners: {
				deactivate: function(mediaCarousel) {
					mediaCarousel.destroy();
				}
			}
		});

		for(var i = 0; i < options.imgdata.length; i++) {
			mediaCarousel.carousel.add({
				html: '<div class="img" style="background: url('+options.imgdata[i].data.path+'); width: 300px; height: 400px;"></div>'
			});
		}
		
		traildevils.views.trailDetailMediaPanel.setActiveItem(mediaCarousel, 'slide');
		mediaCarousel.carousel.setActiveItem(options.index);
	}
});

traildevils.controllers.trailMediaController = Ext.ControllerManager.get('TrailMediaController');