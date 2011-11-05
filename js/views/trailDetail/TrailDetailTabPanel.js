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