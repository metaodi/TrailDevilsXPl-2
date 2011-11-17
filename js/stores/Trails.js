/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('Trails', {
	model: 'Trail',
	clearOnPageLoad: false,
    pageSize: 10,
	
	// order by status descending (groups) and distance ascending
	sorters: [
		{ property: 'status', direction: 'DESC' }, 
		{ property: 'distance', direction: 'ASC' }
	],
	timeout: 2000,
	
	listeners: {
		beforeload: function() {
			// before each data load set proxy params to current geolocation
			this.proxy.extraParams.params = traildevils.util.geoLocation.latitude + ',' + traildevils.util.geoLocation.longitude + ',' + this.pageSize;
		},
		load : function() {
			traildevils.store.refreshData();
			traildevils.store.loadMask.hide();
			
			traildevils.online = true;
			console.log('App ist online!');
		}
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className: 'DataLoader',
			functionName: 'getTrailsNear',
			// geolocation params are set before each data load
			params: '0,0'
		},
		model: 'Trail',
        reader: {
            type: 'json',
			root: 'trails'
        },
        listeners: {
			exception: function() {
				console.log('Start exception.')
				traildevils.online = false;
				traildevils.store.loadMask.hide();
				console.log('App ist offline!');
			}
        }
	},
	
	// group by status
	getGroupString : function(record) {
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
