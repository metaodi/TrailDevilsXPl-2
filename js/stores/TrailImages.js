/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailImages', {
	model: 'TrailImage',

	listeners: {
		beforeload: function() {
			// before each data load set proxy params to current trailid
			if(traildevils.views.trailDetailTabPanel !== undefined) {
				this.proxy.extraParams.params = traildevils.views.trailDetailTabPanel.trail.data.id;
			}
		}
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className: 'TrailImagesLoader',
			functionName: 'getTrailImages',
			// trailid params are set before each data load
			params: '0'
		},
		model: 'TrailImage',
        reader: {
            type: 'json'
        },
		listeners: {
			exception: function(store, response, op) {
				/* WORKAROUND FOR SENCHA BUG: operation is not sucessful, therefore there are no records present
				 * replace the undefined variable with an empty array to avoid "Uncaught TypeError: Cannot read property 'length' of undefined"
				* Source: http://stackoverflow.com/questions/7119775/handling-404-exceptions-in-sencha-touch-store-with-an-ajax-proxy
				*/
				op.records = [];
			}
		}
	}
});
