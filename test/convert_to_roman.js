const assert = require("assert");

function convertToRoman(num) {
  //
  const thousands = Math.floor(num / 1000);
  const hundereds = Math.floor((num % 1000) / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = Math.floor(num % 10);
  // literals
  const hunderedsLiterals = ["C", "D", "M"];
  const tensLiterals = ["X", "L", "C"];
  const onesLiterals = ["I", "V", "X"];

  return (
    "M".repeat(thousands) +
    format(hundereds, hunderedsLiterals) +
    format(tens, tensLiterals) +
    format(ones, onesLiterals)
  );
}

function format(n, literals) {
  let result = "";
  if (n < 4) {
    result += literals[0].repeat(n);
  } else if (n == 4) {
    result += literals[0] + literals[1];
  } else if (n == 5) {
    result += literals[1];
  } else if (n > 5 && n < 9) {
    result += literals[1] += literals[0].repeat(n - 5);
  } else if (n == 9) {
    result += literals[0] + literals[2];
  }
  return result;
}

describe("convertToRoman", function() {
  it('convertToRoman(2) should return "II"', function() {
    assert.equal(convertToRoman(2), "II");
  });
  it('convertToRoman(3) should return "III"', function() {
    assert.equal(convertToRoman(3), "III");
  });
  it('convertToRoman(4) should return "IV"', function() {
    assert.equal(convertToRoman(4), "IV");
  });
  it('convertToRoman(5) should return "V"', function() {
    assert.equal(convertToRoman(5), "V");
  });
  it('convertToRoman(9) should return "IX"', function() {
    assert.equal(convertToRoman(9), "IX");
  });
  it('convertToRoman(12) should return "XII"', function() {
    assert.equal(convertToRoman(12), "XII");
  });
  it('convertToRoman(16) should return "XVI"', function() {
    assert.equal(convertToRoman(16), "XVI");
  });
  it('convertToRoman(29) should return "XXIX"', function() {
    assert.equal(convertToRoman(29), "XXIX");
  });
  it('convertToRoman(44) should return "XLIV"', function() {
    assert.equal(convertToRoman(44), "XLIV");
  });
  it('convertToRoman(45) should return "XLV"', function() {
    assert.equal(convertToRoman(45), "XLV");
  });
  it('convertToRoman(68) should return "LXVIII"', function() {
    assert.equal(convertToRoman(68), "LXVIII");
  });

  it('convertToRoman(83) should return "LXXXIII"', function() {
    assert.equal(convertToRoman(83), "LXXXIII");
  });
  it('convertToRoman(97) should return "XCVII"', function() {
    assert.equal(convertToRoman(97), "XCVII");
  });
  it('convertToRoman(99) should return "XCIX"', function() {
    assert.equal(convertToRoman(99), "XCIX");
  });

  it('convertToRoman(400) should return "CD"', function() {
    assert.equal(convertToRoman(400), "CD");
  });
  it('convertToRoman(500) should return "D"', function() {
    assert.equal(convertToRoman(500), "D");
  });
  it('convertToRoman(501) should return "DI"', function() {
    assert.equal(convertToRoman(501), "DI");
  });
  it('convertToRoman(649) should return "DCXLIX"', function() {
    assert.equal(convertToRoman(649), "DCXLIX");
  });
  it('convertToRoman(798) should return "DCCXCVIII"', function() {
    assert.equal(convertToRoman(798), "DCCXCVIII");
  });
  it('convertToRoman(891) should return "DCCCXCI"', function() {
    assert.equal(convertToRoman(891), "DCCCXCI");
  });
  it('convertToRoman(1000) should return "M"', function() {
    assert.equal(convertToRoman(1000), "M");
  });
  it('convertToRoman(1004) should return "MIV"', function() {
    assert.equal(convertToRoman(1004), "MIV");
  });
  it('convertToRoman(1006) should return "MVI"', function() {
    assert.equal(convertToRoman(1006), "MVI");
  });
  it('convertToRoman(1023) should return "MXXIII"', function() {
    assert.equal(convertToRoman(1023), "MXXIII");
  });
  it('convertToRoman(2014) should return "MMXIV"', function() {
    assert.equal(convertToRoman(2014), "MMXIV");
  });
  it('convertToRoman(3999) should return "MMMCMXCIX"', function() {
    assert.equal(convertToRoman(3999), "MMMCMXCIX");
  });
});
