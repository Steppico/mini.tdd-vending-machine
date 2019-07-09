const { VendingMachine, inventory } = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  it("should accept valid coins", () => {
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 50,
      50: 50,
      100: 50,
      500: 51,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });
  it("should not accept invalid coins", () => {
    const machine = new VendingMachine();
    expect(machine.insertCoin(200)).to.equal("Not a valid coin. Rejected.");
  });
  it("should save the letter and print it to the console when selected", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    expect(machine.selectedRow).to.equal("A");
  });
  it("should save the number and print it to the console when selected", () => {
    const machine = new VendingMachine();
    machine.insertCoin(100);
    machine.pressButton(1);
    expect(machine.selectedColumn).to.equal(1);
  });
  it("should return the item name", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(1);
    expect(machine.output()).to.be.equal("Apple Juice");
  });
  it("should decrease the item quantity", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(1);
    machine.output();
    expect(inventory[0][0].count).to.be.equal(3);
  });
  it("should not allow the purchase if the item quantity is 0", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(3);
    expect(machine.output()).to.be.equal(
      "Item terminated! Select another one."
    );
    expect(machine.balance).to.be.equals(500);
  });
  it("should return the change", () => {
    const machine = new VendingMachine();
    machine.insertCoin(100);
    machine.insertCoin(50);
    machine.insertCoin(50);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.pressButton("A");
    machine.pressButton(1);
    machine.output();
    expect(machine.change()).to.deep.equal({
      10: 0,
      50: 1,
      100: 1,
      500: 0,
    });
  });
  it("should return undefined if there is no inventory for that column", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(4);
    expect(machine.output()).to.be.equal("no item at this column.");
  });
  it("return undefined if the balance is not sufficient to purchase the item", () => {
    const machine = new VendingMachine();
    machine.insertCoin(10);
    machine.pressButton("A");
    machine.pressButton(2);
    expect(machine.output()).to.be.equal("Insufficient funds.");
  });
  it("balance should be 0 when starting the program", () => {
    const machine = new VendingMachine();
    expect(machine.balance).to.deep.equal(0);
  });
  it("should only accept letters from A to D", () => {
    const machine = new VendingMachine();
    expect(machine.pressButton("E")).to.be.equal(
      `Please select a valid letter.`
    );
    expect(machine.selectedRow).to.be.equal("");
  });
});
