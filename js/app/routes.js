Ext.Router.draw(function(map) {
	
	//fallback route - would match routes like http://mydomain.com/#users/list to the 'users' controller's
    //'list' action
    map.connect(':controller/:action');
});