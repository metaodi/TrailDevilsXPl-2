/**
 * @class traildevils.views.FavoriteTrailsListOptionsPlugin
 * @extends Ext.ux.touch.ListOptions
 * 
 * Source: http://www.swarmonline.com/2011/03/ext-ux-touch-listoptions-add-a-twitter-style-menu-to-your-list-items/
 * 
 */

traildevils.views.FavoriteTrailsListOptionsPlugin = Ext.extend(Ext.ux.touch.ListOptions, {
	revealDirection: 'right',
	swipeDirection: 'right',
	hideOnScroll: true,
	menuOptions: [{
		id: 'delete',
		cls: 'delete',
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
Ext.preg('favoriteTrailsListOptionsPlugin', traildevils.views.FavoriteTrailsListOptionsPlugin);