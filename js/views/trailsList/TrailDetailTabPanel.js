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
		if(title.length > 12) {
			title = this.trail.data.title.substring(0, 12) + "...";
		}
		
		this.backBtn = new Ext.Button({
			text: 'Zurück',
			ui: 'back',
			handler: function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsListController,
					action: 'list'
				});
			}
		});
		
        this.dockedItems = [{
            xtype: 'toolbar',
            title: title,
            items: [
				this.backBtn,
				{ xtype: 'spacer' },
				{ iconCls: 'star', iconMask: true, ui: 'plain' }
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