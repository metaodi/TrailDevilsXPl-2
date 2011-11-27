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
	},

    detail: function(options) {
		traildevils.views.trailDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			origin: 'list',
			trail: options.trail
		});
		
		traildevils.views.trailDetailTabPanel.backBtn.setHandler(
			function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsListController,
					action: 'list'
				});
			}
		);
		traildevils.views.trailDetailTabPanel.backBtn.setText('Trails');
		
		traildevils.views.trailsListMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
		
		// hide open list options
		traildevils.views.trailsList.listOptionsPlugin.doHideOptionsMenuWithoutAnim();
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('trailslist');