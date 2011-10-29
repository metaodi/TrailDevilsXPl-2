/**
 * @class traildevils.views.TrailDetailMediaCarouselSheet
 * @extends Ext.Sheet
 * 
 */

traildevils.views.TrailDetailMediaCarouselSheet = Ext.extend(Ext.Sheet, {
	title: 'test',
	layout: 'fit',
	fullscreen: true,
	stretchX: true,
	stretchY: true,
	
	// have to be set from the controller
	carousel: null,
	activeCarouselItem: null,
	
	initComponent: function() {
		this.listeners = {
			show: function() {
				this.carousel.setActiveItem(this.activeCarouselItem);
			},
			hide: function(thisCmp) {
				thisCmp.destroy();
			}
		};
			
        this.dockedItems = [{
            xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					ui: 'decline-round',
					text: 'X',
					handler: function(button, event) {
						Ext.dispatch({
							controller: traildevils.controllers.trailMediaController,
							action: 'closeMediaCarousel'
						});
					}
				}
			]
        }];
        
        this.items = [
			this.carousel
		];
        
        traildevils.views.TrailDetailMediaCarouselSheet.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailMediaCarouselSheet', traildevils.views.TrailDetailMediaCarouselSheet);