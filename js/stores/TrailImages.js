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
            type: 'json',
			root: 'images'
        }
	}
});
