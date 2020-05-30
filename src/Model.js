export default class Model {
  constructor() {
    this.soundOn = true;
    this.musicOn = true;
    this.bgMusicPlaying = false;
    this.score = 1;
    this.name = '';
    this.gameBoard = [];
  }

  getGameBoard() {
    return this.gameBoard;
  }

  setGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  set musicOn(value) {
    this.musicOn = value;
  }

  get musicOn() {
    return this.musicOn;
  }

  set soundOn(value) {
    this.soundOn = value;
  }

  get soundOn() {
    return this.soundOn;
  }

  set bgMusicPlaying(value) {
    this.bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicPlaying;
  }
}
