/**
 * @class traildevils.views.TrailDetailMediaThumbPanel
 * @extends Ext.Panel
 * 
 */

traildevils.views.TrailDetailMediaThumbDataView = Ext.extend(Ext.DataView, {
	title: 'Fotos',
	cls: 'trailDetailMediaThumbPanel',
	emptyText: '<div class="empty-text">Keine Bilder vorhanden</div>',
	
	initComponent: function () {
        this.store = Ext.getStore('TrailImages');
		
        this.tpl = new Ext.XTemplate(
			'<div class="trail-images-thumblist">',
			'	<tpl for=".">',
			'		<div class="imagebox">',
			'			<div class="image">',
			'				<img src="{thumb}" alt="{description}" />',
			'			</div>',
			'		</div>',
			'	</tpl>',
			'</div>'
        );
        this.itemSelector = 'div.imagebox';
		
		this.listeners = {
			afterrender: function(cmp) {
				this.store.load();
			},
			itemtap: function(cmp, index, item, e){ 
				Ext.dispatch({
					controller: traildevils.controllers.trailMediaController,
					action: 'openMediaCarousel',
					imgdata: this.store.data.items,
					index: index
				});
			}
		}
		
		traildevils.views.TrailDetailMediaThumbDataView.superclass.initComponent.call(this);
    }
});

// Create xtype
Ext.reg('trailDetailMediaThumbDataView', traildevils.views.TrailDetailMediaThumbDataView);