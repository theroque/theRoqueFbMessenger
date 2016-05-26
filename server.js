var Botkit = require('botkit');
var request = require('request')
	var digital = ["SEO", "BOT", "FACEBOOK", "SOCIAL MEDIA", "SOCIAL", "DIGITAL MARKETING", "EMAIL MARKETING", "CONTENT MANAGMENTt", "ANALYTICS", "APP"]
	var creative = ["BRAND", "BRAND STRATEGY", "DESIGN", "CREATIVE", "MARKETING", "ADVERTISING", "WEB DESIGN", "COMMUNICATIONS", "PR", "VIDEO", "ANIMATION", "PRODUCTION"]

	var language = 'eng'; //DEFAULT LANGUAGE

var accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN; //YOU SECRET PHRASE
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN; //ACCESS KEY FROM FACEBOOK
var port = process.env.PORT;

if (!accessToken)
	throw new Error('Something wrong with FACEBOOK_PAGE_ACCESS_TOKEN');
if (!verifyToken)
	throw new Error('Something wrong with FACEBOOK_VERIFY_TOKEN');
if (!port)
	throw new Error('Something wrong with PORT');

var controller = Botkit.facebookbot({
		json_file_store : './db_bot/',
		access_token : accessToken,
		verify_token : verifyToken
	});

var bot = controller.spawn();

controller.setupWebserver(port, function (trouble, webserver) {
	if (trouble)
		return console.log(trouble);
	controller.createWebhookEndpoints(webserver, bot, function () {
		console.log('Bot ready!')
	});
});

controller.hears(['h1', 'hello', 'greetings', 'good day', 'hey', 'G\’day', 'hi'], 'message_received', function (bot, message) {
	var digitalSearch = 0;
	var marketingSearch = 0;
	bot.startConversation(message, function (err, convo) {
		var topost = 'https://graph.facebook.com/v2.6/' + message.user + '?access_token=' + accessToken;
		request(topost, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res = JSON.parse(response.body)
			}
			convo.ask("Hello " + res.first_name + " " + res.last_name + ", how I can help you?!", function (response, convo) {
				for (var i = 0; i < digital.length; i++) {
					if (response.text.toUpperCase().indexOf(digital[i]) != -1) {
						digitalSearch++;
					}
				}
				for (var i = 0; i < creative.length; i++) {
					if (response.text.toUpperCase().indexOf(creative[i]) != -1) {
						marketingSearch++;
					}
				}
				console.log(digitalSearch)
				console.log(marketingSearch)
				if (digitalSearch == 0 && marketingSearch == 0) {
					bot.reply(message, 'I can\'t help you');
				} else if (digitalSearch > marketingSearch) {
					showJordan(bot, message)
				} else if (digitalSearch < marketingSearch) {
					showSandra(bot, message)
				}
				convo.next();
			});
		})
	})
});

function showJordan(bot, message) {
	bot.reply(message, {
		attachment : {
			'type' : 'template',
			'payload' : {
				'template_type' : 'generic',
				'elements' : [{
						'title' : 'Head of Digital, Jordan',
						'image_url' : 'https://i.yapx.ru/BMeH.png',
						'subtitle' : 'phone: (03)-8547-1078',
						'buttons' : [{
								'type' : 'web_url',
								'url' : 'http://theroque.com.au/roque-digital/contact/',
								'title' : "Email now"
							}
						]
					}
				]
			}
		}
	});
}

function showSandra(bot, message) {
	bot.reply(message, {
		attachment : {
			'type' : 'template',
			'payload' : {
				'template_type' : 'generic',
				'elements' : [{
						'title' : 'Managing Director, Sandra',
						'image_url' : 'https://i.yapx.ru/BMeI.png',
						'subtitle' : 'phone: (03) 8547 1078',
						'buttons' : [{
								'type' : 'web_url',
								'url' : 'https://jordan@theroque.com.au',
								'title' : 'Email now'
							}
						]
					}
				]
			}
		}
	});
}
