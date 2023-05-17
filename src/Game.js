export default class Game {
  constructor(userStatus, opponentStatus) {
    this.userStatus = userStatus;
    this.opponentStatus = opponentStatus;
    this.currentTurn = 'user';
    this.turnPhase = 'waiting';
  }
}