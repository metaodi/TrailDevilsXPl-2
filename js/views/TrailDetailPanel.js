/**
 * @class traildevils.views.TrailDetailPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailPanel = Ext.extend(Ext.Panel, {
	html: 'detail'
});

// Create xtype trailListPanel
Ext.reg('trailDetailPanel', traildevils.views.TrailDetailPanel);