/**
 * @class traildevils.views.TrailDetailMediaThumbPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaThumbPanel = Ext.extend(Ext.Panel, {
	layout: 'fit',
	fullscreen: true,
	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        this.xtpl = new Ext.XTemplate(
			'<div>',
			'	<tpl for=".">',
			'		<div class="node" style="background:url({thumb}); width: 100px; height: 100px; border: solid 1px red;">',
			'		</div>',
			'	</tpl>',
			'</div>'
        );

        this.dataView = new Ext.DataView({
            store: this.store,
            tpl: this.xtpl,
            itemSelector: 'div.node',
			
			onItemTap: function(list, index) {
				Ext.dispatch({
					controller: traildevils.controllers.trailMediaController,
					action: 'carousel',
					imgdata: this.store.data.items,
					index: index
				});
			}
        });

        this.items = [this.dataView];
		
		traildevils.views.TrailDetailMediaThumbPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype
Ext.reg('trailDetailMediaThumbPanel', traildevils.views.TrailDetailMediaThumbPanel);