var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var profile_details = req.session.profile_details
  if (!profile_details) return res.redirect('/')

  // Length of time on the app
  let timeSpan = Date.now() - Date.parse(profile_details.User.create_date)
  timeSpan = Math.ceil(timeSpan / (1000 * 60 * 60 * 24))

  // App opens
  let appOpens = 0
  for (var item in profile_details.Usage.app_opens) {
    appOpens += profile_details.Usage.app_opens[item]
  }

  // Liked
  let liked = 0
  for (var item in profile_details.Usage.swipes_likes) {
    liked += profile_details.Usage.swipes_likes[item]
  }

  // Passed
  let passed = 0
  for (var item in profile_details.Usage.swipes_passes) {
    passed += profile_details.Usage.swipes_passes[item]
  }

  let totalSeen = liked + passed

  // Matches
  let matches = 0
  for (var item in profile_details.Usage.matches) {
    matches += profile_details.Usage.matches[item]
  }

  // Messages sent
  let msgSent = 0
  for (var item in profile_details.Usage.messages_sent) {
    msgSent += profile_details.Usage.messages_sent[item]
  }

  // Messages received
  let msgRecv = 0
  for (var item in profile_details.Usage.messages_received) {
    msgRecv += profile_details.Usage.messages_received[item]
  }

  res.render('user', { title: 'User', user: profile_details.User, usage: profile_details.Usage, timeSpan, appOpens, totalSeen, liked, passed, matches, msgSent, msgRecv });
});

router.get('/matches', function (req, res, next) {

  var profile_details = req.session.profile_details
  if (!profile_details) return res.redirect('/')

  // Message frequencies
  let unanswered_qs_search = ["how", "what", "?"]
  let unanswered_count = 0
  let message_search = ["Hey what's up", "Hey how's a going", "isolation", "quarantine"]
  let message_counts = [0, 0, 0, 0]
  let message_count = 0
  let theRest = 0
  let lessThan15 = 0
  let lessThan10 = 0
  let lessThan5 = 0
  let oneMessage = 0
  profile_details.Messages.forEach(match => {
    let convoLength = match.messages.length
    if (convoLength == 1)
      oneMessage++
    else if (convoLength < 5)
      lessThan5++
    else if (convoLength < 10)
      lessThan10++
    else if (convoLength < 15)
      lessThan15++
    else
      theRest++

    match.messages.forEach(messageObj => {
      let message = messageObj.message.replace(/&apos;/g, "'").replace(/&colon;/g, ":").replace(/&sol;/g, "/").toLowerCase()

      for (let i = 0; i < message_search.length; i++) {
        const element = message_search[i];
        if (message.includes(element.toLowerCase())) {
          message_counts[i]++
        }
      }

      message_count++
    })
  })

  let messages = []
  profile_details.Messages.forEach(message => {
    let lastMessage = message.messages[message.messages.length - 1].message
    lastMessage = lastMessage.replace(/&apos;/g, "'").replace(/&colon;/g, ":").replace(/&sol;/g, "/")

    // Unanswered Question
    for (let i = 0; i < unanswered_qs_search.length; i++) {
      const qSearch = unanswered_qs_search[i];
      if (lastMessage.includes(qSearch)) {
        unanswered_count++
        continue;
      }
    }

    let match = {
      match_id: message.match_id,
      message: lastMessage,
      time_sent: message.messages[message.messages.length - 1].sent_date
    }

    messages.push(match)
  });

  let totalConvos = oneMessage + lessThan5 + lessThan10 + lessThan15 + theRest
  res.render('matches', { title: 'User', messages, message_search, message_counts, unanswered_count, message_count, oneMessage, lessThan5, lessThan10, lessThan15, theRest, totalConvos });
});

module.exports = router