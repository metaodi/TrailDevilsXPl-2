/**
 * @class traildevils.views.TrailDetailTabPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailTabPanel = Ext.extend(Ext.TabPanel, {
	cls: 'trailDetailTabPanel',
	trail: null,
	origin: '',
	
	tabBar: {
		cls: 'trailDetailTabPanelTabBar',
        ui: 'light'
    },
	
	initComponent: function() {
		// corp title to max. 12 characters
		var title = this.trail.data.title;
		if(title.length > 20) {
			title = this.trail.data.title.substring(0, 20) + "...";
			this.addCls('title-long');
		} else if(title.length > 15) {
			this.addCls('title-middle');
		} else if(title.length > 12) {
			this.addCls('title-short');
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
					trail: this.trail,
					handler: function() {
						if(this.trail.data.favorite) {
							traildevils.favoritestore.remove(this.trail);
						} else {
							traildevils.favoritestore.add(this.trail);
						}

						// toggle favorite flag on trail
						this.trail.toggleFavorite();

						// show favorite popup
						Ext.dispatch({
							controller: traildevils.controllers.favoriteTrailsListController,
							action: 'showPopup',
							favorite: this.trail.data.favorite
						});

						// set correct icon class
						if(this.trail.data.favorite) {
							this.setIconClass('favstar-act');
						} else {
							this.setIconClass('favstar');
						}
					}
				}
			]
        }];
        
        this.items = [
			{
				xtype: 'trailDetailInfoPanel',
				data: this.trail.data,
				origin: this.origin
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