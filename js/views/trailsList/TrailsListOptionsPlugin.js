/**
 * @class traildevils.views.TrailsListOptionsPlugin
 * @extends Ext.ux.touch.ListOptions
 * 
 * http://www.swarmonline.com/2011/03/ext-ux-touch-listoptions-add-a-twitter-style-menu-to-your-list-items/
 * 
 */

traildevils.views.TrailsListOptionsPlugin = Ext.extend(Ext.ux.touch.ListOptions, {
	revealDirection: 'right',
	swipeDirection: 'right',
	hideOnScroll: true,
	menuOptions: [{
		id: 'favorite',
		cls: 'favorite',
		enabled: true
	}],

	/**
	 * Handler for the List's 'itemswipe' event
	 * Hides any visible List Options
	 * Caches the List Item we're working with
	 * Sets some styles needed for it to look right
	 * Shows the List Options
	 * @param {Object} dataView
	 * @param {Object} index
	 * @param {Object} item
	 * @param {Object} e
	 */
    onItemSwipe: function(dataView, index, item, e){
		// check we're over the 'swipethreshold'
		if(this.revealAllowed(e.direction, e.distance)){
			// set the direction of the reveal
			this.setRevealDirection(e.direction);

			// cache the current List Item's elements for easy use later
			this.activeListItemRecord = dataView.getStore().getAt(index);
			
			// if trail is favorite set correct class for favorite option
			for(var i = 0; i < this.menuOptions.length; i++) {
				if(this.menuOptions[i].id == 'favorite') {
					if(this.activeListItemRecord.data.favorite) {
						this.menuOptions[i].cls = 'favorite-act';
					} else {
						this.menuOptions[i].cls = 'favorite';
					}
				}
			}
			
			var activeEl = Ext.get(item);
				
			this.activeListElement = activeEl;

			if (!this.allowMultiple) {
				// hide any visible List Options
				this.hideOptionsMenu();
			}			
			
			activeEl.setVisibilityMode(Ext.Element.VISIBILITY);

			// Show the item's List Options
			this.doShowOptionsMenu(activeEl);
		}
    }
	
});

// Create ptype
Ext.preg('trailsListOptionsPlugin', traildevils.views.TrailsListOptionsPlugin);