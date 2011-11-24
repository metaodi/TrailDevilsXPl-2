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
	
	// order by status descending (groups), by distance ascending
	// and if distance is not available by title
	sorters: [
		{ property: 'status', direction: 'DESC'},
		{ property: 'distance', direction: 'ASC' },
		{ property: 'title', direction: 'ASC' }
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
	}
});
