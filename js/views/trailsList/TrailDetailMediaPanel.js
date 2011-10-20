/**
 * @class traildevils.views.TrailDetailMediaPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaPanel = Ext.extend(Ext.Panel, {
	layout: 'card',
	fullscreen: true,

	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        this.xtpl = new Ext.XTemplate(
			'<div style="padding:10px 5px 5px 5px;">',
			'	<tpl for=".">',
			'		<div class="node" style="background:url({thumb}); width: 100px; height: 100px;">',
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
		
		traildevils.views.TrailDetailMediaPanel.superclass.initComponent.apply(this, arguments);
    }
});

// Create xtype trailDetailMediaPanel
Ext.reg('trailDetailMediaPanel', traildevils.views.TrailDetailMediaPanel);