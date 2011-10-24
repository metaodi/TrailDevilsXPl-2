/**
 * @class traildevils.views.TrailDetailInfoPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailInfoPanel = Ext.extend(Ext.Panel, {
	title: 'Info',
	scroll: 'vertical',
	layout: 'fit',
	
	styleHtmlContent: true,
	
	initComponent: function() {
		var trailLocation = new google.maps.LatLng(this.data.latitude, this.data.longitude);
		
		var trailMapImageUrl = 'http://maps.google.com/maps/api/staticmap?';
		trailMapImageUrl += 'center=' + this.data.latitude + "," + this.data.longitude;
		trailMapImageUrl += '&markers=color:red|label:A|' + this.data.latitude + ',' + this.data.longitude;
		trailMapImageUrl += '&zoom=12&size=300x300&maptype=roadmap&sensor=false';
		
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
			'	<div class="trail-map">',
			'		<h2>Kartenansicht:</h2>',
			'		<img src="' + trailMapImageUrl + '" alt="Kartenansicht des Trails: {title}" />',
			'		<p><a href="#" target="_blank">Hier klicken um auf Karte zu öffnen</a></p>',
			'	</div>',
			'</div>'
		);
		
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