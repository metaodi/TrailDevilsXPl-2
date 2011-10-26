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
	

	// group by status
	getGroupString : function(record) {
		return record.get('status');
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className : 'DataLoader' ,
			functionName : 'getTrailsNear',
			params: traildevils.lat + ',' + traildevils.lng
		},
		model: 'Trail',
        reader: {
            type: 'json',
			root: 'trails'
        }
	}
});
