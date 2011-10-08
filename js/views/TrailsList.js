/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsList = Ext.extend(Ext.List, {
	cls: 'trailslist',
	
	plugins: [
		// @TODO unschön gelöst
		new Ext.plugins.PullRefreshPlugin({
			pullRefreshText: 'Zum Aktualisieren herunterziehen',
			releaseRefreshText: 'Zum Aktualisieren loslassen...',
			loadingText: 'wird aktualisiert...',
			pullTpl: new Ext.XTemplate(
				'<div class="x-list-pullrefresh">',
				'	<div class="x-list-pullrefresh-arrow"></div>',
				Ext.LoadingSpinner,
				'	<div class="x-list-pullrefresh-wrap">',
				'		<h3 class="x-list-pullrefresh-message">{message}</h3>',
				'		<div class="x-list-pullrefresh-updated">Zuletzt aktualisiert: {lastUpdated:date("d.m.Y H:i:s")}</span></div>',
				'	</div>',
				'</div>'
			)
		})
	],
	
	grouped : true,
	indexBar: false,
	itemTpl: [
		'<div class="trail">',
		'	<div class="trail-image"><img src="{imagepath}" alt="{title}" /></div>',
		'	<div class="trail-description">',
		'		<h1>{title}</h1>',
		'		<p>{description}</p>',
		'		<p>Ort: {location}</p>',
		'		<p>Entfernung: {distance}m</p>',
		'	</div>',
		'</div>'
	],
	
	initComponent: function() {
        Ext.apply(this, {
            store: Ext.getStore('Trails'),
			
			dockedItems: [{
				xtype: 'toolbar',
				dock : 'top',
				
				items: [{
					xtype: 'spacer'
				}, {
					xtype: 'trailSearchTextField'
				}, {
					xtype: 'spacer'
				}]
			}]
        });
		
        traildevils.views.TrailsList.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailsList
Ext.reg('trailsList', traildevils.views.TrailsList);