import { randomInt } from "./util";

export default class Game {
  constructor(userStatus, opponentStatus) {
    this.userStatus = userStatus;
    this.opponentStatus = opponentStatus;
    this.currentTurn = 'user';
    this.turnPhase = 'waiting';

    this.deck = [
      { id: 1111, value: 1, type: 'main' },
      { id: 2222, value: 2, type: 'main' },
      { id: 3333, value: 3, type: 'main' },
      { id: 4444, value: 4, type: 'main' },
      { id: 5555, value: 5, type: 'main' },
      { id: 6666, value: 6, type: 'main' },
      { id: 7777, value: 7, type: 'main' },
      { id: 8888, value: 8, type: 'main' },
      { id: 9999, value: 9, type: 'main' },
      { id: 10000, value: 10, type: 'main' },

      { id: 11111, value: 1, type: 'main' },
      { id: 22222, value: 2, type: 'main' },
      { id: 33333, value: 3, type: 'main' },
      { id: 44444, value: 4, type: 'main' },
      { id: 55555, value: 5, type: 'main' },
      { id: 66666, value: 6, type: 'main' },
      { id: 77777, value: 7, type: 'main' },
      { id: 88888, value: 8, type: 'main' },
      { id: 99999, value: 9, type: 'main' },
      { id: 10001, value: 10, type: 'main' },

      { id: 111111, value: 1, type: 'main' },
      { id: 222222, value: 2, type: 'main' },
      { id: 333333, value: 3, type: 'main' },
      { id: 444444, value: 4, type: 'main' },
      { id: 555555, value: 5, type: 'main' },
      { id: 666666, value: 6, type: 'main' },
      { id: 777777, value: 7, type: 'main' },
      { id: 888888, value: 8, type: 'main' },
      { id: 999999, value: 9, type: 'main' },
      { id: 10002, value: 10, type: 'main' },

      { id: 1111111, value: 1, type: 'main' },
      { id: 2222222, value: 2, type: 'main' },
      { id: 3333333, value: 3, type: 'main' },
      { id: 4444444, value: 4, type: 'main' },
      { id: 5555555, value: 5, type: 'main' },
      { id: 6666666, value: 6, type: 'main' },
      { id: 7777777, value: 7, type: 'main' },
      { id: 8888888, value: 8, type: 'main' },
      { id: 9999999, value: 9, type: 'main' },
      { id: 10003, value: 10, type: 'main' },
    ];
  }

  dealCard() {
    console.warn('dealing a random card');
    const currentPlayer = this[this.currentTurn + 'Status'];
    const randomCardIndex = randomInt(0, this.deck.length -1);
    const randomCard = this.deck[randomCardIndex];
    currentPlayer.cardsInPlay.push(randomCard);
    this.deck.splice(randomCardIndex, 1);
    console.log('dealt a', randomCard.value, randomCard.id);

    currentPlayer.matchScore += randomCard.value;
  }
}