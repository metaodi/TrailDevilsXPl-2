/**
 * @class TrailsLocalStore
 * 
 * The local storage store definition
 * 
 */
traildevils.stores.TrailsLocalStore = Ext.extend(Ext.data.Store, {
	constructor: function(config) {
		config = config || {};
		Ext.applyIf(config, {
			model: 'Trail',
			clearOnPageLoad: false,
			
			/**
			 * Order data by status descending (groups), by distance ascending
			 * and if distance is not available by title ascending
			 */
			sorters: [
				{property: 'status', direction: 'DESC'},
				{property: 'distance', direction: 'ASC'},
				{property: 'title', direction: 'ASC'}
			]
		});
		traildevils.on('locationchanged', function() {this.updateDistances()},this);
		traildevils.stores.TrailsLocalStore.superclass.constructor.call(this, config);
	}
});
