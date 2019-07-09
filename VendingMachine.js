// your class here
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
const juice = { name: `Apple Juice`, price: 350, count: 5 };
const coffee = { name: "Tully's", price: 250, count: 7 };
const inventory = [[juice, coffee]];

class VendingMachine {
  constructor(balance = 0) {
    this._balance = balance;
    this.till = {
      10: 50,
      50: 50,
      100: 50,
      500: 50,
    };
    this._selectedRow = "";
    // 0 is the default value
    this._selectedCol = 0;
  }
  /* Assumes a single coin is inserted*/
  insertCoin(coin) {
    this.till[coin]++;
    this.balance += coin;
    // console.log(this._balance);
  }

  set balance(coin) {
    this._balance = coin;
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
    inventory[row][col].count--;
    this.balance -= inventory[row][col].price;
    return inventory[row][col].name;
  }
  change() {
    let result = {};
    const coins = [];
    for (let key in this.till) {
      coins.push(Number(key));
    }
    coins.sort((a, b) => b - a);

    for (let coin of coins) {
      result[coin] = 0;
      while (this.balance >= coin && this.balance != 0) {
        this.balance -= coin;
        ++result[coin];
      }
    }
    return result;
  }
}

module.exports = { VendingMachine, inventory };
