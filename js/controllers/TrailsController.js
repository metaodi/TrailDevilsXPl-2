Ext.regController('TrailsController',{
    'index': function (options) {
		if(!traildevils.views.TrailsListPanel) {
			traildevils.views.TrailsListPanel = new traildevils.views.TrailsListPanel();
		}
		
		traildevils.views.TrailsListPanel.setActiveItem(traildevils.views.trailsList);
	},

    'detail': function (options) {
		traildevils.views.TrailsListPanel.setActiveItem(traildevils.views.trailDetailPanel);
	}
});

traildevils.controllers.TrailsController = Ext.ControllerManager.get('TrailsController');