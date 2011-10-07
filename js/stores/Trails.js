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
		distance: '200',
		imagepath: 'rdmr.ch/gurten.jpg',
		description: 'Schöner Trail auf dem Gurten',
		status: 'offen'
	}, {
		title: 'Üetliberg Trail',
		location: 'Zürich',
		distance: '1000',
		imagepath: 'rdmr.ch/zh.jpg',
		description: 'Schöner Trail auf dem Üetliberg',
		status: 'offen'   
	}, {
		title: 'Geschlossener Trail',
		location: 'Nirgends',
		distance: '500',
		imagepath: 'rdmr.ch/geschlossen.jpg',
		description: 'Schöner immer geschlossener Trail',
		status: 'geschlossen'  
	}]
});