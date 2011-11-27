/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
traildevils.stores.TrailsLocalStore = Ext.extend(Ext.data.Store, {
	constructor: function(config) {
		var trailStoreConfig = {};
		Ext.apply(trailStoreConfig, config);
		Ext.applyIf(trailStoreConfig, {
			model: 'Trail',
			clearOnPageLoad: false,

			resetCallbackFn: null,
			resetCallbackScope: null,

			// order by status descending (groups), by distance ascending
			// and if distance is not available by title
			sorters: [
				{ property: 'status', direction: 'DESC'},
				{ property: 'distance', direction: 'ASC' },
				{ property: 'title', direction: 'ASC' }
			],

			proxy: {
				type: 'traillocal',
				id  : 'trails-local',
				model: 'Trail',
				idProperty: 'id'
			}
		});
		traildevils.stores.TrailsLocalStore.superclass.constructor.call(this, trailStoreConfig);
	},
	
	// group by status
	getGroupString: function(record) {
		return record.get('status');
	},
	
	listeners: {
		beforeload: function() {
			// reset search filter
			if(traildevils.views.trailsListSearch !== undefined) {
				traildevils.views.trailsListSearch.reset();
			}
			
			// load current page on remotestore
			traildevils.remotestore.loadPage(this.currentPage);
		}
	},
	
	//copy data from remote store to local store
	refreshData: function() {
		this.removeAllRecords();
		traildevils.remotestore.each(function(record) {
			traildevils.store.add(record);
			traildevils.store.setFavoriteState(record);
		});
		this.sync();
		this.sort();
		this.onResetComplete();
	},
	
	setFavoriteState: function(record) {
		// check trail if it is already in favorite store
		if(traildevils.favoritestore.getById(record.data.id) !== null) {
			record.data.favorite = true;
		}
	},
	
	removeAllRecords: function() {
		this.each(function (record) {
			this.remove(record);
		},this);
		this.sync();
	},
	
	reset: function(callback, scope) {
		// TODO very ugly implementation (please refactor me!)
		this.resetCallbackFn = callback;
		this.resetCallbackScope = scope;
		
		this.currentPage = 1;
		this.load();
	},
	
	onResetComplete: function() {
		if(this.resetCallbackFn !== null) {
			this.resetCallbackFn.call(this.resetCallbackScope);
		}
		this.resetCallbackFn = null;
	},
	
	getFormattedDistance: function(distanceInMeters) {
		if(distanceInMeters > 999) {
			// round to one decimal
			return (Math.round(distanceInMeters / 100) / 10) + "km";
		} else {
			return Math.round(distanceInMeters) + "m";
		}
	},
	
	updateDistances: function() {
		this.each(function(record) {
			record.data.distance = traildevils.geo.getDistance(record.data.latitude, record.data.longitude);
			record.data.formattedDistance = traildevils.store.getFormattedDistance(record.data.distance);
		});
		this.sort();
		traildevils.views.trailsList.refresh();
		traildevils.views.favoriteTrailsList.refresh();
	}
});

Ext.regStore('TrailsLocal', new traildevils.stores.TrailsLocalStore);
Ext.reg('store', traildevils.stores.TrailsLocalStore);