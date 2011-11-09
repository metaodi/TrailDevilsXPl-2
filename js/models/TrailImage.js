/**
 * @class TrailImage
 * @extends Ext.data.Model
 * 
 * The Trail model definition
 * 
 */

Ext.regModel('TrailImage', {
	fields: [
        {name: "id", type: "string"},
        {name: "description", type: "string"},
        {name: "image", type: "string"},
        {name: "thumb", type: "string"},
		{name: "width", type: "int"},
		{name: "height", type: "int"}
    ],
	
	getSideToStretch: function(panelSize) {
		var widthRatio = panelSize.width / this.data.width;
		var newHeight = widthRatio * this.data.height;
		
		if(newHeight > panelSize.height) {
			return 'height';
		} else {
			return 'width';
		}
	}
});