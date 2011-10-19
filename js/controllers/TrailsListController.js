Ext.regController('TrailsListController',{
    'index': function (options) {
		if(options.detailPanel === undefined) {
			traildevils.views.trailsListMainPanel.setActiveItem(
			'trailsListPanel', {
				type: 'slide',
				direction: 'right'
			});
		} else {
			traildevils.views.trailsListMainPanel.setActiveItem(
			'trailsListPanel', {
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					options.detailPanel.destroy();
				}
			});
		}
	},

    'detail': function (options) {
		var trailDetailPanel = new traildevils.views.TrailDetailPanel({
			trail: options.trail
		});
		traildevils.views.trailsListMainPanel.setActiveItem(trailDetailPanel, 'slide');
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('TrailsListController');