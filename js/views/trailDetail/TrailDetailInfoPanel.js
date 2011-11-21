/**
 * @class traildevils.views.TrailDetailInfoPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailInfoPanel = Ext.extend(Ext.Panel, {
	title: 'Info',
	scroll: 'vertical',
	layout: 'fit',
	origin: '',
	
	initComponent: function() {
		var xtpl =
			'<div class="trail-detail">' +
				'<div class="trail-detail-head">' +
					'<div class="trail-info">' +
						'<tpl if="thumb"><div class="trail-image"><img src="{thumb}" alt="{title}" /></div></tpl>' +
						'<h1>{title}</h1>' +
						'<dl>' +
							'<dt>Ort:</dt>' +
							'<dd>{location}</dd>' +
							'<tpl if="distance">' +
								'<dt>Entfernung:</dt>' +
								'<dd>{formattedDistance}</dd>' +
							'</tpl>' +
							'<dt>Status:</dt>' +
							'<dd class="status-{status}">{status}</dd>' +
						'</dl>' +
						'<div class="trail-types">' +
							'<tpl for="types">' +
								'<div class="trail-type">{name}</div>' +
							'</tpl>' +
						'</div>' +
					'</div>' +
					'<div class="clear"></div>' +
				'</div>' +
				'<div class="trail-detail-body">' +
					'<div class="trail-description">{description}</div>';
		
		if(traildevils.online) {
			var trailMapImageUrl = 'http://maps.google.com/maps/api/staticmap?';
			// TODO change url to windows.location.href (doesn't work for development on localhost)
			//trailMapImageUrl += 'markers=icon:' + window.location.href + 'resources/images/gmap_marker_cycling.png|' + this.data.latitude + ',' + this.data.longitude;
			trailMapImageUrl += 'markers=icon:http://jenkins.rdmr.ch/resources/images/gmap_marker_cycling.png|' + this.data.latitude + ',' + this.data.longitude;
			trailMapImageUrl += '&zoom=12&size=290x300&maptype=roadmap&sensor=false';

			var showOnMapLinkEvent = "Ext.dispatch({ controller: traildevils.controllers.trailsMapController, action: 'showTrailOnMap', origin: '" + this.origin + "', latitude: '" + this.data.latitude + "', longitude: '" + this.data.longitude + "' });";
			
			xtpl +=
						'<div class="trail-map">' +
							'<h2>' +
								'Kartenansicht <a class="trail-map-showonmap-link" href="#" onclick="' + showOnMapLinkEvent + '">auf Karte anzeigen</a>' +
							'</h2>' +
							'<img src="' + trailMapImageUrl + '" alt="Kartenansicht des Trails: {title}" />' +
						'</div>';
		}
		
		xtpl +=
				'</div>' +
			'</div>';
		
        this.tpl = new Ext.XTemplate(xtpl);
		
        traildevils.views.TrailDetailInfoPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailInfoPanel', traildevils.views.TrailDetailInfoPanel);