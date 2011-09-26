new Ext.Application({
	tabletStartupScreen: 'view/images/phone_startup.jpg',
	phoneStartupScreen: 'view/images/phone_startup.jpg',
	icon: 'view/images/app_icon.jpg',
	glossOnIcon: false,
	onReady: function() {
		var timeline, map, panel, tabBar, refresh;

		timeline = new Ext.Component({
			title: 'Timeline',
			cls: 'timeline',
			scroll: 'vertical',
			tpl: [
					'<tpl for=".">',
					' <div class="tweet">',
						' <div class="avatar"><img src="{profile_image_url}" /></div>',
						' <div class="tweet-content">',
							' <h2>{from_user}</h2>',
							' <p>{text}</p>',
						' </div>',
					' </div>',
					'</tpl>'
				 ]
		});
	
		panel = new Ext.TabPanel({
			fullscreen: true,
			cardSwitchAnimation: 'slide',
			ui: 'light',
			items: [timeline]
		});
	
		panel.getTabBar().add([
		       {xtype: 'spacer'},
		       {
		    	   xtype: 'button',
		    	   iconMask: true,
		    	   iconCls: 'refresh',
		    	   ui: 'plain',
		    	   style: 'margin:0;',
		           handler: refresh
		       }
		]);
		panel.getTabBar().doLayout();
		
		refresh = function() {
			Ext.util.JSONP.request({
				url: 'http://search.twitter.com/search.json',
				callbackKey: 'callback',
				params: {
					q: "#hsr",
					rpp: 30,
					uniqueify: Math.random()
				},
				callback: function(data) {
					var tweet_list = data.results;
					timeline.update(tweet_list); // Update the tweets in timeline
				}
			});
		};

		refresh();
	}
});

