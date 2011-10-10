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
		this.store.load();
		
		this.on({
            scope: this,
            itemswipe: this.onItemSwipe,
			itemtap: this.onItemTap,
            containertap: this.deactivateAll
        });
		
        traildevils.views.TrailsList.superclass.initComponent.apply(this, arguments);
    },
	
	/**
     * @private
     * Here we intercept the normal tap handler. If the user tapped on the delete button we stop the event here
     * and remove the item from the store, otherwise we allow the event to continue
     */
    onItemTap: function(event, target) {
        /*if (event.getTarget('.' + this.activeCls + ' div.fav')) {
				var store    = this.store,
                selModel = this.getSelectionModel(),
                instance = store.getAt(index),
                selected = selModel.isSelected(instance),
                nearest  = store.getAt(index + 1) || store.getAt(index - 1);
            
            //if the item we are removing is currently selected, select the nearest item instead
            if (selected && nearest) {
                selModel.select(nearest);
            }
            
            store.removeAt(index);
            store.sync();
            
            //there were no other searches left so tell the user about that
            if (!nearest) {
                Ext.redirect('trails/first');
            }
        } else {*/
            this.deactivateAll();
			Ext.dispatch({
				controller: traildevils.controllers.trailsListController,
				action: 'detail',
				note: target
			});
        
    },
	
	/**
     * @private
     * Removes the 'Delete' button from all items
     */
    deactivateAll: function() {
        Ext.select('div.trail-item', this.el.dom).removeCls(this.activeCls);
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
