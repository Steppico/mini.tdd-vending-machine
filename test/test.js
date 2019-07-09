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
    // expect(console.log.calledWith("500")).to.be.true; // Use an ES6 getter
  });

  it("should save the letter and print it to the console when selected", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.pressButton("A");
    expect(machine.selectedRow).to.equal("A");
    // expect(console.log.calledWith("A")).to.be.true;
  });
  it("should save the number and print it to the console when selected", () => {
    const machine = new VendingMachine();
    machine.insertCoin(100);
    machine.pressButton(1);
    expect(machine.selectedColumn).to.equal(1);
    // expect(console.log.calledWith("A")).to.be.true;
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
});
