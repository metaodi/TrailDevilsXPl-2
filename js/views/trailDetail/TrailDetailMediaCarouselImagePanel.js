/**
 * @class traildevils.views.TrailDetailMediaCarouselImagePanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaCarouselImagePanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	image: null,
	
	initComponent: function() {
		this.listeners = {
			render: function() {
				var sideToStrech = this.image.getSideToStretch(this.getSize());
				this.data = this.image.data;
				this.tpl = new Ext.XTemplate('<div class="image"><img src="{path}" alt="{name}" style="min-' + sideToStrech + ': 100%; max-' + sideToStrech + ': 100%;" /></div>');
			}
		}
		
        traildevils.views.TrailDetailMediaCarouselImagePanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailMediaCarouselImagePanel', traildevils.views.TrailDetailMediaCarouselImagePanel);