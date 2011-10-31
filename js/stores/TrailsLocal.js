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
		for(var i = 0; i < traildevils.remotestore.getCount(); i++)
		{
			var record = traildevils.remotestore.getAt(i).data;
			this.add(record);
			this.save();
		}
		this.sync();
		this.refreshView();
		console.log('Data refreshed!');
	},
	
	removeAllRecordsFromStore : function() {
		this.getProxy().clear();
	},
	
	refreshView : function() {
		this.updateDistances();
		this.sort();
		traildevils.views.trailsList.refresh();
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
