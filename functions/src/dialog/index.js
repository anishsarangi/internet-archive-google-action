const audio = require('./audio');

module.exports = {
  ask: require('./ask'),
  playSong: audio.playSong,
  merge: require('./merge'),
  tell: require('./tell'),
};
