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
		'		</dl>',
		'	</div>',
		'	<div class="trail-distance">',
		'		<p>{formattedDistance}</p>',
		'	</div>',
		'</div>'
	],
	
	initComponent: function() {

		this.plugins = {
			ptype: 'germanPullRefreshPlugin'
		};
	
        this.store = traildevils.store;
		
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
