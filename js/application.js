/**
 * This file sets up the TrailDevils application. We register an application called 'traildevils' - this automatically sets up
 * a global variable with the same name.
 * 
 */ 
Ext.regApplication({
	name: 'traildevils',
	tabletStartupScreen: 'view/images/phone_startup.jpg',
	phoneStartupScreen: 'view/images/phone_startup.jpg',
	icon: 'view/images/app_icon.jpg',
	glossOnIcon: true,
	
	launch: function() {
		this.viewport = new traildevils.Viewport({
            application: this
        });
	}
});


/* // OLD STUFF
var markersArray = [];

addMarker = function(tweet, position) {        // Define addMarker function
	var marker = new google.maps.Marker({          // Define variable to hold marker data
		map: map.map,
		position: position
	});
	markersArray.push(marker);
}
clearMarkers = function() {
	for(var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(null);
	}
	markersArray = [];
}

function refresh() {
	var coords = map.geo.coords;                       // Define a coords variable from the maps geolocation
	Ext.util.JSONP.request({                           // Make an external call using JSONP
		url: 'http://search.twitter.com/search.json',
		callbackKey: 'callback',
		params: {
			geocode: coords.latitude + ',' + coords.longitude + ',' + '5mi', // Get lat, long, and radius
			rpp: 30,
			uniqueify: Math.random()
		},
		callback: function(data) {                         // Provide structure to hold data from Twitter callback
			var tweetList = data.results;                             // Hold Twitter info in variable called data
			timeline.update(tweetList);                   // Update the tweets in timeline

			clearMarkers();
			for (var i = 0, ln = tweetList.length; i < ln; i++) { // Loop to add points to the map
				var tweet = tweetList[i];                           // Get data for a single tweet

				if (tweet.geo && tweet.geo.coordinates) {      // If the tweet is geo-tagged, use that to display marker
					var position = new google.maps.LatLng(tweet.geo.coordinates[0], tweet.geo.coordinates[1]);  // Get coords
					addMarker(tweet, position);                  // Call addMarker function with new data
				}
			}
		}
	});
}

// update view on geolocation update of phone
map.geo.on('update', refresh);
*/