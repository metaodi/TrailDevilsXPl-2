Ext.regController('map', {
	trailMarkers: [],
	centerLatitude: 0,
	centerLongitude: 0,
	parentType: 'normal',
	store: null,
	markerImage: null,
	markerShadow: null,
	markerOwnPosition: null,
	initialized: false,
	
	/**
     * Initialized controller at first call
     * @private
     */
	initController: function() {
		// prepare custom marker image with shadow
		// - image created with: http://mapicons.nicolasmollet.com/
		// - shadow created with: http://www.cycloloco.com/shadowmaker/shadowmaker.htm
		this.markerImage = new google.maps.MarkerImage("resources/images/gmap_marker_cycling.png",
			new google.maps.Size(32.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		this.markerShadow = new google.maps.MarkerImage("resources/images/gmap_marker_cycling-shadow.png",
			new google.maps.Size(51.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		
		traildevils.on('locationchanged', function() {this.updateOwnPosition()},this);
		
		this.resetControllerOptions();
		
		this.initialized = true;
	},
	
	addMarkers: function(options) {
		if(!this.initialized) {
			this.initController();
		}
		
		// if geolocation is available add marker for own position
		if(traildevils.geo.available && this.markerOwnPosition == null) {
			var ownPosition = new google.maps.LatLng(traildevils.geo.latitude, traildevils.geo.longitude);
			this.markerOwnPosition = new google.maps.Marker({
				map: traildevils.views.trailsMap.map,
				position: ownPosition,
				icon: 'resources/images/gmap_marker_own_position.png',
				clickable: false
			});
		}
		
		// remove all markers and listeners
		google.maps.event.clearInstanceListeners(traildevils.views.trailsMap.map);
		this.removeAllMarkers();
		
		// center map to correct position
		traildevils.views.trailsMap.setCenterPosition(this.centerLatitude, this.centerLongitude);
		
		// create infowindow with maxWidth depending on trailsMap panelsize (all markers will use this infowindow)
		var markerInfoWindow = new google.maps.InfoWindow({
			maxWidth: traildevils.views.trailsMap.getSize().width - 50
		});
		
		// add markers to map
		for(var i = 0; i < this.store.data.length; i++) {
			this.addSingleMarker(this.store.data.items[i].data, i, markerInfoWindow);
		}
	},
	
	/**
     * Adds single marker to map
     * @private
     */
	addSingleMarker: function(trailData, index, markerInfoWindow) {
		var trailPosition = new google.maps.LatLng(trailData.latitude, trailData.longitude);
		
		var marker = new google.maps.Marker({
			map: traildevils.views.trailsMap.map,
			position: trailPosition,
			title: trailData.title,
			icon: this.markerImage,
			shadow: this.markerShadow
		});

		var shortDescription = trailData.description
		if(shortDescription.length > 100) {
			shortDescription = shortDescription.substring(0, 100) + "...";
		}
		
		var trailDetailLinkEvent = 'Ext.dispatch({ controller: traildevils.controllers.detailController, action: \'showTrailDetail\', trail: traildevils.controllers.mapController.store.getAt(' + index + '), parentType: \'' + this.parentType + '\', origin: \'map\' });';

		marker.content =
			'<div class="infowindow-content">';
		
		if(trailData.thumb) {
			marker.content +=
					'<div class="trail-image">' +
						'<img src="' + trailData.thumb + '" alt="' + trailData.title + '" />' +
					'</div>';
		}
		
		marker.content +=
				'<div class="trail-info">' +
					'<h1><a href="#" onclick="' + trailDetailLinkEvent + '" title="Details anzeigen" >' + trailData.title + '</a></h1>' +
					'<dl>' +
						'<dt>Ort:</dt>' +
						'<dd>' + trailData.location + '</dd>' +
						'<dt>Status:</dt>' +
						'<dd>' + trailData.status + '</dd>' +
					'</dl>' +
				'</div>' +
				'<div class="trail-description">' +
					'<p>' + shortDescription + '</p>' +
					'<p><a href="#" onclick="' + trailDetailLinkEvent + '" title="Details anzeigen" >weitere Informationen...</a></p>' +
				'</div>' +
			'</div>';

		// use mouseup event instead of click event
		// click event doesn't work on mobile safari with google maps api v3 
		google.maps.event.addListener(marker, 'mouseup', function() {
			// this attribute references to the current marker
			markerInfoWindow.setContent(this.content);
			markerInfoWindow.open(traildevils.views.trailsMap.map, this);
		});

		this.trailMarkers.push(marker);
	},
	
	showMap: function(options) {
		traildevils.views.trailsMapMainPanel.setActiveItem(
			'trailsMapPanel', {
				type: 'slide',
				direction: 'right',
				// destroy detail panel when returning to trailslist
				after: function() {
					traildevils.views.trailDetailTabPanel.destroy();
				}
			}
		);
	},
	
	showTrailOnMap: function(options) {
		if(!this.initialized) {
			this.initController();
		}
		
		this.parentType = options.parentType;
		
		switch(options.origin) {
			case 'map':
				// if map was already opened
				Ext.dispatch({
					controller: traildevils.controllers.mapController,
					action: 'showMap'
				});
				traildevils.views.trailsMap.setCenterPosition(options.latitude, options.longitude);
				break;
			case 'favorite':
				this.store = traildevils.favoritestore;
				this.centerLatitude = options.latitude;
				this.centerLongitude = options.longitude;
				traildevils.views.trailsMapPanel.dockedItems.items[0].setTitle("Favoriten in der Nähe");
				traildevils.views.viewport.setActiveItem('trailsMapMainPanel', 'slide');
				break;
			default:
				this.store = traildevils.store;
				this.centerLatitude = options.latitude;
				this.centerLongitude = options.longitude;
				traildevils.views.viewport.setActiveItem('trailsMapMainPanel', 'slide');
		}
	},
	
	showFavoriteTrailsOnMap: function(options) {
		if(!this.initialized) {
			this.initController();
		}
		
		this.parentType = options.parentType;
		
		this.store = traildevils.favoritestore;
		traildevils.views.trailsMapPanel.dockedItems.items[0].setTitle("Favoriten in der Nähe");
		traildevils.views.viewport.setActiveItem('trailsMapMainPanel', 
			{
				type: 'slide',
				direction: 'right'
			}
		);
	},
	
	/**
     * Resets controller options to default values
     */
	resetControllerOptions: function() {
		if(traildevils.geo.available) {
			// reset center position to current position
			this.centerLatitude = traildevils.geo.latitude;
			this.centerLongitude = traildevils.geo.longitude;
		} else if(traildevils.store.data.length > 0) {
			// reset center position to position of first trail in store
			this.centerLatitude = traildevils.store.getAt(0).data.latitude;
			this.centerLongitude = traildevils.store.getAt(0).data.longitude;
		}
		this.parentType = 'normal';
		this.store = traildevils.store;
		traildevils.views.trailsMapPanel.dockedItems.items[0].setTitle("Trails in der Nähe");
	},
	
	/**
     * Removes all markers from map
     * @private
     */
	removeAllMarkers: function() {
		for(var i = 0; i < this.trailMarkers.length; i++) {
			this.trailMarkers[i].setMap(null);
		}
		this.trailMarkers = [];
	},
	
	/**
     * Updates own position marker to current position
	 * @private
     */
	updateOwnPosition: function() {
		if(this.markerOwnPosition != null) {
			var ownPosition = new google.maps.LatLng(traildevils.geo.latitude, traildevils.geo.longitude);
			this.markerOwnPosition.setPosition(ownPosition);
		}
	}
});

traildevils.controllers.mapController = Ext.ControllerManager.get('map');