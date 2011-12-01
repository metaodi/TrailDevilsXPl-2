Ext.regController('trailslist', {
    list: function(options) {
		traildevils.views.trailsListMainPanel.setActiveItem(
			'trailsListPanel', {
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			}
		);
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('trailslist');