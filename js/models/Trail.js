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
        {name: "distance",		type: "int"},
        {name: "location",		type: "string"},
        {name: "thumb",			type: "string"},
        {name: "description",	type: "string"},
		{name: "status",		type: "string"},
        {name: "latitude",		type: "float"},
        {name: "longitude",		type: "float"}
    ]
});