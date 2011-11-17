/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailsLocal', {
	model: 'Trail',
	clearOnPageLoad: false,
	
	// order by status descending (groups) and distance ascending
	sorters: [
		{ property: 'status', direction: 'DESC'}, 
		{ property: 'distance', direction: 'ASC' }
	],
	
	listeners: {
		beforeload: function() {
			console.log("localstore beforeload");
			traildevils.remotestore.currentPage = this.currentPage;
			
			this.sorters.clear();
			this.sorters.add(new Ext.util.Sorter(
				{ property: 'status', direction: 'DESC' }
			));
			if(traildevils.util.geoLocation.locationAvailable) {
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
			
			this.loadMask = new Ext.LoadMask(Ext.getBody(),{
                msg: traildevils.views.trailsList.loadingText
            });
            this.loadMask.show();
			console.log("localstore beforeload end");
		},
		load: function() {
			console.log("localstore load");
			traildevils.remotestore.loadPage(this.currentPage);
		}
	},
	
	proxy: {
        type: 'localstorage',
        id  : 'trails-local',
		model: 'Trail',
		idProperty: 'id'
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
		return traildevils.util.geoLocation.getDistance(lat, lng);
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
