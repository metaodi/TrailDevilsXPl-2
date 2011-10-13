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
		'		<div class="x-list-pullrefresh-updated">Zuletzt aktualisiert: {lastUpdated:date("d.m.Y H:i:s")}</span></div>',
		'	</div>',
		'</div>'
	)
});

// Create ptype germanPullRefreshPlugin
Ext.preg('germanPullRefreshPlugin', traildevils.views.GermanPullRefreshPlugin);