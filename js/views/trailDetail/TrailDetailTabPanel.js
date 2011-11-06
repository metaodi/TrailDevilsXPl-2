/**
 * @class traildevils.views.TrailDetailTabPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailTabPanel = Ext.extend(Ext.TabPanel, {
	cls: 'trailDetailTabPanel',
	trail: null,
	tabBar: {
        ui: 'light'
    },
	
	initComponent: function() {
		// corp title to max. 12 characters
		var title = this.trail.data.title;
		if(title.length > 20) {
			title = this.trail.data.title.substring(0, 20) + "...";
			this.addCls('title20chars');
		} else if(title.length > 15) {
			this.addCls('title15chars');
		} else if(title.length > 12) {
			this.addCls('title12chars');
		}
		
		this.backBtn = new Ext.Button({
			text: 'Zurück',
			ui: 'back'
		});
		
		var initFavIcon = 'favstar';
		if(this.trail.data.favorite) {
			initFavIcon = 'favstar-act';
		}
		
        this.dockedItems = [{
            xtype: 'toolbar',
            title: title,
            items: [
				this.backBtn,
				{ xtype: 'spacer' },
				{ 
					iconCls: initFavIcon,
					iconMask: true,
					ui: 'plain',
					listeners: {
						tap: function() {
							var oldFavoriteState = this.up().up().trail.data.favorite;
							
							// TODO remove duplicated code (already in TrailsList.js)
							traildevils.views.favoritePopupPanel = new traildevils.views.FavoritePopupPanel({
								active: !oldFavoriteState
							});
							
							traildevils.views.favoritePopupPanel.show('pop');
							// hide popup after 600ms and destroy after 1000ms
							setTimeout('traildevils.views.favoritePopupPanel.hide()', 800);
							setTimeout('traildevils.views.favoritePopupPanel.destroy()', 1200);
							
							this.up().up().trail.data.favorite = !oldFavoriteState;
							
							if(this.up().up().trail.data.favorite) {
								this.setIconClass('favstar-act');
							} else {
								this.setIconClass('favstar');
							}
						}
					}
				}
			]
        }];
        
        this.items = [
			{
				xtype: 'trailDetailInfoPanel',
				data: this.trail.data
			}, {
				xtype: 'trailDetailMediaThumbDataView',
				data: this.trail.data
			}
		];
        
        traildevils.views.TrailDetailTabPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailTabPanel', traildevils.views.TrailDetailTabPanel);