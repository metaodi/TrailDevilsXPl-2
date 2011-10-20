/**
 * @class traildevils.views.TrailDetailMediaMainPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaMainPanel = Ext.extend(Ext.Panel, {
	title: 'Fotos/Videos',
	activeItem: 'trailDetailMediaPanel',
	
	
	initComponent: function () {
		traildevils.views.trailDetailMediaPanel = new traildevils.views.TrailDetailMediaPanel();
		
        this.items = [
            traildevils.views.trailDetailMediaPanel
        ]
		
		traildevils.views.TrailDetailMediaMainPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailDetailMediaMainPanel
Ext.reg('trailDetailMediaMainPanel', traildevils.views.TrailDetailMediaMainPanel);