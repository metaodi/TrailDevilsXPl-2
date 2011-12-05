/**
 * @class FavoriteTrailsLocal
 * 
 * The Favorite trails store definition
 * 
 */
traildevils.stores.FavoriteTrailsLocal = Ext.extend(traildevils.stores.TrailsLocalStore, {
	constructor: function(config) {
		config = config || {};
		Ext.applyIf(config, {
			proxy: {
				type: 'trailslocal',
				id: 'favorite-trails-local',
				model: 'Trail',
				idProperty: 'id'
			},
			
			//order by distance ascending
			//and if distance is not available by title
			sorters: [
				{property: 'distance', direction: 'ASC'},
				{property: 'title', direction: 'ASC'}
			]
		});
		traildevils.stores.FavoriteTrailsLocal.superclass.constructor.call(this,config);
	},
	
	addTrail: function(trail) {
		this.add(trail);
		this.sort();
		this.sync();
		/*
		 * WORKAROUND FOR SENCHA BUG: needsAdd flag of records doesn't get resetted
		 * Source: http://www.sencha.com/forum/showthread.php?132548-Ext.Store.onProxyWrite-doesn-t-set-needsAdd-to-false
		 */
		this.load({
			scope: this,
			callback: function(records, operation, success) {
				traildevils.fireEvent('favoritedatachanged');
			}
		});
	},
	
	removeTrail: function(trail) {
		this.remove(trail);
		this.sync();
		traildevils.fireEvent('favoritedatachanged');
	},
	
	updateDistances: function() {
		if(!this.isLoading()) {
			this.each(function(record) {
				record.data.distance = traildevils.geo.getDistance(record.data.latitude, record.data.longitude);
				record.data.formattedDistance = traildevils.geo.getFormattedDistance(record.data.distance);
			});
			this.sort();
			traildevils.fireEvent('favoritedatachanged');
		}
	}
});

Ext.regStore('FavoriteTrailsLocal', new traildevils.stores.FavoriteTrailsLocal);
Ext.reg('favoritestore', traildevils.stores.FavoriteTrailsLocal);
