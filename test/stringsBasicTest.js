require('./globalRequires.js');

const skipIfNotPresent=require('./skipIfNotPresent.js');
const assert=require('./wrappedAssert.js');

const clobberReduce=require('./clobberArrayOperations.js').clobberReduce;
const restoreReduce=require('./clobberArrayOperations.js').restoreReduce;
const reduceRefCount=require('./clobberArrayOperations.js').reduceRefCount;

const clobberSplit=require('./clobberStringOperations.js').clobberSplit;
const restoreSplit=require('./clobberStringOperations.js').restoreSplit;
const splitRefCount=require('./clobberStringOperations.js').splitRefCount;

let countVowels;
let countConsonants;
let isPalindrome;
let reverse;
let strip;
let camelCase;
let uniqueLetterCount;
let reverseWordOrder;
let reverseWords;

let errorInLoadingModule;

try {
  countVowels=require('../src/stringsBasic.js').countVowels;
  countConsonants=require('../src/stringsBasic.js').countConsonants;
  isPalindrome=require('../src/stringsBasic.js').isPalindrome;
  reverse=require('../src/stringsBasic.js').reverse;
} catch (e) {
  errorInLoadingModule=e;
}

describe("strings_basic",function(){
  it("did not load some file properly",function(){
    if (errorInLoadingModule && errorInLoadingModule.code=="MODULE_NOT_FOUND") {
      assert.equal("",errorInLoadingModule.code);
    }
  });

  it("potentially has a syntax error",function(){
    if(errorInLoadingModule && !errorInLoadingModule.code)
      assert.equal("",errorInLoadingModule.toString());
  });
});

