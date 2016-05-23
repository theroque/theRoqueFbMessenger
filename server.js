var Botkit = require('botkit');
var digital = ["SEO", "bot", "facebook", "social media", "social", "digital marketing", "email marketing", "content management", "analytics", "app"]
var creative = ["Brand", "brand strategy", "design", "creative", "marketing", "advertising", "web design", "communications", "PR", "video", "animation", "production"]

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
	bot.startConversation(message, function (err, convo) {
		if (!err) {
			convo.ask("Hello, how I can help you?!", function (response, convo) {
				if (response.text) {
					//проверка на вхождение строки ответа в массив кейвордов
					if (true) {
						bot.reply(message, {
							attachment : {
								'type' : 'template',
								'payload' : {
									'template_type' : 'generic',
									'elements' : [{
											'title' : 'Head of Digital, Jordan',
											'subtitle' : 'description',
											'buttons' : [{
													'type' : 'postback',
													'title' : 'email',
													'payload' : email
												},
												{
													'type' : 'postback',
													'title' : 'call',
													'payload': call
												}
											]
										}
									]
								}
							}
						});
					} else if (true) {
						bot.reply(message, {
							attachment : {
								'type' : 'template',
								'payload' : {
									'template_type' : 'generic',
									'elements' : [{
											'title' : 'Managing Director, Sandra',
											'subtitle' : 'description',
											'buttons' : [{
													'type' : 'postback',
													'title' : 'email',
													'payload' : email
												},
												{
													'type' : 'postback',
													'title' : 'call',
													'payload': call
												}
											]
										}
									]
								}
							}
						});
					}
					convo.stop();
				} else {
					convo.repeat();
				}
			});
		}
	})
});
