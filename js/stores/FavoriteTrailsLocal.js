/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('FavoriteTrailsLocal', {
	model: 'Trail',
	
	// order by status descending (groups) and distance ascending
	sorters: [
		{ property: 'status', direction: 'DESC'}, 
		{ property: 'distance', direction: 'ASC' }
	],
	
	listeners: {
		beforeload: function() {
			// reset store sorters depending on geolocation availability
			this.sorters.clear();
			this.sorters.add(new Ext.util.Sorter(
				{ property: 'status', direction: 'DESC' }
			));
			if(traildevils.geo.available) {
				// order by status descending (groups) and distance ascending
				this.sorters.add(new Ext.util.Sorter(
					{ property: 'distance', direction: 'ASC' }
				));
			} else {
				// order by status descending (groups) and title ascending
				this.sorters.add(new Ext.util.Sorter(
					{ property: 'title', direction: 'ASC' }
				));
			}
		}
	},
	
	proxy: {
        type: 'localstorage',
        id: 'favorite-trails-local',
		model: 'Trail',
		idProperty: 'id'
    },
	
	// group by status
	getGroupString: function(record) {
		return record.get('status');
	},
	
	updateDistances: function() {
		this.each(function(store) {
			store.data.distance = traildevils.store.getDistance(store.data.latitude, store.data.longitude);
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
		traildevils.views.favoriteTrailsList.refresh();
	}
});
