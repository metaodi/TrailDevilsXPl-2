/**
 * @class traildevils.views.TrailDetailInfoPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailInfoPanel = Ext.extend(Ext.Panel, {
	title: 'Info',
	scroll: 'vertical',
	
	styleHtmlContent: true,
	
	initComponent: function() {
		var trailLocation = new google.maps.LatLng(this.data.latitude, this.data.longitude);
		
        this.tpl = new Ext.XTemplate(
			'<div class="trail-detail">',
			'	<div class="trail-image"><img src="{thumb}" alt="{title}" /></div>',
			'	<div class="trail-info">',
			'		<h1>{title}</h1>',
			'		<dl>',
			'			<dt>Ort:</dt>',
			'			<dd>{location}</dd>',
			'			<dt>Entfernung:</dt>',
			'			<dd>{distance}m</dd>',
			'		</dl>',
			'	</div>',
			'	<div class="trail-description">{description}</div>',
			'</div>'
		);
		
		var map = new Ext.Map({
			height: 300,
			width: 250,
			mapOptions: {
				zoom: 12,
				center: trailLocation,
                disableDefaultUI: true
			},
            maskMap: true
		});
		/*
		this.items = new Ext.DataView({
			store: this.data,
			tpl: this.tpl,
			itemSelector: 'div.trail-detail'
		});*/
		
        traildevils.views.TrailDetailInfoPanel.superclass.initComponent.call(this);
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