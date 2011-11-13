/**
 * @class traildevils.views.TrailsListSearch
 * @extends Ext.form.Search
 * 
 */

traildevils.views.TrailsListSearch = Ext.extend(Ext.form.Search, {
	placeHolder: 'Suche...',
	cls: 'trailsListSearch',
	useClearIcon: true,
	store: null,
	
	initComponent: function() {
		this.originalValue = '';
		this.store = traildevils.store;
		Ext.apply(this, {
            listeners: {
				scope: this,
				keyup: function(field) {
					this.filterByValue(field.getValue());
					this.store.sort();
					
					// WORKAROUND FOR SENCHA BUG: Scroll to top of list after filtering
					// Source: http://www.sencha.com/forum/showthread.php?132969-Problems-filtering-list-store-after-scrolling-to-bottom
					traildevils.views.trailsList.scroller.updateBoundary();
				}
			}
        });
		
        traildevils.views.TrailsListSearch.superclass.initComponent.apply(this, arguments);
    },
	
	// @private
    onClearIconTap: function() {
        if(!this.disabled) {
            this.setValue('');
			
			// clear filter of store
			this.store.clearFilter();
        }
    },
	
	filterByValue: function(value) {
		if(!value) {
			this.store.filterBy(function() {
				return true;
			});
		} else {
			var searches = value.split(' ');
			var regexps = [];
			var i;

			for(i = 0; i < searches.length; i++) {
				if (!searches[i]) {
					return;
				}
				regexps.push(new RegExp(searches[i], 'i'));
			}

			this.store.filterBy(function(record) {
				var matched = [];
				
				for(i = 0; i < regexps.length; i++) {
					var search = regexps[i];
					
					if(record.get('title').match(search) || record.get('location').match(search)) {
						matched.push(true);
					} else {
						// search matching trail types
						var match = false;
						var trailTypesArr = record.data.types;
						for(var j = 0; j < trailTypesArr.length; j++) {
							if(trailTypesArr[j].name.match(search)) {
								match = true;
								break;
							}
						}
						matched.push(match);
					}
				}

				if(regexps.length > 1 && matched.indexOf(false) != -1) {
					return false;
				} else {
					return matched[0];
				}
			});
		}
	}
});

// Create xtype
Ext.reg('trailsListSearch', traildevils.views.TrailsListSearch);