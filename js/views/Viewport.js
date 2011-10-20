/**
 * @class traildevils.views.Viewport
 * @extends Ext.TabPanel
 * 
 * The viewport is the application's shell - the parts of the UI that don't change. 
 * 
 */
traildevils.views.Viewport = Ext.extend(Ext.TabPanel, {
	id: 'traildevils',
	fullscreen: true,
	cardSwitchAnimation: 'slide',
	
	initComponent: function() {
		Ext.apply(this, {
			items: [
				{ xtype: 'trailsListMainPanel', id: 'trailsListMainPanel' },
				{ xtype: 'trailsMapPanel', id: 'trailsMapPanel' },
				{ xtype: 'ajaxComponent', id: 'ajaxComponent' },
				{ 
					xtype: 'button',
					iconMask: true,
					iconCls: 'refresh',
					ui: 'plain',
					style: 'margin: 0;',
					handler: traildevils.refresh
				}
			],
			
			tabBar: {
				dock: 'bottom',
				scroll: {
					direction: 'horizontal',
					useIndicators: false
				},
				layout: {
					pack: 'center'
				}
			}
		});

		traildevils.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});

// @TODO unschön gelöst mit Funktion direkt in namespace
traildevils.refresh = function() {
	Ext.Ajax.request({
		url : 'php/AjaxHandler.class.php' , 
		params : { 
			className : 'DataLoader' ,
			functionName : 'echoData' ,
			params : 'reflection_test,another_param'
		},
		method: 'GET',
		success: function ( result, request ) { 
			Ext.Msg.alert('Success', 'Data return from the server: '+ result.responseText); 
		},
		failure: function ( result, request) { 
			Ext.Msg.alert('Failed', result.responseText); 
		} 
	});
};
