// your class here
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
const juice = { name: `Apple Juice`, price: 350, count: 5 };
const coffee = { name: "Tully's", price: 250, count: 7 };

class VendingMachine {
  constructor(balance = 0) {
    this._balance = balance;
    this.till = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this._selectedRow = "";
    // 0 is the default value
    this._selectedCol = 0;
    this.inventory = [[juice, coffee]];
  }
  /* Assumes a single coin is inserted*/
  insertCoin(coin) {
    this.till[coin]++;
    this.calculateBalance();
    // console.log(this._balance);
  }
  calculateBalance() {
    this._balance = 0;
    for (let key in this.till) {
      this._balance += this.till[key] * key;
    }
  }
  get balance() {
    return this._balance;
  }
  pressButton(letter) {
    if (letter === "A" || letter === "B" || letter === "C" || letter === "D") {
      this._selectedRow = letter;
    } else if (letter === 1 || letter === 2 || letter === 3 || letter === 4) {
      this._selectedCol = letter;
    } else {
      console.error("Please select a valid letter.");
    }
  }
  get selectedRow() {
    return this._selectedRow;
  }
  get selectedColumn() {
    return this._selectedCol;
  }
  output() {
    let row = 0;
    switch (this.selectedRow) {
      case "A":
        row = 0;
        break;
      case "B":
        row = 1;
        break;
      case "C":
        row = 2;
        break;
      case "D":
        row = 3;
        break;
    }
    let col = this.selectedColumn - 1;
    return this.inventory[row][col].name;
  }
}

module.exports = VendingMachine;
