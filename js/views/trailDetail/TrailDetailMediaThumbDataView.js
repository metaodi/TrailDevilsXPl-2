/**
 * @class traildevils.views.TrailDetailMediaThumbPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaThumbDataView = Ext.extend(Ext.DataView, {
	title: 'Fotos/Videos',
	cls: 'trailDetailMediaThumbPanel',
	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        this.tpl = new Ext.XTemplate(
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
        this.itemSelector = 'div.imagebox';
		
		this.onItemTap = function(list, index) {
			Ext.dispatch({
				controller: traildevils.controllers.trailMediaController,
				action: 'openMediaCarousel',
				imgdata: this.store.data.items,
				index: index
			});
		}
		
		traildevils.views.TrailDetailMediaThumbDataView.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailMediaThumbDataView', traildevils.views.TrailDetailMediaThumbDataView);