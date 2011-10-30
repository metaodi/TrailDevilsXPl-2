Ext.regController('trailslist', {
    'list': function (options) {
		if(traildevils.views.trailListDetailTabPanel === undefined) {
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
					traildevils.views.trailListDetailTabPanel.destroy();
				}
			});
		}
	},

    'detail': function (options) {
		traildevils.views.trailListDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			trail: options.trail
		});
		
		traildevils.views.trailListDetailTabPanel.backBtn.setHandler(
			function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsListController,
					action: 'list'
				});
			}
		);
		
		traildevils.views.trailsListMainPanel.setActiveItem(traildevils.views.trailListDetailTabPanel, 'slide');
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('trailslist');