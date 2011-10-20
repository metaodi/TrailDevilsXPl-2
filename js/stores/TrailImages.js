/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('TrailImages', {
	model: 'TrailImage',

	// setup dummy data
	data: [{
		name: 'bild1',
		size: '100KB',
		date: '02.02.2010',
		path: 'http://traildevils.ch/media/img/trails/trailimg_800_1806.jpg',
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1806.jpg'
	}, {
		name: 'bild2',
		size: '200KB',
		date: '02.02.2010',
		path: 'http://traildevils.ch/media/img/trails/trailimg_800_1806.jpg',
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1806.jpg'
	}]
});
