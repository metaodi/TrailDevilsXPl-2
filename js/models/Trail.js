/**
 * @class Trail
 * @extends Ext.data.Model
 * 
 * The Trail model definition
 * 
 */

Ext.regModel('Trail', {
	fields: [
        {name: "title",			type: "string"},
        {name: "location",		type: "string"},
        {name: "distance",		type: "int"},
        {name: "imagepath",		type: "string"},
        {name: "description",	type: "string"},
		{name: "status",		type: "string"}
    ]
});