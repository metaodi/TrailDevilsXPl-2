/**
 * @class traildevils.views.TrailsListPagingPlugin
 * @extends Ext.plugins.ListPagingPlugin
 * 
 */

traildevils.views.TrailsListPagingPlugin = Ext.extend(Ext.plugins.ListPagingPlugin, {
	loadMoreText: 'weitere Trails laden...'
});

// Create ptype
Ext.preg('trailsListPagingPlugin', traildevils.views.TrailsListPagingPlugin);