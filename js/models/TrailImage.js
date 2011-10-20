/**
 * @class TrailImage
 * @extends Ext.data.Model
 * 
 * The Trail model definition
 * 
 */

Ext.regModel('TrailImage', {
	fields: [
        {name: "name", type: "string"},
        {name: "size", type: "string"},
        {name: "date", type: "string"},
        {name: "path", type: "string"},
        {name: "thumb", type: "string"}
    ]
});