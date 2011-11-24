/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailsLocal', {
	model: 'Trail',
	clearOnPageLoad: true,
	
	resetCompleteCallbackFn: null,
	resetCompleteCallbackCmp: null,
	
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
			
			// show load mask
			this.loadMask = new Ext.LoadMask(Ext.getBody(),{
                msg: traildevils.views.trailsList.loadingText
            });
            this.loadMask.show();
			
			traildevils.remotestore.loadPage(this.currentPage);
		}
	},
	
	proxy: {
        type: 'localstorage',
        id  : 'trails-local',
		model: 'Trail',
		idProperty: 'id'
    },
	
	reset: function(callbackFn, cmp) {
		this.currentPage = 1;
		this.loadPage(this.currentPage);
		// TODO very ugly implementation (please refactor me!)
		this.resetCompleteCallbackFn = callbackFn;
		this.resetCompleteCallbackCmp = cmp;
	},
	
	onResetComplete: function() {
		if(this.resetCompleteCallbackFn !== null) {
			this.resetCompleteCallbackFn.call(this.resetCompleteCallbackCmp);
		}
		this.resetCompleteCallbackFn = null;
	},
	
	//try to get data from remote
	refreshData: function() {
		this.removeAllRecordsFromStore();
		traildevils.remotestore.each(function (record) {
			traildevils.store.add(record.data);
		});
		this.initializeFavorites();
		this.sort();
		this.sync();
		traildevils.views.trailsList.refresh();
	},
	
	removeAllRecordsFromStore: function() {
		
	},
	
	getDistance: function(lat, lng) {
		return traildevils.geo.getDistance(lat, lng);
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
			store.data.distance = traildevils.store.getDistance(store.data.latitude, store.data.longitude);
			store.data.formattedDistance = traildevils.store.getFormattedDistance(store.data.distance);
		});
		this.sort();
		traildevils.views.trailsList.refresh();
	},
	
	initializeFavorites: function() {
		// check trails if they are already in favorite store
		this.each(function(store) {
			if(traildevils.favoritestore.getById(store.data.id) !== null) {
				store.data.favorite = true;
			}
		});
	}
});
