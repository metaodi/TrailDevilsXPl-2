/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
traildevils.stores.FavoriteTrailsStore = Ext.extend(traildevils.stores.TrailsLocalStore, {
	constructor: function(config) {
		Ext.apply(this, {
			proxy: {
				type: 'traillocal',
				id: 'favorite-trails-local',
				model: 'Trail',
				idProperty: 'id'
			}
		});
		traildevils.stores.FavoriteTrailsStore.superclass.constructor.apply(this,config);
	},
	
	addTrail: function(trail) {
		this.add(trail);
		this.sort();
		this.sync();
		traildevils.views.favoriteTrailsList.refresh();
	},
	
	removeTrail: function(trail) {
		this.remove(trail);
		this.sync();
		traildevils.views.favoriteTrailsList.refresh();
	}
});

Ext.regStore('FavoriteTrailsLocal', new traildevils.stores.FavoriteTrailsStore);
Ext.reg('favoritestore', traildevils.stores.FavoriteTrailsStore);