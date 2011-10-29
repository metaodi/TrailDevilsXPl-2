Ext.regController('trailsmap', {
	trailMarkers: [],
	
    'addMarkers': function (options) {
		var store = Ext.getStore('Trails')
        store.load();
		
		for(var i = 0; i < store.data.length; i++) {
			var trailData = store.data.items[i].data;
			var trailPosition = new google.maps.LatLng(trailData.latitude, trailData.longitude);
			var marker = new google.maps.Marker({
				map: options.map,
				position: trailPosition,
				title: trailData.title
			});
			marker.content = '<h1>' + trailData.title + '</h1><a href="#">klick mich</a>';
			
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
	}
});

traildevils.controllers.trailsMapController = Ext.ControllerManager.get('trailsmap');