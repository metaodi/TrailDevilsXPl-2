/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('FavoriteTrailsLocal', {
	model: 'Trail',
	
	// order by status descending (groups), by distance ascending
	// and if distance is not available by title
	sorters: [
		{ property: 'status', direction: 'DESC'},
		{ property: 'distance', direction: 'ASC' },
		{ property: 'title', direction: 'ASC' }
	],
	
	proxy: {
        type: 'localstorage',
        id: 'favorite-trails-local',
		model: 'Trail',
		idProperty: 'id'
    },
	
	updateDistances: function() {
		this.each(function(store) {
			store.data.distance = traildevils.geo.getDistance(store.data.latitude, store.data.longitude);
			store.data.formattedDistance = traildevils.store.getFormattedDistance(store.data.distance);
		});
		this.sort();
		traildevils.views.favoriteTrailsList.refresh();
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
		traildevils.views.trailsList.refresh();
		traildevils.views.favoriteTrailsList.refresh();
	}
});
