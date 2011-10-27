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
    activeCls: 'trail-item-swiped',
	
	
	grouped : true,
	
	itemTpl: [
		'<div class="trail-item">',
		'	<div class="action fav x-button"><img class="x-icon-mask favorites" /></div>',
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
		'</div>'
	],
	
	initComponent: function() {

		this.plugins = {
			ptype: 'germanPullRefreshPlugin'
		};
	
        Ext.apply(this, {
            store: Ext.getStore('Trails')
        });
		this.store.load();
		
		// calculate distance for all trails
		for(var i = 0; i < this.store.data.length; i++) {
			this.store.data.items[i].data.distance = traildevils.views.geoLocation.getDistance(this.store.data.items[i].data.latitude, this.store.data.items[i].data.longitude);
		}
		
		this.on({
            //scope: this,
            //itemswipe: this.onItemSwipe,
			itemtap: this.onTrailItemTap
        });
		
        traildevils.views.TrailsList.superclass.initComponent.apply(this, arguments);
    },
	
    onTrailItemTap: function(container, index, item, e) {
        var _trailData = this.store.getAt(index)
        if (_trailData !== undefined) {
			Ext.dispatch({
				controller: traildevils.controllers.trailsListController,
				action: 'detail',
				trail: _trailData
			});
        }
    },
	
	/**
     * @private
     * Handler for the itemswipe event - shows the Delete button for the swiped item, hiding the Delete button
     * on any other items
     */
    onItemSwipe: function(list, index, node) {
        var el        = Ext.get(node),
            activeCls = this.activeCls,
            hasClass  = el.hasCls(activeCls);
        
        this.deactivateAll();
        
        if (hasClass) {
            el.removeCls(activeCls);
        } else {
            el.addCls(activeCls);
        }
    }
});

// Create xtype trailsList
Ext.reg('trailsList', traildevils.views.TrailsList);
