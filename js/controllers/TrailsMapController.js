Ext.regController('trailsmap', {
	trailMarkers: [],
	
    'addMarkers': function (options) {		
		for(var i = 0; i < traildevils.store.data.length; i++) {
			var trailData = traildevils.store.data.items[i].data;
			var trailPosition = new google.maps.LatLng(trailData.latitude, trailData.longitude);
			var marker = new google.maps.Marker({
				map: options.map,
				position: trailPosition,
				title: trailData.title
			});
			marker.content = '<h1>' + trailData.title + '</h1><a href="#" onclick="Ext.dispatch({ controller: traildevils.controllers.trailsMapController, action: \'detail\', storeIndex: ' + i + ' });">klick mich</a>';
			
			google.maps.event.addListener(marker, 'click', function() {
				if(!this.markerInfoWindow) { // um bestehende infowindows wiederzuverwenden
					this.markerInfoWindow = new google.maps.InfoWindow({
						content: this.content
					});
				}
				this.markerInfoWindow.open(options.map, this);
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
	}
});

traildevils.controllers.trailsMapController = Ext.ControllerManager.get('trailsmap');