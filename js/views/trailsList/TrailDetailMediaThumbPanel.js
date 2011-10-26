/**
 * @class traildevils.views.TrailDetailMediaThumbPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaThumbPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        var tpl = new Ext.XTemplate(
			'<div>',
			'	<tpl for=".">',
			'		<div class="node" style="background:url({thumb}); width: 100px; height: 100px; border: solid 1px red;">',
			'		</div>',
			'	</tpl>',
			'</div>'
        );
			
        var dataView = new Ext.DataView({
            store: this.store,
            tpl: tpl,
            itemSelector: 'div.node'
			
			/*
			onItemTap: function(list, index) {
				Ext.dispatch({
					controller: traildevils.controllers.trailMediaController,
					action: 'carousel',
					imgdata: this.store.data.items,
					index: index
				});
			}*/
        });

        this.items = [dataView];
		traildevils.views.TrailDetailMediaThumbPanel.superclass.initComponent.call(this);
		
    }
});

// Create xtype
Ext.reg('trailDetailMediaThumbPanel', traildevils.views.TrailDetailMediaThumbPanel);