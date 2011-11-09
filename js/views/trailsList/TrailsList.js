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
	
	itemTpl: [
		'<div class="trail-item">',
		'	<div class="trail-image"><tpl if="thumb != &quot;&quot;"><img src="{thumb}" alt="{title}" /></tpl></div>',
		'	<div class="trail-info">',
		'		<h1>{title}</h1>',
		'		<dl>',
		'			<dt>Ort:</dt>',
		'			<dd>{location}</dd>',
		'		</dl>',
		'	</div>',
		'	<tpl for="types">',
		'		<p>{name}</p>',
		'	</tpl>',
		'	<div class="trail-distance">',
		'		<p>{formattedDistance}</p>',
		'	</div>',
		'</div>'
	],
	
	initComponent: function() {
		this.listOptionsPlugin = new traildevils.views.TrailsListOptionsPlugin();
		this.plugins = [
			{ ptype: 'trailsListPullRefreshPlugin' },
			{ ptype: 'trailsListPagingPlugin' },
			this.listOptionsPlugin
		];
	
        this.store = traildevils.store;
		
		this.listeners = {
			itemtap: function(container, index, item, e) {
				this.onTrailItemTap(container, index, item, e);
			},
			menuoptiontap: function(option, record) {
				this.onListOptionTap(option, record);
			}
        };
		
        traildevils.views.TrailsList.superclass.initComponent.apply(this, arguments);
    },
	
    onTrailItemTap: function(container, index, item, e) {
		// TODO close options menu on item tap
		var trail = this.store.getAt(index);
		Ext.dispatch({
			controller: traildevils.controllers.trailsListController,
			action: 'detail',
			trail: trail
		});
    },
	onListOptionTap: function(option, record) {
		// if favorite option was tapped
		if(option.cls == 'favorite' || option.cls == 'favorite-act') {
			// add trail to favorite store
			//favStore.add(record)
			
			// toggle favorite flag on trail
			record.toggleFavorite();
			
			// show favorite popup
			Ext.dispatch({
				controller: traildevils.controllers.favoritePopupController,
				action: 'showpopup',
				favorite: record.data.favorite
			});
		}
		
		// close options menu
		this.listOptionsPlugin.hideOptionsMenu(record);
	}
});

// Create xtype
Ext.reg('trailsList', traildevils.views.TrailsList);
