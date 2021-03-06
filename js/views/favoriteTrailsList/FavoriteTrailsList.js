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
	favoriteToRemove: null,
	
	initComponent: function() {
        this.store = traildevils.favoritestore;
		
		this.listOptionsPlugin = new traildevils.views.FavoriteTrailsListOptionsPlugin();
		this.plugins = [
			this.listOptionsPlugin
		];
		
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
			},
			menuoptiontap: function(option, record) {
				this.onListOptionTap(option, record);
			},
			listoptionsclose: function() {
				if(this.favoriteToRemove !== null) {
					this.removeFavorite();
				}
			}
        };
		
		traildevils.on({
			scope: this,
			favoritedatachanged: function() {this.refresh()}
		});
		
        traildevils.views.FavoriteTrailsList.superclass.initComponent.apply(this, arguments);
    },
	
	/**
     * Handels tap event on trail item
     * @private
     */
    onTrailItemTap: function(container, index, item, e) {
		var trail = this.store.getAt(index);
		Ext.dispatch({
			controller: traildevils.controllers.detailController,
			action: 'showTrailDetail',
			trail: trail,
			parentType: 'favorite',
			origin: 'favorite'
		});
		
		// close options menu
		this.listOptionsPlugin.doHideOptionsMenuWithoutAnim();
    },
	
	/**
     * Handels tap event on list option
     * @private
     */
	onListOptionTap: function(option, record) {
		// if delete option was tapped
		if(option.cls == 'delete') {
			// close options menu
			this.favoriteToRemove = record;
		}
		this.listOptionsPlugin.hideOptionsMenu(record);
	},
	
	/**
     * Removes trail from favorite list
     * @private
     */
	removeFavorite: function() {
		Ext.dispatch({
			controller: traildevils.controllers.favoriteController,
			action: 'removeFavorite',
			trail: this.favoriteToRemove,
			callback: this.favoriteRemoved,
			scope: this
		});
	},
	
	/**
     * Resets component after favorite was removed
     */
	favoriteRemoved: function() {
		this.favoriteToRemove = null;
	}
	
});

// Create xtype
Ext.reg('favoriteTrailsList', traildevils.views.FavoriteTrailsList);
