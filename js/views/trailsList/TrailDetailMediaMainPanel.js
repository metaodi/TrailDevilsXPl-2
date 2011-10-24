/**
 * @class traildevils.views.TrailDetailMediaMainPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaMainPanel = Ext.extend(Ext.Panel, {
	title: 'Fotos/Videos',
	//activeItem: 'trailDetailMediaPanel',
	layout: 'card',
	
	
	initComponent: function () {
		traildevils.views.trailDetailMediaThumbPanel = new traildevils.views.TrailDetailMediaThumbPanel();
		
        this.items = [
            traildevils.views.trailDetailMediaThumbPanel
        ]
		
		traildevils.views.TrailDetailMediaMainPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype
Ext.reg('trailDetailMediaMainPanel', traildevils.views.TrailDetailMediaMainPanel);