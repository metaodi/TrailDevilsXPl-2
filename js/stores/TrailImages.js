/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailImages', {
	model: 'TrailImage',

	listeners: {
		beforeload: function() {
			// before each data load set proxy params to current trailid
			this.proxy.extraParams.params = traildevils.views.trailListDetailTabPanel.trail.data.id;
		}
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className: 'DataLoader',
			functionName: 'getTrailImages',
			// trailid params are set before each data load
			params: '0'
		},
		model: 'TrailImage',
        reader: {
            type: 'json',
			root: 'images'
        }
	}
	// setup dummy data
	/*data: [
		{
			id: '1',
			name: 'bild1',
			size: '100KB',
			date: '02.02.2010',
			path: 'http://traildevils.ch/media/img/trails/trailimg_800_1806.jpg',
			thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1806.jpg',
			width: 800,
			height: 600
		}, {
			id: '2',
			name: 'bild2',
			size: '200KB',
			date: '02.02.2010',
			path: 'http://traildevils.ch/media/img/trails/trailimg_800_1806.jpg',
			thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1806.jpg',
			width: 800,
			height: 600
		}, {
			id: '3',
			name: 'bild2',
			size: '200KB',
			date: '02.02.2010',
			path: 'http://traildevils.ch/media/img/trails/trailimg_800_1806.jpg',
			thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1806.jpg',
			width: 800,
			height: 600
		}, {
			id: '4',
			name: 'pfau',
			size: '200KB',
			date: '02.02.2010',
			path: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			thumb: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			width: 332,
			height: 499
		}, {
			id: '5',
			name: 'pfau2',
			size: '200KB',
			date: '02.02.2010',
			path: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			thumb: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			width: 332,
			height: 499
		}, {
			id: '6',
			name: 'pfau3',
			size: '200KB',
			date: '02.02.2010',
			path: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			thumb: 'http://img.fotocommunity.com/Natur/Tiere/Pfau-Hochformat-a18613762.jpg',
			width: 332,
			height: 499
		}
	]*/
});
