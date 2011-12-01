/**
 * @class LocalStore
 * 
 * The local storage store definition
 * 
 */
traildevils.stores.LocalStore = Ext.extend(Ext.data.Store, {
	constructor: function(config) {
		Ext.apply(this, {
			model: 'Trail',
			clearOnPageLoad: false,
			
			// order by status descending (groups), by distance ascending
			// and if distance is not available by title
			sorters: [
				{property: 'status', direction: 'ASC'},
				{property: 'distance', direction: 'DESC'},
				{property: 'title', direction: 'ASC'}
			]
		});
		traildevils.on('locationchanged', function() {this.updateDistances()},this);
		traildevils.stores.LocalStore.superclass.constructor.call(this, config);
	}
	
});
