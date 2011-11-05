/**
 * @class traildevils.views.TrailDetailMediaCarouselImagePanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaCarouselImagePanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	monitorOrientation: true,
	image: null,
	
	initComponent: function() {
		this.listeners = {
			render: function() {
				this.data = this.image.data;
				this.setTpl();
			},
			orientationchange: function() {
				this.setTpl();
				this.update();
			}/*,
			tap: {
				element: 'el', //bind to the underlying el property on the panel
				fn: this.panelTap
			}*/
		}
		
        traildevils.views.TrailDetailMediaCarouselImagePanel.superclass.initComponent.call(this);
    },
	
	panelTap: function() {
		Ext.dispatch({
			controller: traildevils.controllers.trailMediaController,
			action: 'carouselImagePanelTap'
		});
	},
	
	setTpl: function() {
		// use getSize() function of carousel-body because this.height isn't set at render time
		var sideToStrech = this.image.getSideToStretch(this.up().getSize());
		var backgroundSize = 'auto auto';
		if(sideToStrech == 'width') {
			backgroundSize = '100% auto';
		} else {
			backgroundSize = 'auto 100%';
		}
		this.tpl = new Ext.XTemplate('<div class="image" style="background-image: url(' + this.image.data.path + '); background-size: ' + backgroundSize + ';"></div>');
	}
});

// Create xtype
Ext.reg('trailDetailMediaCarouselImagePanel', traildevils.views.TrailDetailMediaCarouselImagePanel);