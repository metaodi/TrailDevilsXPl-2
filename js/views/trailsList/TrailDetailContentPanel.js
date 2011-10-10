/**
 * @class traildevils.views.TrailDetailContentPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailContentPanel = Ext.extend(Ext.TabPanel, {
	fullscreen: true,
	items: [
		{ title: 'Info' },
		{ title: 'Bilder/Videos' }
	]
});

// Create xtype trailDetailContentPanel
Ext.reg('trailDetailContentPanel', traildevils.views.TrailDetailContentPanel);