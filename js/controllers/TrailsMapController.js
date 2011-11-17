Ext.regController('trailsmap', {
	trailMarkers: [],
	
    'addMarkers': function (options) {
		// center map to current position
		traildevils.views.trailsMap.setCenterPosition(traildevils.views.geoLocation.latitude, traildevils.views.geoLocation.longitude);
		
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
		} else {
			traildevils.views.viewport.setActiveItem('trailsMapMainPanel', 'slide' );
		}
		// center map to trails position
		traildevils.views.trailsMap.setCenterPosition(options.latitude, options.longitude);
	},
	
	removeAllMarkers: function() {
		for(var i = 0; i < this.trailMarkers.length; i++) {
			this.trailMarkers[i].setMap(null);
		}
		this.trailMarkers = [];
	}
});

traildevils.controllers.trailsMapController = Ext.ControllerManager.get('trailsmap');