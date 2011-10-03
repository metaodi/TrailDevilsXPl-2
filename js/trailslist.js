function registerTrailsListModel() {
	Ext.regModel('Trails', {
		fields: ['title', 'location', 'distance', 'imagepath', 'description', 'status']
	});
}

function getTrailsData() {
	var store = new Ext.data.JsonStore({
		model: 'Trails',
		sorters:  [{
			property : 'status', 
			direction: 'DESC'
		},{
			property : 'distance', 
			direction: 'DESC'
		}],

		getGroupString : function(record) {
			return record.get('status');
		},

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
	
	return store;
}

function getTrailsList() {
	registerTrailsListModel();
	var trailsdata = getTrailsData();
	
	var pullRefresh = new Ext.plugins.PullRefreshPlugin({
		pullRefreshText: 'Zum Aktualisieren herunterziehen',
		releaseRefreshText: 'Zum Aktualisieren loslassen...',
		loadingText: 'wird aktualisiert...',
		pullTpl: new Ext.XTemplate(
			'<div class="x-list-pullrefresh">',
			'<div class="x-list-pullrefresh-arrow"></div>',
			Ext.LoadingSpinner,
			'<div class="x-list-pullrefresh-wrap">',
			'<h3 class="x-list-pullrefresh-message">{message}</h3>',
			'<div class="x-list-pullrefresh-updated">Zuletzt aktualisiert: {lastUpdated:date("d.m.Y H:i:s")}</span></div>',
			'</div>',
			'</div>'
			)
	});
	
	var trailslist = new Ext.List({
		fullscreen: true,
		iconCls: 'maps',
		title: 'Trails',
		plugins: [pullRefresh],
		itemTpl: [
		'<div class="trail">',
		'<h1>{title}</h1>',
		'<p>{description}</p>',
		'<p>Ort: {location}</p>',
		'<p>Entfernung: {distance}</p>',
		'<img src="{imagepath}" alt="{description}" />',
		'</div>'
		],
		grouped : true,
		indexBar: false,
	    
		store: trailsdata
	});
	
	return trailslist;
}