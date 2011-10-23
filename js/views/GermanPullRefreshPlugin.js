/**
 * @class traildevils.views.GermanPullRefreshPlugin
 * @extends Ext.plugins.PullRefreshPlugin
 * 
 */

traildevils.views.GermanPullRefreshPlugin = Ext.extend(Ext.plugins.PullRefreshPlugin, {
	
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
    }
});

// Create ptype germanPullRefreshPlugin
Ext.preg('germanPullRefreshPlugin', traildevils.views.GermanPullRefreshPlugin);