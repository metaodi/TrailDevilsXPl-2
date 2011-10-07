/**
 * @class traildevils.views.TrailsList
 * @extends Ext.List
 * 
 */

traildevils.views.AjaxComponent = Ext.extend(Ext.Component, {
	iconCls: 'info',
	title: 'Ajax',
	cls: 'ajax',
	scroll: 'vertical',
	tpl: [
		'<tpl for=".">',
		'	<div class="ajax">',
		'		<div class="tweet-content">',
		'			<h2>{foo}</h2>',
		'			<p>{hello}</p>',
		'		</div>',
		'	</div>',
		'</tpl>'
	]
});

Ext.reg('ajaxComponent', traildevils.views.AjaxComponent);