/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('Trails', {
	model: 'Trail',

	// order by status descending (groups) and distance descending
	sorters: [
		{
			property : 'status', 
			direction: 'DESC'
		}, 
		{
			property : 'distance',
			direction: 'ASC'
		}
	],
	
	listeners: {
		load: function() {
			this.updateDistances();
		}
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className : 'DataLoader' ,
			functionName : 'getTrailsNear',
			// @TODO pass correct geolocation values
			params: '0,0'
		},
		model: 'Trail',
        reader: {
            type: 'json',
			root: 'trails'
        }
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
