/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailsLocal', {
	model: 'Trail',
	clearOnPageLoad: false,
	
	resetCompleteCallbackFn: null,
	resetCompleteCallbackCmp: null,
	
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
			
			traildevils.remotestore.sorters = this.sorters;
			
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
		traildevils.remotestore.removeAllRecordsFromStore();
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
		this.sort();
		this.sync();
		traildevils.views.trailsList.refresh();
	},
	
	removeAllRecordsFromStore: function() {
	    this.removeAll();
		this.getProxy().clear();
		this.sync();
	},
	
	// group by status
	getGroupString: function(record) {
		return record.get('status');
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
	}
});
