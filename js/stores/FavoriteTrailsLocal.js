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
		this.fireEvent('favoriteadded', trail);
	},
	
	removeTrail: function(trail) {
		this.remove(trail);
		this.sync();
		this.fireEvent('favoriteremoved', trail);
	}
});

Ext.reg('favoritestore', traildevils.stores.FavoriteTrailsStore);
