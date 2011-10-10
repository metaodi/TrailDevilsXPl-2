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
		traildevils.views.trailsListMainPanel.setActiveItem(
			'trailDetailPanel', {
				type: 'slide',
				direction: 'left'
			}
		);
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('TrailsListController');