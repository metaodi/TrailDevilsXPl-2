/**
 * @class TrailsLocal
 * 
 * The Trails store definition
 * 
 */
traildevils.stores.TrailsLocal = Ext.extend(traildevils.stores.TrailsLocalStore, {
	constructor: function(config) {
		config = config || {};
		Ext.applyIf(config, {
			proxy: {
				type: 'trailslocal',
				id: 'trails-local',
				model: 'Trail',
				idProperty: 'id'
			},
			
			listeners: {
				beforeload: function() {
					traildevils.fireEvent('beforestoreload');

					// load current page on remotestore
					traildevils.remotestore.loadPage(this.currentPage);
				}
			}
		});
		traildevils.stores.TrailsLocal.superclass.constructor.call(this, config);
	},
	
	/**
     * Group data by status
	 * @private
     */
	getGroupString: function(record) {
		return record.get('status');
	},
	
	/**
     * Remove all records from store and copy records from remote store to local store
     */
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
	
	/**
     * Sets favorite flag for a given trail
     */
	setFavoriteState: function(record) {
		// check if trail is already in favorite store
		if(traildevils.favoritestore.getById(record.data.id) !== null) {
			record.data.favorite = true;
		}
	},
	
	/**
     * Removes all records from store
	 * @private
     */
	removeAllRecords: function() {
		this.each(function (record) {
			this.remove(record);
		},this);
		this.sync();
	},
	
	/**
     * Remove all data from store and reload first page
     */
	reset: function() {
		this.currentPage = 1;
		this.load();
	},
	
	/**
     * Update distances of trails in store
     */
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

Ext.regStore('TrailsLocal', new traildevils.stores.TrailsLocal);
Ext.reg('store', traildevils.stores.TrailsLocal);