/**
 * @class traildevils.views.TrailDetailTabPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailTabPanel = Ext.extend(Ext.TabPanel, {
	cls: 'trailDetailTabPanel',
	trail: null,
	origin: '',
	parentType: '',
	
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
		
		var initFavIcon = 'favstar';
		if(this.trail.data.favorite) {
			initFavIcon = 'favstar-act';
		}
		
		this.backBtn = new Ext.Button({
			text: 'Zurück',
			ui: 'back'
		});
		this.favoriteBtn = new Ext.Button({
			iconCls: initFavIcon,
			iconMask: true,
			ui: 'plain',
			trail: this.trail,
			handler: function() {
				var oldFavoriteState = this.trail.data.favorite;
				
				Ext.dispatch({
					controller: traildevils.controllers.favoriteController,
					action: 'toggleFavorite',
					trail: this.trail
				});
				
				// set correct icon class
				if(oldFavoriteState) {
					this.setIconClass('favstar');
				} else {
					this.setIconClass('favstar-act');
				}
			}
		});
		
        this.dockedItems = [{
            xtype: 'toolbar',
            title: title,
            items: [
				this.backBtn,
				{ xtype: 'spacer' },
				this.favoriteBtn
			]
        }];
        
        this.items = [
			{
				xtype: 'trailDetailInfoPanel',
				data: this.trail.data,
				origin: this.origin,
				parentType: this.parentType
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