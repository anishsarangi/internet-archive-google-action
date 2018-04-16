const _ = require('lodash');

const dialog = require('../dialog');
const playlist = require('../state/playlist');
const query = require('../state/query');
const welcomeStrings = require('../strings').intents.welcome;

/**
 * handle welcome intent
 *
 * @param app
 */
function handler (app) {
  let reprompt = welcomeStrings.reprompt || welcomeStrings.speech;

  let speech;
  if (app.isFirstTry && app.isFirstTry()) {
    speech = '<audio src="https://s3.amazonaws.com/gratefulerrorlogs/CrowdNoise.mp3" />' + _.sample(welcomeStrings.acknowledges) + ' ' + welcomeStrings.speech;
  } else {
    speech = _.sample(welcomeStrings.acknowledges) + ' ' + welcomeStrings.speech;
  }

  // TODO: it would be great to implement some sophisticated
  // behaviour but for the moment we just clean state of the user's session
  // when we return to welcome action

  // so "Resume" intent won't work after that
  // we clean all that information
  playlist.create(app, []);
  query.resetSlots(app);

  dialog.ask(app, Object.assign({}, welcomeStrings, {speech, reprompt}));
}

module.exports = {
  handler,
};
