Ext.regController('TrailsListController',{
    'index': function (options) {
		if(traildevils.views.trailDetailTabPanel === undefined) {
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
					traildevils.views.trailDetailTabPanel.destroy();
				}
			});
		}
	},

    'detail': function (options) {
		traildevils.views.trailDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			trail: options.trail
		});
		
		var backBtn = traildevils.views.trailDetailTabPanel.backBtn;
		backBtn.setHandler(function(){
			Ext.dispatch({
					controller: traildevils.controllers.trailsListController,
					action: 'index',
			});
		});
		
		traildevils.views.trailsListMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('TrailsListController');