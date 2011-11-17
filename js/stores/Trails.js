/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('Trails', {
	model: 'Trail',
	clearOnPageLoad: false,
	remoteSort: true,
    pageSize: 10,
	
	// order by status descending (groups) and distance ascending
	sorters: [
		{ property: 'status', direction: 'DESC' }, 
		{ property: 'distance', direction: 'ASC' }
	],
	timeout: 2000,
	
	listeners: {
		beforeload: function() {
			if(traildevils.util.geoLocation.locationAvailable) {
				this.proxy.extraParams.params = traildevils.util.geoLocation.latitude + ',' + traildevils.util.geoLocation.longitude + ',' + this.pageSize;
			} else {
				this.proxy.extraParams.params = '0,0,' + this.pageSize;
			}
		},
		load: function() {
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
			functionName: 'getTrailsNear'
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
	}
});