describe("strings_basic",function(){
  describe("countVowels",function(){
    before(skipIfNotPresent(countVowels));

    it("should not use inappropriate in-built functions",function(){
      let text="hello";
      text=clobberSplit(text);
      countVowels(text);
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should count the number of vowels when text has only lower case vowels",function(){
      assert._equal(1,countVowels,"hi");
      assert._equal(2,countVowels,"ape");
      assert._equal(5,countVowels,"education");
    });

    it("should count the number of vowels when text has only upper case vowels",function(){
      assert._equal(1,countVowels,"HI");
      assert._equal(2,countVowels,"APE");
      assert._equal(5,countVowels,"EDUCATION");
    });

    it("should count the number of vowels when text has mixed case vowels",function(){
      assert._equal(1,countVowels,"HI");
      assert._equal(2,countVowels,"APe");
      assert._equal(5,countVowels,"EDuCATiON");
    });

    it("should return 0 when there are no vowels in the text",function(){
      assert._equal(0,countVowels,"cyst");
    });

    it("should count multiple occurrences of the same vowel",function(){
      assert._equal(2,countVowels,"II");
      assert._equal(3,countVowels,"eee");
      assert._equal(5,countVowels,"uuuuu");
    });

    it("should count multiple occurrences of multiple vowels",function(){
      assert._equal(4,countVowels,"IIAA");
      assert._equal(5,countVowels,"eAeAe");
      assert._equal(10,countVowels,"educationeducation");
    });

    it("should count the vowels correctly when there are non alphabetic characters",function(){
      assert._equal(2,countVowels,"I am.");
      assert._equal(3,countVowels,"I am a");
    });

    it("should return 0 when empty text is provided",function(){
      assert._equal(0,countVowels,"");
    });

    it("should count all the vowels in the English alphabet",function(){
      assert._equal(5,countVowels,"aeiou");
      assert._equal(5,countVowels,"AEIOU");
      assert._equal(5,countVowels,"AEiou");
      let alphabet="abcdefghijklmnopqrstuvwxyz";
      assert._equal(5,countVowels,alphabet);
      assert._equal(5,countVowels,alphabet.toUpperCase());
    });
  });

  describe("countConsonants",function(){
    before(skipIfNotPresent(countConsonants));

    it("should not use inappropriate in-built functions",function(){
      let text="hello";
      text=clobberSplit(text);
      countVowels(text);
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should count the number of consonants when text has only lower case consonants",function(){
      assert._equal(1,countConsonants,"hi");
      assert._equal(2,countConsonants,"pot");
      assert._equal(4,countConsonants,"education");
    });

    it("should count the number of consonants when text has only upper case consonants",function(){
      assert._equal(1,countConsonants,"HI");
      assert._equal(2,countConsonants,"POT");
      assert._equal(4,countConsonants,"EDUCATION");
    });

    it("should count the number of consonants when text has mixed case consonants",function(){
      assert._equal(2,countConsonants,"Pot");
      assert._equal(4,countConsonants,"EduCatION");
      assert._equal(8,countConsonants,"educationEDUCATION");
    });

    it("should return 0 when there are no consonants in the text",function(){
      assert._equal(0,countConsonants,"euouae");
    });

    it("should count multiple occurrences of the same consonants",function(){
      assert._equal(2,countConsonants,"pop");
      assert._equal(4,countConsonants,"logical");
      assert._equal(6,countConsonants,"application");
    });

    it("should count multiple occurrences of multiple consonants",function(){
      assert._equal(4,countConsonants,"alfaalfa")
      assert._equal(5,countConsonants,"malaYalam")
    });

    it("should count consonants correctly when there are non-alphabetic characters",function(){
      assert._equal(1,countConsonants,"I am");
      assert._equal(3,countConsonants,"I am good.");
      assert._equal(9,countConsonants,"Here comes the sun");
    });

    it("should return 0 when empty text is provided",function(){
      assert._equal(0,countConsonants,"");
    });

    it("should count all the consonants in the English alphabet",function(){
      let consonants="bcdfghjklmnpqrstvwxyz";
      assert._equal(21,countConsonants,consonants);
      assert._equal(21,countConsonants,consonants.toUpperCase());
      let alphabet="abcdefghijklmnopqrstuvwxyz";
      assert._equal(21,countConsonants,alphabet);
      assert._equal(21,countConsonants,alphabet.toUpperCase());
    });
  });

  describe("isPalindrome",function(){
    before(skipIfNotPresent(isPalindrome));

    it("should not use inappropriate in-built functions",function(){
      let text="madam";
      text=clobberSplit(text);
      isPalindrome(text);
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should return true when a string is a palindrome of even length",function(){
      assert._isOk(isPalindrome,"11");
      assert._isOk(isPalindrome,"abba");
      assert._isOk(isPalindrome,"spaceecaps");
    });

    it("should return true when a string is a palindrome of odd length",function(){
      assert._isOk(isPalindrome,"a");
      assert._isOk(isPalindrome,"aba");
      assert._isOk(isPalindrome,"madam");
      assert._isOk(isPalindrome,"malayalam");
    });

    it("should return true for an empty string",function(){
      assert._isOk(isPalindrome,"");
    });

    it("should return false for strings that are not palindromes",function(){
      assert._isNotOk(isPalindrome,"ab");
      assert._isNotOk(isPalindrome,"abc");
      assert._isNotOk(isPalindrome,"abcde");
    });

    it("should return false for strings that are almost palindromes but not quite",function(){
      assert._isNotOk(isPalindrome,"acba");
      assert._isNotOk(isPalindrome,"maem");
      assert._isNotOk(isPalindrome,"madem");
      assert._isNotOk(isPalindrome,"maleyalam");
    });

    it("should treat letters of different cases as different letters(case sensitive)",function(){
      assert._isNotOk(isPalindrome,"Madam");
      assert._isNotOk(isPalindrome,"madaM");
      assert._isNotOk(isPalindrome,"MadAM");
      assert._isNotOk(isPalindrome,"madAM");
      assert._isNotOk(isPalindrome,"MAdam");
      assert._isNotOk(isPalindrome,"madDam");
    });
  });

  describe("reverse",function(){
    before(skipIfNotPresent(reverse));

    it("should not use inappropriate in-built functions",function(){
      let text="madam";
      text=clobberSplit(text);
      reverse(text);
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should reverse a given string",function(){
      assert._equal("olleh",reverse,"hello");
      assert._equal("Abc",reverse,"cbA");
      assert._equal("+-+-",reverse,"-+-+");
      assert._equal("a b c",reverse,"c b a");
      assert._equal("a   ",reverse,"   a");
    });

    it("should reverse a palindrome to be the same string",function(){
      assert._equal("madam",reverse,"madam");
      assert._equal("110011",reverse,"110011");
      assert._equal("__ __",reverse,"__ __");
    });

    it("should return an empty string when given an empty string",function(){
      assert._equal("",reverse,"");
    });
  });
});
