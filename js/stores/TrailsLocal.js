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
		load: function() {
			traildevils.remotestore.load();
		}
	},
	
	proxy: {
        type: 'localstorage',
        id  : 'trails-local',
		model: 'Trail',
		idProperty: 'id'
    },
	
	//try to get data from remote
	refreshData : function() {
		this.removeAllRecordsFromStore();
		traildevils.remotestore.each(function (record) {
			if (!traildevils.store.getById(record.data.id))
				{
					var trail = traildevils.store.add(record.data)[0];
					trail.setThumbUrl();
				}
		});
		this.sync();
		this.refreshView();
	},
	
	removeAllRecordsFromStore : function() {
		this.proxy.clear();
	},
	
	refreshView : function() {
		this.updateDistances();
		this.sort();
		traildevils.views.trailsList.refresh();
	},
	
	setPhotoUrl: function (id, dataUrl) {
		var trail = this.getById(id);
		trail.set('thumb', dataUrl);
		this.sync();
		this.refreshView();
	},
	
	// group by status
	getGroupString : function(record) {
		return record.get('status');
	},
	
	getDistance: function(lat, lng) {
		return traildevils.views.geoLocation.getDistance(lat, lng);
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
