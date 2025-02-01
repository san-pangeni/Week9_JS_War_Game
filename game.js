// Card Class
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return `${this.value} of ${this.suit}`;
  }
}

// Deck Class
class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    const suits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    for (let suit of suits) {
      for (let value of values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    return this.cards.pop();
  }
}

// Player Class
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.points = 0;
  }

  playCard() {
    return this.hand.pop();
  }

  addPoint() {
    this.points++;
  }
}

// Game Class
class Game {
  constructor() {
    this.players = [new Player("Player 1"), new Player("Player 2")];
    this.deck = new Deck();
  }

  startGame() {
    this.deck.shuffle();
    while (this.deck.cards.length > 0) {
      this.players[0].hand.push(this.deck.deal());
      this.players[1].hand.push(this.deck.deal());
    }
  }

  playRound() {
    const card1 = this.players[0].playCard();
    const card2 = this.players[1].playCard();

    console.log(`${this.players[0].name} plays: ${card1.toString()}`);
    console.log(`${this.players[1].name} plays: ${card2.toString()}`);

    if (this.getCardValue(card1) > this.getCardValue(card2)) {
      this.players[0].addPoint();
      console.log(`${this.players[0].name} wins this round!`);
    } else if (this.getCardValue(card1) < this.getCardValue(card2)) {
      this.players[1].addPoint();
      console.log(`${this.players[1].name} wins this round!`);
    } else {
      console.log("It's a tie! No points awarded.");
    }
  }

  getCardValue(card) {
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];
    return values.indexOf(card.value);
  }

  determineWinner() {
    console.log(
      `Final Scores - ${this.players[0].name}: ${this.players[0].points}, ${this.players[1].name}: ${this.players[1].points}`
    );
    if (this.players[0].points > this.players[1].points) {
      console.log(`${this.players[0].name} wins the game!`);
    } else if (this.players[0].points < this.players[1].points) {
      console.log(`${this.players[1].name} wins the game!`);
    } else {
      console.log("The game is a tie!");
    }
  }

  playGame() {
    this.startGame();
    while (this.players[0].hand.length > 0) {
      this.playRound();
    }
    this.determineWinner();
  }
}

// Start the game
const game = new Game();
game.playGame();
