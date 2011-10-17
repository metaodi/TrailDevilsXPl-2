Ext.regController('TrailsListController',{
    'index': function (options) {
		if(!traildevils.views.trailsListMainPanel) {
			traildevils.views.trailsListMainPanel = traildevils.views.viewport.getComponent('trailsListMainPanel');
		}
		
		traildevils.views.trailsListMainPanel.setActiveItem(
			'trailsListPanel', {
				type: 'slide',
				direction: 'right'
			}
		);
	},

    'detail': function (options) {
		var trailDetailPanel = new traildevils.views.TrailDetailPanel({
			trail: options.trail
		});
		traildevils.views.trailsListMainPanel.setActiveItem(trailDetailPanel, 'slide');
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('TrailsListController');