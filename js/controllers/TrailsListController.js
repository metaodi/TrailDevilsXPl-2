Ext.regController('TrailsListController',{
    'index': function (options) {
		if(!traildevils.views.TrailsListMainPanel) {
			traildevils.views.TrailsListMainPanel = new traildevils.views.TrailsListMainPanel();
		}
		
		traildevils.views.TrailsListMainPanel.setActiveItem(
			traildevils.views.TrailsListPanel, {
				type : 'slide',
				direction : 'right'
			}
		);
	},

    'detail': function (options) {
		traildevils.views.TrailsListMainPanel.setActiveItem(
			traildevils.views.TrailDetailPanel, {
				type: 'slide',
				direction: 'left'
			}
		);
	}
});

traildevils.controllers.trailsListController = Ext.ControllerManager.get('TrailsListController');