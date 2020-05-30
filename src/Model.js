export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._score = 1;
    this._name = '';
    this.gameBoard = [];
  }

  getGameBoard() {
    return this._gameBoard;
  }

  setGameBoard(gameBoard) {
    this._gameBoard = gameBoard;
  }

  getScore() {
    return this._score;
  }

  setScore(score) {
    this._score = score;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}
