traildevils.views.MainTabPanel = Ext.extend(Ext.TabPanel, {
	cardSwitchAnimation: 'slide',
	fullscreen: true,
	
	initComponent: function() {
        Ext.apply(this, {
			items: [
				traildevils.views.TrailsListPanel = new traildevils.views.TrailsListPanel()
			, {
				xtype: 'trailsMapPanel'
			}, {
				xtype: 'ajaxComponent'
			}, {
				xtype: 'spacer'
			},{
				xtype: 'button',
				iconMask: true,
				iconCls: 'refresh',
				ui: 'plain',
				style: 'margin: 0;',
				handler: traildevils.refresh
			}],
			
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
		
        traildevils.views.MainTabPanel.superclass.initComponent.apply(this, arguments);
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

// Create xtype mainTabPanel
Ext.reg('mainTabPanel', traildevils.views.MainTabPanel);