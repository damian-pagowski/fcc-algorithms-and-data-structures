const chai = require("chai");
const expect = chai.expect;

const lookup = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  const change = cash - price;
  let ramainingChange = change;

  let changeBills = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    const currentBillName = cid[i][0];
    const currentBillValue = lookup[currentBillName];
    let currentBillInRegister = cid[i][1];
    let changeInCurrentBills = 0;

    if (ramainingChange > currentBillValue) {
      while (
        currentBillInRegister >= currentBillValue &&
        ramainingChange >= currentBillValue
      ) {
        currentBillInRegister -= currentBillValue;
        changeInCurrentBills += currentBillValue;
        ramainingChange -= currentBillValue;
        // dealing with precision errors

        ramainingChange = Math.round(ramainingChange * 100) / 100;
        changeInCurrentBills = Math.round(changeInCurrentBills * 100) / 100;
        currentBillInRegister = Math.round(currentBillInRegister * 100) / 100;
        console.log(
          `UPDATE LOOP: change total: ${ramainingChange}, change current bill: ${changeInCurrentBills}, current bills in register: ${currentBillInRegister}`
        );
        cid[i][1] = currentBillInRegister;
      }

      // update change array
      if (change) changeBills.push([currentBillName, changeInCurrentBills]);
    }
  }

  console.log("ramainingChange: " + ramainingChange);

  let drawerBalance = sumMoneyArray(cid);
  console.log("Drawer balance: " + drawerBalance);
  const status = determineStatus(ramainingChange, drawerBalance);
  if (status == "INSUFFICIENT_FUNDS") {
    changeBills = [];
  }

  if (status == "CLOSED") {
    let arr = Object.keys(lookup).reverse();
    arr = arr.slice(1, arr.length);
    arr = arr.map(k => ({ k: 0 }));
    changeBills.concat(arr);
  }
  console.log("RESULT: " + JSON.stringify(changeBills));
  return { status, change: changeBills };
}

function determineStatus(ramainingChange, drawerBalance) {
  let status;
  if (ramainingChange == 0) {
    if (drawerBalance > 0) {
      status = "OPEN";
    } else {
      status = "CLOSED";
    }
  } else {
    status = "INSUFFICIENT_FUNDS";
  }
  return status;
}

function sumMoneyArray(arr) {
  return arr.map(x => x[1]).reduce((a, b) => a + b, 0);
}

describe("Cash Register", function() {
  it("case 1", function() {
    const result = checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100],
    ]);
    expect(result.status).to.eql("OPEN");
    expect(result.change).to.have.deep.members([["QUARTER", 0.5]]);
  });

  it("case 2", function() {
    const result = checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100],
    ]);

    expect(result.status).to.eql("OPEN");
    expect(result.change).to.have.deep.members([["QUARTER", 0.5]]);
  });

  it("case 3", function() {
    const result = checkCashRegister(3.26, 100, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100],
    ]);

    expect(result.status).to.eql("OPEN");
    expect(result.change).to.have.deep.members([
      ["TWENTY", 60],
      ["TEN", 20],
      ["FIVE", 15],
      ["ONE", 1],
      ["QUARTER", 0.5],
      ["DIME", 0.2],
      ["PENNY", 0.04],
    ]);
  });
  it("case 4", function() {
    const result = checkCashRegister(19.5, 20, [
      ["PENNY", 0.01],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0],
    ]);
    expect(result.status).to.eql("INSUFFICIENT_FUNDS");
  });
  it("case 5", function() {
    const result = checkCashRegister(19.5, 20, [
      ["PENNY", 0.01],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 1],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0],
    ]);
    expect(result.status).to.eql("INSUFFICIENT_FUNDS");
  });
  it("case 6", function() {
    const result = checkCashRegister(19.5, 20, [
      ["PENNY", 0.5],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0],
    ]);

    expect(result.status).to.eql("CLOSED");
    expect(result.change).to.include.deep.members([["PENNY", 0.5]]);
  });
});
