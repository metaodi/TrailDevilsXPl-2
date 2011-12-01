/**
 * @class TrailsLocalStore
 * 
 * The Trails store definition
 * 
 */
traildevils.stores.TrailsLocalStore = Ext.extend(traildevils.stores.LocalStore, {
	constructor: function(config) {
		var trailStoreConfig = {};
		Ext.apply(trailStoreConfig, config);
		Ext.applyIf(trailStoreConfig, {
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
			traildevils.fireEvent('beforestoreload');
			
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
		traildevils.fireEvent('storedatachanged');
		traildevils.fireEvent('storedatarefreshed');
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
	
	reset: function() {
		this.currentPage = 1;
		this.load();
	},
	
	updateDistances: function() {
		if(!this.isLoading()) {
			this.each(function(record) {
				record.data.distance = traildevils.geo.getDistance(record.data.latitude, record.data.longitude);
				record.data.formattedDistance = traildevils.geo.getFormattedDistance(record.data.distance);
			});
			this.sort();
			traildevils.fireEvent('storedatachanged');
		}
	}
});

Ext.regStore('TrailsLocal', new traildevils.stores.TrailsLocalStore);
Ext.reg('store', traildevils.stores.TrailsLocalStore);