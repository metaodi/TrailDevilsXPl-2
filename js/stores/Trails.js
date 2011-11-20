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
			if(traildevils.geo.available) {
				this.proxy.extraParams.params = traildevils.geo.latitude + ',' + traildevils.geo.longitude + ',' + this.pageSize;
			} else {
				this.proxy.extraParams.params = '0,0,' + this.pageSize;
			}
		},
		load: function() {
			traildevils.store.refreshData();
			traildevils.store.loadMask.hide();
			traildevils.store.onResetComplete();
			traildevils.online = true;
			console.log('App ist online!');
		}
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className: 'TrailsLoader',
			functionName: 'getTrailsNear'
		},
		model: 'Trail',
        reader: {
            type: 'json',
			root: 'trails'
        },
        listeners: {
			exception: function() {
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
	
	removeAllRecordsFromStore: function() {
	    this.removeAll();
	}
});
