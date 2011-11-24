/**
 * @class traildevils.views.FavoriteTrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.FavoriteTrailsList = Ext.extend(Ext.List, {
	fullscreen: true,
	disableSelection: true,
	loadingText: 'Lade Trails...',
	emptyText: '<div class="empty-text">Keine Favoriten vorhanden</div>',
	
	initComponent: function() {
        this.store = traildevils.favoritestore;
		
		var tpl =
			'<div class="trail-item">' +
			'	<div class="trail-image"><tpl if="thumb"><img src="{thumb}" alt="{title}" /></tpl></div>' +
			'	<div class="trail-info">' +
			'		<h1>{title}</h1>' +
			'		<dl>' +
			'			<dt>Ort:</dt>' +
			'			<dd>{location}</dd>' +
			'		</dl>' +
			'	</div>' +
			'	<div class="trail-types">' +
			'		<tpl for="types">' +
			'			<div class="trail-type">{name}</div>' +
			'		</tpl>' +
			'	</div>' +
			'	<tpl if="distance">' +
			'		<div class="trail-distance">' +
			'			<p>{formattedDistance}</p>' +
			'		</div>'+
			'	</tpl>'+
			'</div>';
		
		this.itemTpl = tpl;
		
		
		this.listeners = {
			itemtap: function(container, index, item, e) {
				this.onTrailItemTap(container, index, item, e);
			}
        };
		
        traildevils.views.FavoriteTrailsList.superclass.initComponent.apply(this, arguments);
    },
	
    onTrailItemTap: function(container, index, item, e) {
		// TODO close options menu on item tap
		var trail = this.store.getAt(index);
		Ext.dispatch({
			controller: traildevils.controllers.favoriteTrailsListController,
			action: 'detail',
			trail: trail
		});
    }
});

// Create xtype
Ext.reg('favoriteTrailsList', traildevils.views.FavoriteTrailsList);
