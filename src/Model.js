export default class Model {
  constructor() {
    this._soundOn = true; // eslint-disable-line no-underscore-dangle
    this._musicOn = true; // eslint-disable-line no-underscore-dangle
    this._bgMusicPlaying = false; // eslint-disable-line no-underscore-dangle
    this._score = 1; // eslint-disable-line no-underscore-dangle
    this._name = ''; // eslint-disable-line no-underscore-dangle
    this._gameBoard = []; // eslint-disable-line no-underscore-dangle
  }

  getGameBoard() {
    return this._gameBoard; // eslint-disable-line no-underscore-dangle
  }

  setGameBoard(gameBoard) {
    this._gameBoard = gameBoard; // eslint-disable-line no-underscore-dangle
  }

  getScore() {
    return this._score; // eslint-disable-line no-underscore-dangle
  }

  setScore(score) {
    this._score = score; // eslint-disable-line no-underscore-dangle
  }

  getName() {
    return this._name; // eslint-disable-line no-underscore-dangle
  }

  setName(name) {
    this._name = name; // eslint-disable-line no-underscore-dangle
  }

  set musicOn(value) {
    this._musicOn = value; // eslint-disable-line no-underscore-dangle
  }

  get musicOn() {
    return this._musicOn; // eslint-disable-line no-underscore-dangle
  }

  set soundOn(value) {
    this._soundOn = value; // eslint-disable-line no-underscore-dangle
  }

  get soundOn() {
    return this._soundOn; // eslint-disable-line no-underscore-dangle
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value; // eslint-disable-line no-underscore-dangle
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying; // eslint-disable-line no-underscore-dangle
  }
}
