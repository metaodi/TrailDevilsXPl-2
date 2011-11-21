/**
 * @class Trail
 * @extends Ext.data.Model
 * 
 * The Trail model definition
 * 
 */

Ext.regModel('Trail', {
	fields: [
        { name: 'id',					type: 'int' },
        { name: 'title',				type: 'string' },
        { name: 'distance',				type: 'float' },
		{ name: 'formattedDistance',	type: 'string' },
        { name: 'location',				type: 'string' },
        { name: 'thumb',				type: 'string' },
        { name: 'description',			type: 'string' },
		{ name: 'status',				type: 'string' },
        { name: 'latitude',				type: 'float' },
        { name: 'longitude',			type: 'float' },
        { name: 'favorite',				type: 'boolean' },
		{ name: 'types',				type: 'array' }
    ],
	
    hasMany: { model: 'Type', name: 'types' },
	
	// toggles favorite flag and returns new favorite state
	toggleFavorite: function() {
		this.data.favorite = !this.data.favorite;
		return this.data.favorite;
	}
});