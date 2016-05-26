var Botkit = require('botkit');
var request = require('request');
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

controller.hears(['h1', 'hello', 'greetings', 'good day', 'hey', 'G\’day'], 'message_received', function (bot, message) {
	var look1 = 0;
	var look2 = 0;
	bot.startConversation(message, function (err, convo) {
		convo.ask("Hello, how I can help you?!", function (response, convo) {
			for (var i = 0; i < digital.length; i++) {
				if (response.text.toUpperCase().indexOf(digital[i]) != -1) {
					look1++;
				}
			}
			for (var i = 0; i < creative.length; i++) {
				if (response.text.toUpperCase().indexOf(creative[i]) != -1) {
					look2++;
				}
			}
			console.log(look1)
			console.log(look2)
			if (look1 == 0 && look2 == 0) {
				bot.reply(message, "Sorry, I can't help you right now :(")
			} else if (look1 > look2) {
				bot.reply(message, {
					attachment : {
						'type' : 'template',
						'payload' : {
							'template_type' : 'generic',
							'elements' : [{
									'title' : 'Head of Digital, Jordan',
									'subtitle' : 'phone: (03)-8547-1078',
									'buttons' : [{
											'type' : 'web_url',
											'url' : 'https://www.google.ru',
											'title' : "Email now"
										}
									]
								}
							]
						}
					}
				});
			} else if (look1 < look2) {
				bot.reply(message, {
					attachment : {
						'type' : 'template',
						'payload' : {
							'template_type' : 'generic',
							'elements' : [{
									'title' : 'Managing Director, Sandra',
									'subtitle' : 'phone: (03) 8547 1078',
									'buttons' : [{
											'type' : 'web_url',
											'url' : 'https://www.google.ru',
											'title' : 'Email now'
										}
									]
								}
							]
						}
					}
				});
			}
			convo.next();
		});
	})
});
