/**
 * @class traildevils.views.TrailDetailInfoPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailInfoPanel = Ext.extend(Ext.Panel, {
	title: 'Info',
	
	tpl: new Ext.XTemplate('<div>{description}</div>'),
	styleHtmlContent: true,
	
	initComponent: function() {
		var trailLocation = new google.maps.LatLng(this.data.latitude, this.data.longitude);
        
		var map = new Ext.Map({
			height: 300,
			width: 300,
			mapOptions: {
				zoom: 12,
				center: trailLocation
			}
		});
		
		this.items = [
			map
		];
		
        traildevils.views.TrailDetailPanel.superclass.initComponent.call(this);
    },
	
	// @TODO doesn't work
	addMarker: function() {
		var marker = new google.maps.Marker({
			map: this.items[0].map,
			position: new google.maps.LatLng(this.data.latitude, this.data.longitude),
			title: 'test'
		});
	}
});

// Create xtype trailDetailInfoPanel
Ext.reg('trailDetailInfoPanel', traildevils.views.TrailDetailInfoPanel);