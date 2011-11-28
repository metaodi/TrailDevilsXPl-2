/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsList = Ext.extend(Ext.List, {
	fullscreen: true,
	disableSelection: true,
	grouped : true,
	loadingText: 'Lade Trails...',
	emptyText: '<div class="empty-text">Keine Trails vorhanden</div>',
	
	initComponent: function() {
		this.store = traildevils.store;
		
		this.listOptionsPlugin = new traildevils.views.TrailsListOptionsPlugin();
		this.plugins = [
			{ ptype: 'trailsListPullRefreshPlugin' },
			{ ptype: 'trailsListPagingPlugin' },
			this.listOptionsPlugin
		];
		
		var tpl =
			'<div class="trail-item">' +
				'<div class="trail-image"><tpl if="thumb"><img src="{thumb}" alt="{title}" /></tpl></div>' +
				'<div class="trail-info">' +
					'<h1>{title}</h1>' +
					'<dl>' +
						'<dt>Ort:</dt>' +
						'<dd>{location}</dd>' +
					'</dl>' +
				'</div>' +
				'<div class="trail-types">' +
					'<tpl for="types">' +
						'<div class="trail-type">{name}</div>' +
					'</tpl>' +
				'</div>' +
				'<tpl if="distance">' +
					'<div class="trail-distance">' +
						'<p>{formattedDistance}</p>' +
					'</div>'+
				'</tpl>'+
			'</div>';
		
		this.itemTpl = tpl;
		
		this.listeners = {
			itemtap: function(container, index, item, e) {
				this.onTrailItemTap(container, index, item, e);
			},
			menuoptiontap: function(option, record) {
				this.onListOptionTap(option, record);
			}
        };
		traildevils.on({
			scope: this,
			distanceupdated: function() {this.refresh()},
			datarefreshed: function() {this.refresh()}
		});
		
        traildevils.views.TrailsList.superclass.initComponent.call(this);
    },
	
	/**
     * Handels tap event on trail item
     * @private
     */
    onTrailItemTap: function(container, index, item, e) {
		var trail = this.store.getAt(index);
		Ext.dispatch({
			controller: traildevils.controllers.trailsListController,
			action: 'detail',
			trail: trail
		});
    },
	
	/**
     * Handels tap event on list option
     * @private
     */
	onListOptionTap: function(option, record) {
		// if favorite option was tapped
		if(option.cls == 'favorite' || option.cls == 'favorite-act') {
			Ext.dispatch({
				controller: traildevils.controllers.favoriteTrailsListController,
				action: 'toggleFavorite',
				trail: record
			});
		}
		
		// close options menu
		this.listOptionsPlugin.hideOptionsMenu(record);
	}
});

// Create xtype
Ext.reg('trailsList', traildevils.views.TrailsList);
