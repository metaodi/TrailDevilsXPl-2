module("TrailGeoLocation");
test("Construtor", function() {
		var geo = new traildevils.util.TrailGeoLocation;
		ok(geo instanceof Ext.util.GeoLocation,'Object should be of Ext.util.GeoLocation or one of it\'s childs');
});
test("getDistance", function() {
		var geo = new traildevils.util.TrailGeoLocation;
		//distance Zurich <-> Rapperswil
		geo.latitude = 47.223357;
		geo.longitude = 8.816614;
		var distance = geo.getDistance(47.344192, 8.531436);

		var margin = 100;
		var expected = 25300;
		console.log(distance);
		ok((distance <= expected + margin && distance >= expected - margin),'The calculated distance (' + distance + ') should be within the given margin (' + expected + '+-' + margin + ')');
});
test("getDistance (no distance)", function() {
		var geo = new traildevils.util.TrailGeoLocation;
		var lat = 47.223357;
		var lng = 8.816614;

		geo.latitude = lat;
		geo.longitude = lng;
		equal(geo.getDistance(lat, lng),0,'There is no distance between the given points');
});
test("getFormattedDistance (meter)", function() {
		var geo = new traildevils.util.TrailGeoLocation;
		var distance = 203.71342;

		equal(geo.getFormattedDistance(distance),'204m','Format distance in meter');
});
test("getFormattedDistance (kilometer)", function() {
		var geo = new traildevils.util.TrailGeoLocation;
		var distance = 25203.2343;

		equal(geo.getFormattedDistance(distance),'25.2km','Format distance in kilometers');
});
test("getFormattedDistance (round up)", function() {
		var geo = new traildevils.util.TrailGeoLocation;

		var distance = 3563.124;
		equal(geo.getFormattedDistance(distance),'3.6km','Value should round to next integer');
});
test("getFormattedDistance (round down)", function() {
		var geo = new traildevils.util.TrailGeoLocation;

		var distance = 3.045;
		equal(geo.getFormattedDistance(distance),'3m','Value should be rounded to this integer');
});