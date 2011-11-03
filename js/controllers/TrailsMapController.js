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
			
			var shortDescription = trailData.description
			if(shortDescription.length > 100) {
				shortDescription = shortDescription.substring(0, 100) + "...";
			}
			
			var trailDetailEventLink = 'Ext.dispatch({ controller: traildevils.controllers.trailsMapController, action: \'detail\', storeIndex: ' + i + ' });';
		
			marker.content =
				'<div class="infowindow-content">' +
				'	<h1>' +
				'		<a href="#" onclick="' + trailDetailEventLink + '" title="Details anzeigen" >' + trailData.title + '</a>' +
				'	</h1>' +
				'	<div class="trail-info">' +
				'		<p class="trail-location">' + trailData.location + '</p>';
			if(trailData.thumb != "") {
				marker.content +=
					'	<img class="trail-image" src="' + trailData.thumb + '" alt="' + trailData.title + '" />';
			}
			marker.content +=
				'		<p class="trail-description">' + shortDescription + '</p>' +
				'		<p><a href="#" onclick="' + trailDetailEventLink + '" title="Details anzeigen" >weitere Informationen...</a></p>' +
				'	</div>' +
				'</div>';
			
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