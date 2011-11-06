/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsList = Ext.extend(Ext.List, {
	fullscreen: true,
	
    /**
     * @cfg {String} activeCls The CSS class that is added to each item when swiped
     */
    swipedCls: 'trail-item-swiped',
	disableSelection: true,
	grouped : true,
	loadingText: 'Lade Trails...',
	
	itemTpl: [
		'<div class="trail-item">',
		'	<div class="action fav x-button"><img class="x-icon-mask favorites" /></div>',
        '	<div class="trail-image"><tpl if="thumb != &quot;&quot;"><img src="{thumb}" alt="{title}" /></tpl></div>',
		'	<div class="trail-info">',
		'		<h1>{title}</h1>',
		'		<dl>',
		'			<dt>Ort:</dt>',
		'			<dd>{location}</dd>',
		'		</dl>',
		'	</div>',
		'	<div class="trail-distance">',
		'		<p>{formattedDistance}</p>',
		'	</div>',
		'</div>'
	],
	
	initComponent: function() {
		this.plugins = [
			{ ptype: 'trailsListPullRefreshPlugin' },
			{ ptype: 'trailsListPagingPlugin' }
		];
	
        this.store = traildevils.store;
		
		this.listeners = {
            itemswipe: function(container, index, item, e) {
				this.onTrailItemSwipe(container, index, item, e);
			},
			itemtap: function(container, index, item, e) {
				this.onTrailItemTap(container, index, item, e);
			}
        };
		
        traildevils.views.TrailsList.superclass.initComponent.apply(this, arguments);
    },
	
    onTrailItemTap: function(container, index, item, e) {
		// if favorite button is clicked
		if (e.getTarget('.favorites')) {
            this.handleFavButtonTap(index);
			
			traildevils.views.favoritePopupPanel = new traildevils.views.FavoritePopupPanel({
				popupText: 'unstarred'
			});
			traildevils.views.favoritePopupPanel.addCls('act');
			
			traildevils.views.favoritePopupPanel.show('pop');
			// hide popup after 600ms and destroy after 1000ms
			setTimeout('traildevils.views.favoritePopupPanel.hide()', 800);
			setTimeout('traildevils.views.favoritePopupPanel.destroy()', 1200);
		} else {
			// deactivate all swipe classes
			this.removeAllSwipeClasses();

			var trail = this.store.getAt(index);
			Ext.dispatch({
				controller: traildevils.controllers.trailsListController,
				action: 'detail',
				trail: trail
			});
		}
    },
    onTrailItemSwipe: function(container, index, item, e) {
		// deactivate all swipe classes
		this.removeAllSwipeClasses();
		
        var el = Ext.get(item);
        var hasClass  = el.hasCls(this.swipedCls);
        
        if (hasClass) {
            el.removeCls(this.swipedCls);
        } else {
            el.addCls(this.swipedCls);
        }
    },
	removeAllSwipeClasses: function() {
		console.log("remove");
		Ext.select(('div.' + this.swipedCls), this.el.dom).removeCls(this.swipedCls);
	},
	handleFavButtonTap: function(index) {
		var favStore = this.store;
		var trail = this.store.getAt(index);
		
		// add trail to favorite store
		//favStore.add(trail)
		console.log("trail " + trail.data.title + " added to favstore");
		
		this.removeAllSwipeClasses();
	}
});

// Create xtype
Ext.reg('trailsList', traildevils.views.TrailsList);
