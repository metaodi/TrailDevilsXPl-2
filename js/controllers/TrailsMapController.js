Ext.regController('trailsmap', {
	trailMarkers: [],
	mapCenterLatitude: 0,
	mapCenterLongitude: 0,
	
    'addMarkers': function (options) {
		// TODO unschoen geloest (mapCenter-Variabeln werden je nachdem woher 'addMarkers' aufgerufen wird, anders gesetzt)
		if(this.mapCenterLatitude == 0 && this.mapCenterLongitude == 0) {
			this.resetMapCenterPosition();
		}
		
		// center map to correct position
		traildevils.views.trailsMap.setCenterPosition(this.mapCenterLatitude, this.mapCenterLongitude);
		
		// reset map center position
		this.resetMapCenterPosition();
		
		// remove all markers and listeners
		google.maps.event.clearInstanceListeners(traildevils.views.trailsMap.map);
		this.removeAllMarkers();
		
		// create infowindow with maxWidth depending on trailsMap Panelsize (all the markers will use this infowindow)
		var markerInfoWindow = new google.maps.InfoWindow({
			maxWidth: traildevils.views.trailsMap.getSize().width - 50
		});
		
		// prepare custom marker image with shadow
		// - image created with: http://mapicons.nicolasmollet.com/
		// - shadow created with: http://www.cycloloco.com/shadowmaker/shadowmaker.htm
		var markerImage = new google.maps.MarkerImage("resources/images/gmap_marker_cycling.png",
			new google.maps.Size(32.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		var markerShadow = new google.maps.MarkerImage("resources/images/gmap_marker_cycling-shadow.png",
			new google.maps.Size(51.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		
		for(var i = 0; i < traildevils.store.data.length; i++) {
			var trailData = traildevils.store.data.items[i].data;
			var trailPosition = new google.maps.LatLng(trailData.latitude, trailData.longitude);
			
			var marker = new google.maps.Marker({
				map: traildevils.views.trailsMap.map,
				position: trailPosition,
				title: trailData.title,
				icon: markerImage,
				shadow: markerShadow
			});
			
			var shortDescription = trailData.description
			if(shortDescription.length > 100) {
				shortDescription = shortDescription.substring(0, 100) + "...";
			}
			
			var trailDetailLinkEvent = 'Ext.dispatch({ controller: traildevils.controllers.trailsMapController, action: \'detail\', trail: traildevils.store.getAt(' + i + ') });';
		
			marker.content =
				'<div class="infowindow-content">' +
				'	<h1>' +
				'		<a href="#" onclick="' + trailDetailLinkEvent + '" title="Details anzeigen" >' + trailData.title + '</a>' +
				'	</h1>' +
				'	<div class="trail-info">' +
				'		<p class="trail-location">' + trailData.location + '</p>';
			if(trailData.thumb != "") {
				marker.content +=
					'	<img class="trail-image" src="' + trailData.thumb + '" alt="' + trailData.title + '" />';
			}
			marker.content +=
				'		<p class="trail-description">' + shortDescription + '</p>' +
				'		<p><a href="#" onclick="' + trailDetailLinkEvent + '" title="Details anzeigen" >weitere Informationen...</a></p>' +
				'	</div>' +
				'</div>';
			
			// use mouseup event instead of click event
			// click event doesn't work on mobile safari with google maps api v3 
			google.maps.event.addListener(marker, 'mouseup', function() {
				// this attribute references to the current marker
				markerInfoWindow.setContent(this.content);
				markerInfoWindow.open(traildevils.views.trailsMap.map, this);
			});
			
			this.trailMarkers.push(marker);
		}
	},
	
	'map': function (options) {
		traildevils.views.trailsMapMainPanel.setActiveItem(
			'trailsMapPanel',
			{
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			}
		);
	},
	
	'detail': function (options) {
		traildevils.views.trailDetailTabPanel = new traildevils.views.TrailDetailTabPanel({
			trail: options.trail
		});
		
		traildevils.views.trailDetailTabPanel.backBtn.setHandler(
			function() {
				Ext.dispatch({
					controller: traildevils.controllers.trailsMapController,
					action: 'map'
				});
			}
		);
		traildevils.views.trailDetailTabPanel.backBtn.setText('Map');
		
		traildevils.views.trailsMapMainPanel.setActiveItem(traildevils.views.trailDetailTabPanel, 'slide');
	},
	
	'showtrailonmap': function (options) {
		if(traildevils.views.viewport.getActiveItem() === traildevils.views.trailsMapMainPanel) {
			Ext.dispatch({
				controller: traildevils.controllers.trailsMapController,
				action: 'map'
			});
			traildevils.views.trailsMap.setCenterPosition(options.latitude, options.longitude);
		} else {
			this.mapCenterLatitude = options.latitude;
			this.mapCenterLongitude = options.longitude;
			traildevils.views.viewport.setActiveItem('trailsMapMainPanel', 'slide');
		}
	},
	
	removeAllMarkers: function() {
		for(var i = 0; i < this.trailMarkers.length; i++) {
			this.trailMarkers[i].setMap(null);
		}
		this.trailMarkers = [];
	},
	
	resetMapCenterPosition: function() {
		if(traildevils.geo.available) {
			// reset center position to current position
			this.mapCenterLatitude = traildevils.geo.latitude;
			this.mapCenterLongitude = traildevils.geo.longitude;
		} else if(traildevils.store.data.length > 0) {
			// reset center position to position of first trail in store
			this.mapCenterLatitude = traildevils.store.getAt(0).data.latitude;
			this.mapCenterLongitude = traildevils.store.getAt(0).data.longitude;
		}
	}
});

traildevils.controllers.trailsMapController = Ext.ControllerManager.get('trailsmap');