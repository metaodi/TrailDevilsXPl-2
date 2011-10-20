/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.TrailsList = Ext.extend(Ext.List, {
	cls: 'trailslist',
	fullscreen: true,
    singleSelect: true,
	
    /**
     * @cfg {String} activeCls The CSS class that is added to each item when swiped
     */
    activeCls: 'trail-item-swiped',
	
	plugins: {ptype: 'germanPullRefreshPlugin'},
	
	grouped : true,
	indexBar: false,
	
	itemTpl: [
		'<div class="trail-item">',
		'	<div class="action fav x-button"><img class="x-icon-mask favorites" /></div>',
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
            store: Ext.getStore('Trails')
        });
		// @TODO load data to store
		//this.store.load();
		
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
