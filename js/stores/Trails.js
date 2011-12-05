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
			if(this.currentPage == 1) {
				this.removeAllRecords();
			}
		},
		load: function(store, records, successful) {
			if (successful)	{
				traildevils.store.refreshData();
				traildevils.online = true;
				console.log('App ist online!');
			}
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
            type: 'json'
			//root: 'trails'
        },
        listeners: {
			exception: function(store, response, op) {
				traildevils.online = false;
				console.log('App ist offline!');
				
				/* WORKAROUND FOR SENCHA BUG: operation is not sucessful, therefore there are no records present
				 * replace the undefined variable with an empty array to avoid "Uncaught TypeError: Cannot read property 'length' of undefined"
				* Source: http://stackoverflow.com/questions/7119775/handling-404-exceptions-in-sencha-touch-store-with-an-ajax-proxy
				*/
				op.records = [];
			}
        }
	},
	
	// group by status
	getGroupString : function(record) {
		return record.get('status');
	},
	
	removeAllRecords: function() {
		this.each(function (record) {
			this.remove(record);
		},this);
	}
});
