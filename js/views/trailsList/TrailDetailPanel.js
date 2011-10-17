/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	scroll: 'vertical',
	
	initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.trail.data.title,
            items: [
				{
					text: 'Zurück',
					ui: 'back',
					handler: function(button, event) {
						Ext.dispatch({
							controller: traildevils.controllers.trailsListController,
							action: 'index'
						})
					}
				},
				{ xtype: 'spacer' },
				{ iconCls: 'star', iconMask: true, ui: 'plain' }
			]
        }];
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate( '<div>{description}</div>'),
            data: this.trail.data
        }];
        
        traildevils.views.TrailDetailPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailDetailPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);