/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailsLocal', {
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
	
	proxy: {
        type: 'localstorage',
        id  : 'trails-local',
		model: 'Trail',
		idProperty: 'id',
		
		/* WORKAROUND FOR SENCHA BUG: operation was not set to successful, therefore it is not possible to *only* remove records from a store
		 * Source: http://www.sencha.com/forum/showthread.php?122493-WebStorageProxy-issue
		 */
		//inherit
		destroy: function(operation, callback, scope) {
			var records = operation.records,
				length  = records.length,
				ids     = this.getIds(),

				//newIds is a copy of ids, from which we remove the destroyed records
				newIds  = [].concat(ids),
				i;

			for (i = 0; i < length; i++) {
				newIds.remove(records[i].getId());
				this.removeRecord(records[i], false);
			}

			this.setIds(newIds);
			
			// Sencha-Bug: operation was not set completed/sucsessful
			operation.setCompleted();
			operation.setSuccessful();

			if (typeof callback == 'function') {
				callback.call(scope || this, operation);
			}
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
		this.each(function(store) {
			store.data.distance = traildevils.geo.getDistance(store.data.latitude, store.data.longitude);
			store.data.formattedDistance = traildevils.store.getFormattedDistance(store.data.distance);
		});
		this.sort();
		traildevils.views.trailsList.refresh();
	}
});
