/**
 * @class Ext.ux.ListSearchPlugin
 * @extends Ext.form.Search
 * Adds a search input form at the top of the list.
 */

Ext.ns('Ext.ux');

Ext.ux.ListSearchPlugin = Ext.extend(Ext.util.Observable, {
    
    init: function(list) {
        this.list = list;
		
        list.on('update', this.onListUpdate, this);
        list.onBeforeLoad = Ext.util.Functions.createInterceptor(list.onBeforeLoad, this.onBeforeLoad, this);
    },

    /**
     * This function renders the pull to refresh markup into the list if it doesnt exist yet. It also makes sure
     * that the pull to refresh element is inserted to the beginning of the list again after the List items have
     * been updated.
     * @private
     */
    onListUpdate: function() {
        if (!this.rendered) {
            this.render();
        }

        this.list.getTargetEl().insertFirst(this.el);
    },

    render : function() {
        var list = this.list,
            targetEl = list.getTargetEl(),
            html = '';
			
		var searchField = new traildevils.views.TrailsListSearch();
		test = searchField;
		searchField.initRenderData();
		
        this.el = targetEl.createChild({
            cls: 'x-list-search',
			html: searchField
        });

        this.rendered = true;
    },

    onBeforeLoad : function() {
        if (this.loading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false;
        }
    },

    /**
     * Here we listen for taps on the loadingEl and load the store's next page. Adding the 'x-loading' class to the
     * loadingEl hides the 'Load next page' text.
     */
    onPagingTap : function(e) {
        if (!this.loading) {
            this.loading = true;
            this.list.store.nextPage();
            this.el.addCls('x-loading');
        }
    }
});

Ext.preg('listsearch', Ext.ux.ListSearchPlugin);
