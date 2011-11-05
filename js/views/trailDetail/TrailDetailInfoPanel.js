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
		// TODO change url to windows.location.href (doesn't work for development on localhost)
		//trailMapImageUrl += 'markers=icon:' + window.location.href + 'resources/images/gmap_marker_cycling.png|' + this.data.latitude + ',' + this.data.longitude;
		trailMapImageUrl += 'markers=icon:http://jenkins.rdmr.ch/resources/images/gmap_marker_cycling.png|' + this.data.latitude + ',' + this.data.longitude;
		trailMapImageUrl += '&zoom=12&size=270x300&maptype=roadmap&sensor=false';
		
        this.tpl = new Ext.XTemplate(
			'<div class="trail-detail">',
			'	<tpl if="thumb != &quot;&quot;"><div class="trail-image"><img src="{thumb}" alt="{title}" /></div></tpl>',
			'	<div class="trail-info">',
			'		<h1>{title}</h1>',
			'		<dl>',
			'			<dt>Ort:</dt>',
			'			<dd>{location}</dd>',
			'			<dt>Entfernung:</dt>',
			'			<dd>{formattedDistance}</dd>',
			'		</dl>',
			'	</div>',
			'	<div class="trail-description">{description}</div>',
			'	<div class="trail-map">',
			'		<h2>Kartenansicht:</h2>',
			'		<img src="' + trailMapImageUrl + '" alt="Kartenansicht des Trails: {title}" />',
			'	</div>',
			'</div>'
		);
		
        traildevils.views.TrailDetailInfoPanel.superclass.initComponent.call(this);
    }
});

// Create xtype trailDetailInfoPanel
Ext.reg('trailDetailInfoPanel', traildevils.views.TrailDetailInfoPanel);