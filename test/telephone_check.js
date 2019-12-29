const chai = require("chai");
const assert = chai.assert; // Using Assert style
// var expect = chai.expect;    // Using Expect style
// var should = chai.should();

function telephoneCheck(str) {
  const regex = RegExp(
    /^[1]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im
  );
  return regex.test(str) && isParenthesisMatching(str);
}

function isParenthesisMatching(str) {
  let stack = [];

  let open = {
    "(": ")",
  };

  let closed = {
    ")": true,
  };

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (open[char]) {
      stack.push(char);
    } else if (closed[char]) {
      if (open[stack.pop()] !== char) return false;
    }
  }
  return stack.length === 0;
}

describe("telephoneChecker", function() {
  it('telephoneCheck("555)-555-5555") should return false', function() {
    assert.isNotOk(telephoneCheck("555)-555-5555"));
  });
  it('telephoneCheck("(555-555-5555") should return false', function() {
    assert.isNotOk(telephoneCheck("(555-555-5555"));
  });
  it('telephoneCheck("27576227382") should return false', function() {
    assert.isNotOk(telephoneCheck("27576227382"));
  });
  it('telephoneCheck("(275)76227382") should return false', function() {
    assert.isNotOk(telephoneCheck("(275)76227382"));
  });
  it('telephoneCheck("1 555)555-5555") should return false', function() {
    assert.isNotOk(telephoneCheck("1 555)555-5555"));
  });

  it('telephoneCheck("555-555-5555") should return a boolean.', function() {
    assert.isOk(telephoneCheck("555-555-5555"));
  });
  it('telephoneCheck("1 555-555-5555") should return true', function() {
    assert.isOk(telephoneCheck("1 555-555-5555"));
  });
  it('telephoneCheck("1 (555) 555-5555") should return true', function() {
    assert.isOk(telephoneCheck("1 (555) 555-5555"));
  });
  it('telephoneCheck("5555555555") should return true', function() {
    assert.isOk(telephoneCheck("5555555555"));
  });

  it('telephoneCheck("555-555-5555") should return true', function() {
    assert.isOk(telephoneCheck("555-555-5555"));
  });
  it('telephoneCheck("(555)555-5555") should return true', function() {
    assert.isOk(telephoneCheck("(555)555-5555"));
  });
  it('telephoneCheck("1(555)555-5555") should return true', function() {
    assert.isOk(telephoneCheck("1(555)555-5555"));
  });
});
