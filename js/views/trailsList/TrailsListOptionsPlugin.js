/**
 * @class traildevils.views.TrailsListOptionsPlugin
 * @extends Ext.ux.touch.ListOptions
 * 
 * Source: http://www.swarmonline.com/2011/03/ext-ux-touch-listoptions-add-a-twitter-style-menu-to-your-list-items/
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
	 * XTemplate to use to create the List Options view
	 */
    menuOptionsTpl: new Ext.XTemplate(	'<ul>',
											'<tpl for=".">',											
												'<li class="x-menu-option">',
													'<div class="x-menu-option-image {cls}"></div>',
												'</li>',
											'</tpl>',
										'</ul>').compile(),

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
    },
	
	/**
	 * Handler for 'touchstart' event to add the Pressed class
	 * @param {Object} e
	 * @param {Object} el
	 */
	onListOptionTabStart: function(e, el){
		var menuOption = e.getTarget('.' + this.menuOptionSelector);
		
		// BUGFIX: menuOption can be null
		if(menuOption != null) {
			var listOptionsEl = Ext.get(Ext.get(menuOption).findParent('.' + this.optionsSelector)).prev('.x-list-item');

			// get the menu item's data
			var menuItemData = this.processMenuOptionsData()[this.getIndex(menuOption)];

			if (this.parent.fireEvent('beforelistoptionstap', menuItemData, this.parent.getRecord(listOptionsEl.dom)) === true) {
				this.addPressedClass(e);
			} else {
				this.TapCancelled = true;
			}
		} else {
			this.TapCancelled = true;
		}
	},
	
	/**
	 * Hides all menu options without an animation
	 */
    doHideOptionsMenuWithoutAnim: function(){
		var multiListOptions = this.parent.getEl().select('.' + this.optionsSelector);
		
		for(var i = 0; i < multiListOptions.elements.length; i++) {
			var hiddenEl = Ext.get(multiListOptions.elements[i]).prev('.x-list-item');
			var activeListOptions = Ext.get(multiListOptions.elements[i]);
			
			// show the List Item's 'body'
			hiddenEl.show();
			hiddenEl.setVisibilityMode(Ext.Element.DISPLAY);
			
			// remove the ListOptions DIV completely to save some resources
			activeListOptions.remove();
			Ext.removeNode(Ext.getDom(activeListOptions));

			this.parent.fireEvent('listoptionsclose');
		}
    }
	
});

// Create ptype
Ext.preg('trailsListOptionsPlugin', traildevils.views.TrailsListOptionsPlugin);