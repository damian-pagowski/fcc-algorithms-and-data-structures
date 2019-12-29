const assert = require("assert");

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function rot13(str) {
  let result = "";
  for (var i = 0; i < str.length; i++) {
    if (isLetter(str.charAt(i))) {
      let code = ((str.charAt(i).charCodeAt(0) + 13 - 65) % 26) + 65;
      let encodedChar = String.fromCharCode(code);
      result += encodedChar;
    } else {
      result += str.charAt(i);
    }
  }

  return result;
}

describe("tests", function() {
  describe("Caesars Cipher", function() {
    it('rot13("SERR PBQR PNZC") should decode to FREE CODE CAMP', function() {
      assert.equal(rot13("SERR PBQR PNZC"), "FREE CODE CAMP");
    });
    it('rot13("SERR CVMMN!") should decode to FREE PIZZA!', function() {
      assert.equal(rot13("SERR CVMMN!"), "FREE PIZZA!");
    });
    it('rot13("SERR YBIR?") should decode to FREE LOVE?', function() {
      assert.equal(rot13("SERR YBIR?"), "FREE LOVE?");
    });

    it('rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', function() {
      assert.equal(
        rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."),
        "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
      );
    });
  });
});
