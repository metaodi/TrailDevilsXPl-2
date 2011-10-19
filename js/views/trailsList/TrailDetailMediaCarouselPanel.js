/**
 * @class traildevils.views.TrailDetailMediaCarouselPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaCarouselPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
    initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
				{
					itemId: 'backButton',
					ui: 'back',
					text: 'Back',
					iconMask: true,
					handler: function(button, event) {
						Ext.dispatch({
							controller: traildevils.controllers.trailMediaController,
							action: 'index'
						});
					}
				}
			]
        }];

        this.carousel = new Ext.Carousel({
            indicator: true,
            defaults: {
                scroll: 'vertical'
            }
        });

        this.items = [this.carousel];

        traildevils.views.TrailDetailMediaCarouselPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailDetailMediaCarouselPanel
Ext.reg('trailDetailMediaCarouselPanel', traildevils.views.TrailDetailMediaCarouselPanel);