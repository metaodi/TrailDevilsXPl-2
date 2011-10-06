Ext.setup({
	tabletStartupScreen: 'view/images/phone_startup.jpg',
	phoneStartupScreen: 'view/images/phone_startup.jpg',
	icon: 'view/images/app_icon.jpg',
	glossOnIcon: true,
	onReady: function() {
		var timeline, map, ajax, panel, tabBar, refresh, addMarker, clearMarkers;
		var markersArray = [];
			
		timeline = new Ext.Component({
        	iconCls: 'time',
			title: 'Timeline',
			cls: 'timeline',
			scroll: 'vertical',
			tpl: [
					'<tpl for=".">',
					' <div class="tweet">',
						' <div class="avatar"><img src="{profile_image_url}" /></div>',
						' <div class="tweet-content">',
							' <h2>{from_user}</h2>',
							' <p>{text}</p>',
						' </div>',
					' </div>',
					'</tpl>'
				 ]
		});
		
		ajax = new Ext.Component({
        	iconCls: 'info',
			title: 'Ajax',
			cls: 'ajax',
			scroll: 'vertical',
			tpl: [
					'<tpl for=".">',
					' <div class="ajax">',
							' <h2>Response:</h2>',
							'<p> {response}</p>',
					' </div>',
					'</tpl>'
				 ]
		});
		
		map = new Ext.Map({
        	iconCls: 'locate',
	        title: 'Map',        // Name that appears on this tab
	        useCurrentLocation: true,   // Gets user's current location
	        mapOptions: {        // Used in rendering map
	          zoom: 12
	        }
	    });
		
		var trailslist = getTrailsList();
		
	    panel = new Ext.TabPanel({
	        fullscreen: true,            // The panel will take up the full rather than partial screen
	        cardSwitchAnimation: 'slide',       // Special effect for switching between cards
	        items: [map, timeline, ajax, trailslist],
	        tabBar: {
	        	dock: 'bottom',
	        	scroll: {
	        		direction: 'horizontal',
	        		useIndicators: false
	        	},
	        	layout: {
	        		pack: 'center'
	        	}
	        }
	    });
	    
	    addMarker = function(tweet, position) {        // Define addMarker function
            var marker = new google.maps.Marker({          // Define variable to hold marker data
	            map: map.map,
	            position: position,
	        });
            markersArray.push(marker);
	    }
	    clearMarkers = function() {
	    	for(var i = 0; i < markersArray.length; i++) {
	    		markersArray[i].setMap(null);
	    	}
	    	markersArray = [];
	    }
	    
		refresh = function() {                           // Define the refresh function
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
			Ext.Ajax.request({
				url : 'php/AjaxHandler.class.php' , 
				params : { 
					className : 'DataLoader' ,
					functionName : 'echoData' ,
					params : 'reflection_test,another_param'
				},
				method: 'GET',
				success: function ( result, request ) {
					//Ext.Msg.alert('Sucess:', result.responseText); 
					ajax.update(JSON.stringify(result.responseText)); 
				},
				failure: function ( result, request) { 
					Ext.Msg.alert('Failed', result.responseText); 
				} 
			});
			//Ext.Ajax.defaultHeaders = {'Accept': 'application/json'};
			Ext.Ajax.request({
				url : 'http://152.96.80.18:8080/api/trails' , 
				method: 'GET',
				success: function ( result, request ) {
					Ext.Msg.alert('Sucess:', result.responseText); 
					//ajax.update(JSON.stringify(result.responseText)); 
				},
				failure: function ( result, request) { 
					Ext.Msg.alert('Failed', result.responseText); 
				} 
			});
		};
		
		
		panel.getTabBar().add([
		    {xtype: 'spacer'},
		    {
		    xtype: 'button',
		    iconMask: true,
		    iconCls: 'refresh',
		    ui: 'plain',
		    style: 'margin:0;',
		    handler: refresh
		    }
		]);
	    
		panel.getTabBar().doLayout();
		
		// update view on geolocation update of phone
	    map.geo.on('update', refresh);
	}
});

