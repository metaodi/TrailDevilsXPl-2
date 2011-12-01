/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
traildevils.stores.FavoriteTrailsStore = Ext.extend(traildevils.stores.LocalStore, {
	constructor: function(config) {
		var favStoreConfig = {};
		Ext.apply(favStoreConfig, config);
		Ext.applyIf(favStoreConfig, {
			proxy: {
				type: 'traillocal',
				id: 'favorite-trails-local',
				model: 'Trail',
				idProperty: 'id'
			}
		});
		traildevils.stores.FavoriteTrailsStore.superclass.constructor.call(this,favStoreConfig);
	},
	
	addTrail: function(trail) {
		this.add(trail);
		this.sort();
		this.sync();
		traildevils.fireEvent('favoritedatachanged');
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

Ext.regStore('FavoriteTrailsLocal', new traildevils.stores.FavoriteTrailsStore);
Ext.reg('favoritestore', traildevils.stores.FavoriteTrailsStore);
