/**
 * @class Trail
 * 
 * The Trails store definition
 * 
 */
Ext.regStore('Trails', {
	model: 'Trail',

	// order by status descending (groups) and distance descending
	sorters: [{
		property : 'status', 
		direction: 'DESC'
	}, {
		property : 'distance', 
		direction: 'DESC'
	}],

	// group by status
	getGroupString : function(record) {
		return record.get('status');
	},

	// setup dummy data
	data: [{
		title: 'Gurten-Trail',
		location: 'Gurten',
		distance: 200,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_1233.jpg',
		description: 'Schöner Trail auf dem Gurten',
		status: 'offen',
		latitude: 35.333,
		longitude: -95.333
	}, {
		title: 'Üetliberg Trail',
		location: 'Zürich',
		distance: 1000,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_121.jpg',
		description: 'Schöner Trail auf dem Üetliberg',
		status: 'offen',
		latitude: 36.333,
		longitude: -97.333
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: 500,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_217.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen',
		latitude: 37.333,
		longitude: -98.333
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: 500,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_217.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen',
		latitude: 38.333,
		longitude: -99.333
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: 500,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_217.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen',
		latitude: 39.333,
		longitude: -100.333
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: 500,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_217.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen',
		latitude: 39.333,
		longitude: -100.333
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: 500,
		thumb: 'http://traildevils.ch/media/img/trails/trailimg_120_217.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen',
		latitude: 32.333,
		longitude: -94.333
	}]
});

// @TODO use this store instead of dummystore
Ext.regStore('Trails2', {
	model: 'Trail',

	// order by status descending (groups) and distance descending
	sorters: [
		{
			property : 'status', 
			direction: 'DESC'
		}, 
		{
			property : 'distance',
			direction: 'ASC'
		}
	],
	

	// group by status
	getGroupString : function(record) {
		return record.get('status');
	},
	
	proxy: {
        type: 'ajax',
        url : 'php/AjaxHandler.class.php',
		extraParams: {
			className : 'DataLoader' ,
			functionName : 'getTrails'
		},
		model: 'Trail',
        reader: {
            type: 'json',
			root: 'trails'
        }
	}
});
