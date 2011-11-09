/**
 * @class Type
 * @extends Ext.data.Model
 * 
 * Trail type model definition
 * 
 */

Ext.regModel('Type', {
	fields: [
        { name: "id",				type: "string" },
        { name: "name",				type: "string" },
        { name: "description",		type: "string" },
    ],
	belongsTo: 'Trail'
});