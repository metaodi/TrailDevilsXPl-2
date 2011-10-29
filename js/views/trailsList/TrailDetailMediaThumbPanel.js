/**
 * @class traildevils.views.TrailDetailMediaThumbPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaThumbPanel = Ext.extend(Ext.Panel, {
	title: 'Fotos/Videos',
	layout: 'fit',
	cls: 'trailDetailMediaThumbPanel',
	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        var tpl = new Ext.XTemplate(
			'<div class="trail-images-thumblist">',
			'	<tpl for=".">',
			'		<div class="imagebox">',
			'			<div class="image">',
			'				<img src="{thumb}" />',
			'			</div>',
			'		</div>',
			'	</tpl>',
			'</div>'
        );
			
        var dataView = new Ext.DataView({
            store: this.store,
            tpl: tpl,
            itemSelector: 'div.imagebox',
			
			onItemTap: function(list, index) {
				Ext.dispatch({
					controller: traildevils.controllers.trailMediaController,
					action: 'openMediaCarousel',
					imgdata: this.store.data.items,
					index: index
				});
			}
        });

        this.items = [dataView];
		traildevils.views.TrailDetailMediaThumbPanel.superclass.initComponent.call(this);
		
    }
});

// Create xtype
Ext.reg('trailDetailMediaThumbPanel', traildevils.views.TrailDetailMediaThumbPanel);