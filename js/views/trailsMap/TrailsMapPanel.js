/**
 * @class traildevils.views.TrailsMapPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailsMapPanel = Ext.extend(Ext.Panel, {
	iconCls: 'locate',
	title: 'Map',
	layout: 'fit',
	markersSet: false,
	
	initComponent: function () {
		var map = new Ext.Map({
			useCurrentLocation: true,   // Gets user's current location
			mapOptions: {
				zoom: 12
			},
			
			listeners: {
				maprender: function() {
					Ext.dispatch({
						controller: traildevils.controllers.trailsMapController,
						action: 'addMarkers',
						map: this.map
					});
				}
			}
		});
		
		this.dockedItems = [
			{		
				xtype: 'toolbar',
				title: 'Trails in der Nähe'
			}
		];
		
		this.items = [
			map
		]
		
        traildevils.views.TrailsMapPanel.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailsMapPanel', traildevils.views.TrailsMapPanel);
