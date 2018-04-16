const {expect} = require('chai');

const {getLastPhrase, getLastReprompt, getReprompt, savePhrase} = require('../../src/state/dialog');

describe('state', () => {
  let app;

  beforeEach(() => {
    app = {data: {}};
  });

  describe('dialog', () => {
    describe('savePhrase', () => {
      it('should store phrase and we could pick up it', () => {
        app.data.somethingElse = 'hello world';
        savePhrase(app, 'Hi there!');
        expect(app.data).to.have.property('somethingElse', 'hello world');
        expect(getLastPhrase(app)).to.be.equal('Hi there!');
      });
    });

    describe('getLastPhrase', () => {
      it('should return undefined if we have not stored phrase before', () => {
        expect(getLastPhrase(app)).to.be.undefined;
      });
    });

    describe('getLastReprompt', () => {
      it('should return reprompt', () => {
        savePhrase(app, {reprompt: 'Sorry! Repeat The number please!'});
        expect(getLastReprompt(app)).to.be.equal('Sorry! Repeat The number please!');
      });
    });

    describe('getReprompt', () => {
      it('should return reprompt object with speech, suggestions and upcoming reprompt speech', () => {
        savePhrase(app, {
          speech: 'What is your number?',
          reprompt: 'Sorry! Repeat The number please!',
          suggestions: ['1', '2', '3'],
        });

        expect(getReprompt(app))
          .to.be.deep.equal({
            speech: 'Sorry! Repeat The number please!',
            reprompt: 'Sorry! Repeat The number please!',
            suggestions: ['1', '2', '3'],
          });
      });
    });
  });
});
