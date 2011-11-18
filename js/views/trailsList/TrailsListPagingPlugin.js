/**
 * @class traildevils.views.TrailsListPagingPlugin
 * @extends Ext.plugins.ListPagingPlugin
 * 
 */

traildevils.views.TrailsListPagingPlugin = Ext.extend(Ext.plugins.ListPagingPlugin, {
	loadMoreText: 'Weitere Trails laden...',
	loadingText: 'Trails werden geladen...',
	
	render : function() {
        var list = this.list,
            targetEl = list.getTargetEl(),
            html = '';

        if (!this.autoPaging) {
            html += '<div class="x-list-paging-msg">' + this.loadMoreText + '</div>';
        }

        this.el = targetEl.createChild({
            cls: 'x-list-paging' + (this.autoPaging ? ' x-loading' : ''),
            html: html + Ext.LoadingSpinner + '<div class="x-list-paging-loadingmsg">' + this.loadingText + '</div>'
        });

        if (this.autoPaging) {
            this.mon(targetEl.getScrollParent(), 'scrollend', this.onScrollEnd, this);
        }
        else {
            this.mon(this.el, 'tap', this.onPagingTap, this);
        }

        this.rendered = true;
    },
	
    onBeforeLoad : function() {
        if (this.loading && this.list.store.getCount() > 0) {
            traildevils.store.loadMask.hide();
            return false;
        }
    }
});

// Create ptype
Ext.preg('trailsListPagingPlugin', traildevils.views.TrailsListPagingPlugin);