Ext.Router.draw(function(map) {
	//maps the url http://mydomain.com/#list to the home controller's index action
    map.connect('list', {controller: 'trailslist', action: 'list'});
	//maps the url http://mydomain.com/#list to the home controller's index action
    map.connect('map', {controller: 'trailsmap', action: 'index'});
	
	//fallback route - would match routes like http://mydomain.com/#users/list to the 'users' controller's
    //'list' action
    map.connect(':controller/:action');
});