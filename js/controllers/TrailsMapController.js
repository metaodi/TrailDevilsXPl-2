Ext.regController('trailsmap', {
	trailMarkers: [],
	
    'addMarkers': function (options) {
		// remove all markers and listeners
		google.maps.event.clearInstanceListeners(options.map);
		this.removeAllMarkers();
		
		// create infowindow (all the markers will use this infowindow)
		var markerInfoWindow = new google.maps.InfoWindow({
			maxWidth: 300
		});
		
		for(var i = 0; i < traildevils.store.data.length; i++) {
			var trailData = traildevils.store.data.items[i].data;
			var trailPosition = new google.maps.LatLng(trailData.latitude, trailData.longitude);
			var marker = new google.maps.Marker({
				map: options.map,
				position: trailPosition,
				title: trailData.title
			});
			
			marker.content = '<div class="infowindow-content"><h1>' + trailData.title + '</h1><a href="#" onclick="Ext.dispatch({ controller: traildevils.controllers.trailsMapController, action: \'detail\', storeIndex: ' + i + ' });">klick mich</a></div>';
			
			// use mouseup event instead of click event
			// click event doesn't work on mobile safari with google maps api v3 
			google.maps.event.addListener(marker, 'mouseup', function() {
				// this attribute references to the current marker
				markerInfoWindow.setContent(this.content);
				markerInfoWindow.open(options.map, this);
			});
			
			this.trailMarkers.push(marker);
		}
	},
	
	'map': function (options) {
		traildevils.views.trailsMapMainPanel.setActiveItem(
		'trailsMapPanel', {
			type: 'slide',
			direction: 'right',
			// destroy detail panel when returning to trailslist
			after: function() {
				traildevils.views.trailMapDetailTabPanel.destroy();
			}
		});
	},
	
	'detail': function (options) {
		traildevils.views.trailMapDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			// @TODO unschön gelöst. konnte nicht das trail-Objekt übergeben da Aufruf aus <a href...>
			trail: traildevils.store.getAt(options.storeIndex)
		});
		
		traildevils.views.trailMapDetailTabPanel.backBtn.setHandler(
			function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsMapController,
					action: 'map'
				});
			}
		);
		
		traildevils.views.trailsMapMainPanel.setActiveItem(traildevils.views.trailMapDetailTabPanel, 'slide');
	},
	
	removeAllMarkers: function() {
		for(var i = 0; i < this.trailMarkers.length; i++) {
			this.trailMarkers[i].setMap(null);
		}
		this.trailMarkers = [];
	}
});

traildevils.controllers.trailsMapController = Ext.ControllerManager.get('trailsmap');