/**
 * @class traildevils.views.TrailsListPullRefreshPlugin
 * @extends Ext.plugins.PullRefreshPlugin
 * 
 */

traildevils.views.TrailsListPullRefreshPlugin = Ext.extend(Ext.plugins.PullRefreshPlugin, {
	pullRefreshText: 'Zum Aktualisieren herunterziehen',
	releaseRefreshText: 'Zum Aktualisieren loslassen...',
	loadingText: 'wird aktualisiert...',
	pullTpl: new Ext.XTemplate(
		'<div class="x-list-pullrefresh">',
		'	<div class="x-list-pullrefresh-arrow"></div>',
		Ext.LoadingSpinner,
		'	<div class="x-list-pullrefresh-wrap">',
		'		<h3 class="x-list-pullrefresh-message">{message}</h3>',
		'		<div class="x-list-pullrefresh-updated">Zuletzt aktualisiert: <span>{lastUpdated:date("d.m.Y H:i:s")}</span></div>',
		'	</div>',
		'</div>'
	),
	
	refreshFn: function(callback, scope) {
		traildevils.on({
			datarefreshed: function() {callback.call(scope)},
			scope: this,
			single: true
		});
		traildevils.store.reset();
	},
		
	/**
     * This function is called after the List has been refreshed. It resets the Pull to Refresh markup and
     * updates the last updated date. It also animates the pull to refresh markup away.
     * @private
     */
    onLoadComplete: function() {
        var me = this;

        if (this.isLoading) {
            this.isLoading = false;
            this.lastUpdated = new Date();

            this.setViewState('pull');
            this.updatedEl.setHTML(Ext.util.Format.date(this.lastUpdated, "d.m.Y H:i:s"));

            setTimeout(function() {
                me.scroller.updateBoundary(me.snappingAnimationDuration);
            }, 100);
        }
    },
	
	/**
     * This function makes sure that the Stores LoadMask is not shown when the list is being reloaded by
     * this plugin.
     * @private
     */
    onBeforeLoad: function() {
        if (this.isLoading && this.list.store.getCount() > 0) {
			traildevils.remotestore.loadMask.hide();
			return false;
        }
    }
});

// Create ptype
Ext.preg('trailsListPullRefreshPlugin', traildevils.views.TrailsListPullRefreshPlugin);