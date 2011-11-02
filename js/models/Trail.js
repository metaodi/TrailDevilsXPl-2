/**
 * @class Trail
 * @extends Ext.data.Model
 * 
 * The Trail model definition
 * 
 */

Ext.regModel('Trail', {
	fields: [
        {name: "id",				type: "string"},
        {name: "title",				type: "string"},
        {name: "distance",			type: "float"},
		{name: "formattedDistance", type: "string"},
        {name: "location",			type: "string"},
        {name: "thumb",				type: "string"},
        {name: "description",		type: "string"},
		{name: "status",			type: "string"},
        {name: "latitude",			type: "float"},
        {name: "longitude",			type: "float"}
    ],
	setThumbUrl: function() {
			if (this.get('thumb') != '')
			{
				var script = document.createElement("script");
				script.setAttribute("src",
					"http://src.sencha.io/data.traildevils.store.setPhotoUrl-" + this.getId() +
					"/" + this.get('thumb')
				);
				script.setAttribute("type","text/javascript");
				document.body.appendChild(script);
			}
        }
});