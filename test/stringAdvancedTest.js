require('./globalRequires.js');

const skipIfNotPresent=require('./skipIfNotPresent.js');
const assert=require('./wrappedAssert.js');

const clobberReduce=require('./clobberArrayOperations.js').clobberReduce;
const restoreReduce=require('./clobberArrayOperations.js').restoreReduce;
const reduceRefCount=require('./clobberArrayOperations.js').reduceRefCount;

const clobberSplit=require('./clobberStringOperations.js').clobberSplit;
const restoreSplit=require('./clobberStringOperations.js').restoreSplit;
const splitRefCount=require('./clobberStringOperations.js').splitRefCount;

const clobberTrim=require('./clobberStringOperations.js').clobberTrim;
const restoreTrim=require('./clobberStringOperations.js').restoreTrim;
const trimRefCount=require('./clobberStringOperations.js').trimRefCount;

const clobberTrimLeft=require('./clobberStringOperations.js').clobberTrimLeft;
const restoreTrimLeft=require('./clobberStringOperations.js').restoreTrimLeft;
const trimLeftRefCount=require('./clobberStringOperations.js').trimLeftRefCount;

const clobberTrimRight=require('./clobberStringOperations.js').clobberTrimRight;
const restoreTrimRight=require('./clobberStringOperations.js').restoreTrimRight;
const trimRightRefCount=require('./clobberStringOperations.js').trimRightRefCount;


let countVowels;
let countConsonants;
let isPalindrome;
let reverse;
let strip;
let camelCase;
let uniqueLetterCount;
let reverseWordOrder;
let reverseWords;
let interleave;
let wordFrequency;
let strikeOut;

let errorInLoadingModule;

try {
  strip=require('../src/stringsAdvanced.js').strip;
  camelCase=require('../src/stringsAdvanced.js').camelCase;
  uniqueLetterCount=require('../src/stringsAdvanced.js').uniqueLetterCount;
  reverseWordOrder=require('../src/stringsAdvanced.js').reverseWordOrder;
  reverseWords=require('../src/stringsAdvanced.js').reverseWords;
  interleave=require('../src/stringsAdvanced.js').interleave;
  wordFrequency=require('../src/stringsAdvanced.js').wordFrequency;
  strikeOut=require('../src/stringsAdvanced.js').strikeOut;
} catch (e) {
  errorInLoadingModule=e;
}

describe("strings_advanced",function(){
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

describe("strings_advanced",function(){
  describe("strip",function(){
    before(skipIfNotPresent(strip));

    it("should not use inappropriate in-built functions",function(){
      let string="  abc  ";
      string=clobberTrim(string);
      string=clobberTrimLeft(string);
      string=clobberTrimRight(string);
      strip(string);
      assert._equal(0,trimRefCount);
      assert._equal(0,trimLeftRefCount);
      assert._equal(0,trimRightRefCount);
      restoreTrimLeft(string);
      restoreTrimRight(string);
      restoreTrim(string);
    });

    it("should strip leading spaces from the given text",function(){
      assert._equal("hello",strip," hello");
      assert._equal("hello",strip,"  hello");
      assert._equal("h ello",strip,"   h ello");
    });

    it("should strip trailing spaces from the given text",function(){
      assert._equal("hello",strip,"hello ");
      assert._equal("hello",strip,"hello  ");
      assert._equal("hell o",strip,"hell o   ");
    });

    it("should strip leading and trailing spaces from the given text",function(){
      assert._equal("hello",strip,"   hello ");
      assert._equal("hello",strip,"   hello  ");
      assert._equal("h ell o",strip,"   h ell o   ");
    });

    it("should return an empty string when only spaces are given",function(){
      assert._equal("",strip," ");
      assert._equal("",strip,"  ");
      assert._equal("",strip,"   ");
      assert._equal("",strip,"      ");
    });

    it("should not do anything to text that have no leading or trailing spaces",function(){
      assert._equal("hello",strip,"hello");
      assert._equal("he llo",strip,"he llo");
      assert._equal("h e l l o",strip,"h e l l o");
      assert._equal("______",strip,"______");
    });

    it("should return an empty string when an empty string is provided",function(){
      assert._equal("",strip,"");
    });
  });

  describe("camelCase",function(){
    before(skipIfNotPresent(camelCase));

    it("should not use inappropriate in-built functions",function(){
      let list=["camel","case"];
      list=clobberReduce(list);
      camelCase(list);
      assert._equal(0,reduceRefCount);
      restoreReduce(list);
    });

    it("should not modify the original list",function(){
      let list=["this","is","a","camel","case","example"];
      camelCase(list);
      assert.deepEqual(["this","is","a","camel","case","example"],list);
    });

    it("should turn a given array of lower cased words into a camelCased word",function(){
      assert._equal("camelCase",camelCase,["camel","case"]);
      assert._equal("aSimpleExample",camelCase,["a","simple","example"]);
      assert._equal("thisIsIt",camelCase,["this","is","it"]);
    });

    it("should camel case a given array of words when first word is capitalized",function(){
      assert._equal("camelCase",camelCase,["Camel","case"]);
      assert._equal("aWord",camelCase,["A","word"]);
      assert._equal("thisIsIt",camelCase,["THIS","is","it"]);
    });

    it("should camel case a given array of words when all words are capitalized",function(){
      assert._equal("camelCase",camelCase,["Camel","Case"]);
      assert._equal("aWord",camelCase,["A","Word"]);
      assert._equal("thisIsIt",camelCase,["THIS","Is","It"]);
    });

    it("should return an empty string when an empty list is provided",function(){
      assert._equal("",camelCase,[]);
    });

    it("should return an empty string when a list has only empty strings",function(){
      assert._equal("",camelCase,[""]);
      assert._equal("",camelCase,["",""]);
      assert._equal("",camelCase,["","",""]);
    });

    it("should return an empty string when a list has some empty strings",function(){
      assert._equal("hello",camelCase,["","hello"]);
      assert._equal("hello",camelCase,["hello",""]);
      assert._equal("helloWorld",camelCase,["","hello","world"]);
      assert._equal("helloWorld",camelCase,["","hello", "", "world"]);
      assert._equal("helloWorld",camelCase,["","hello", "world", ""]);
    });

    it("should camel case when strings contain leading spaces",function(){
      assert._equal("helloWorld",camelCase,[" hello", "world"]);
      assert._equal("helloWorld",camelCase,["hello", " world"]);
      assert._equal("helloWorld",camelCase,[" hello", " world"]);
    });

    it("should camel case when strings contain trailing spaces",function(){
      assert._equal("helloWorld",camelCase,["hello ", "world"]);
      assert._equal("helloWorld",camelCase,["hello", "world "]);
      assert._equal("helloWorld",camelCase,["hello ", "world "]);
    });

    it("should camel case when strings contain leading and trailing spaces",function(){
      assert._equal("helloWorld",camelCase,["hello ", " world"]);
      assert._equal("helloWorld",camelCase,[" hello", "world "]);
      assert._equal("helloWorld",camelCase,[" hello ", " world "]);
    });

    it("should camel case words which have irregular case",function(){
      assert._equal("camelCase",camelCase,["cAmeL","cASe"]);
    });

    it("should camel case an array of one word",function(){
      assert._equal("camel",camelCase,["camel"]);
      assert._equal("camel",camelCase,["Camel"]);
      assert._equal("camel",camelCase,["cAmel"]);
    });

    it("should camel case an array of upper cased words",function(){
      assert._equal("camelCase",camelCase,["CAMEL","CASE"]);
      assert._equal("aWord",camelCase,["A","WORD"]);
      assert._equal("thisIsIt",camelCase,["THIS","IS","IT"]);
    });
  });

  describe("uniqueLetterCount",function(){
    before(skipIfNotPresent(uniqueLetterCount));

    it("should not use inappropriate in-built functions",function(){
      let text="madam";
      text=clobberSplit(text);
      uniqueLetterCount(text);
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should return the length of text when text contains only unique letters",function(){
      assert._equal(3,uniqueLetterCount,"hey");
      assert._equal(4,uniqueLetterCount,"halo");
      assert._equal(5,uniqueLetterCount,"inked");
      assert._equal(6,uniqueLetterCount,"artful");
    });

    it("should return the number of only unique letters when text contains repeated occurrences",function(){
      assert._equal(3,uniqueLetterCount,"heyy");
      assert._equal(4,uniqueLetterCount,"hallo");
      assert._equal(5,uniqueLetterCount,"innnnked");
      assert._equal(6,uniqueLetterCount,"artfuuullll");
    });

    it("should return the count of only unique letters in a case insensitive manner",function(){
      assert._equal(1,uniqueLetterCount,"hH");
      assert._equal(3,uniqueLetterCount,"aAbBCc");
      assert._equal(8,uniqueLetterCount,"OnomAtoPOiea");
    });

    it("should cover all letters in the English alphabet",function(){
      let alphabet="abcdefghijklmnopqrstuvwxyz";
      let alphabetUpper=alphabet.toUpperCase();
      assert._equal(26,uniqueLetterCount,alphabet);
      assert._equal(26,uniqueLetterCount,alphabetUpper);
      assert._equal(26,uniqueLetterCount,alphabet+alphabet);
      assert._equal(26,uniqueLetterCount,alphabetUpper+alphabetUpper);
    });

    it("should not count characters that are not in the English alphabet",function(){
      assert._equal(0,uniqueLetterCount,"012365465467895123");
      assert._equal(0,uniqueLetterCount,"-+_?@!#$%^&*()");
    });

    it("should count only letters in the English alphabet when there are other characters",function(){
      assert._equal(2,uniqueLetterCount,"ab%^&");
      assert._equal(2,uniqueLetterCount,"%^&cd");
      assert._equal(2,uniqueLetterCount,"cd%23cd");
      assert._equal(2,uniqueLetterCount,"%^cd&");
    });

    it("should return 0 when an empty string is provided",function(){
      assert._equal(0,uniqueLetterCount,"");
    });
  });

  describe("reverseWordOrder",function(){
    before(skipIfNotPresent(reverseWordOrder));

    it("should reverse the order of words when only a single space between words",function(){
      assert._equal("name my is This",reverseWordOrder,"This is my name");
      assert._equal("World Hello",reverseWordOrder,"Hello World");
      assert._equal("c b a",reverseWordOrder,"a b c");
    });

    it("should reverse the order of words separated by more than one space",function(){
      assert._equal("name  my is  This",reverseWordOrder,"This  is my  name");
      assert._equal("World   Hello",reverseWordOrder,"Hello   World");
      assert._equal("c b    a",reverseWordOrder,"a    b c");
    });

    it("should reverse leading spaces",function(){
      assert._equal("hello ",reverseWordOrder," hello");
      assert._equal("world hello ",reverseWordOrder," hello world");
      assert._equal("world hello  ",reverseWordOrder,"  hello world");
    });

    it("should reverse trailing spaces",function(){
      assert._equal(" hello",reverseWordOrder,"hello ");
      assert._equal(" world hello", reverseWordOrder,"hello world ");
      assert._equal("  world hello",reverseWordOrder,"hello world  ");
    });

    it("should reverse leading and trailing spaces",function(){
      assert._equal(" hello ",reverseWordOrder," hello ");
      assert._equal(" world hello ",reverseWordOrder," hello world ");
      assert._equal(" world hello  ",reverseWordOrder,"  hello world ");
      assert._equal("  world hello ",reverseWordOrder," hello world  ");
    });

    it("should return an empty string when an empty string is given as text",function(){
      assert._equal("",reverseWordOrder,"");
    });

    it("should return the original string if it only contains a single word and no spaces",function(){
      assert._equal("hello",reverseWordOrder,"hello");
    });

    it("should reverse the order of words when words consist of non-alphabetic characters",function(){
      assert._equal("+-&* 1234 abcd",reverseWordOrder,"abcd 1234 +-&*");
      assert._equal("+-&* 12ab 34cd",reverseWordOrder,"34cd 12ab +-&*");
      assert._equal("12345",reverseWordOrder,"12345");
      assert._equal(" 12345",reverseWordOrder,"12345 ");
      assert._equal("12345 ",reverseWordOrder," 12345");
      assert._equal(" 12345 ",reverseWordOrder," 12345 ");
    });
  });

  describe("reverseWords",function(){
    before(skipIfNotPresent(reverseWords));

    it("should reverse each word,but preserve the order of the words",function(){
      assert._equal("olleh dlrow",reverseWords,"hello world");
      assert._equal("sihT si ti",reverseWords,"This is it");
      assert._equal("cba fed",reverseWords,"abc def");
      assert._equal("cba fed",reverseWords,"abc def");
    });

    it("should reverse words and preserve order of spaces as well",function(){
      assert._equal("olleh  dlrow",reverseWords,"hello  world");
      assert._equal("sey  on  no",reverseWords,"yes  no  on");
      assert._equal("sey  on  no",reverseWords,"yes  no  on");
    });

    it("should preserve leading spaces",function(){
      assert._equal(" olleh",reverseWords," hello");
      assert._equal("  olleh",reverseWords,"  hello");
      assert._equal("  olleh olleh",reverseWords,"  hello hello");
    });

    it("should preserve trailing spaces",function(){
      assert._equal("olleh ",reverseWords,"hello ");
      assert._equal("olleh  ",reverseWords,"hello  ");
      assert._equal("olleh olleh  ",reverseWords,"hello hello  ");
    });

    it("should preserve leading and trailing spaces",function(){
      assert._equal(" olleh ",reverseWords," hello ");
      assert._equal("  olleh ",reverseWords,"  hello ");
      assert._equal(" olleh  ",reverseWords," hello  ");
      assert._equal(" olleh  ",reverseWords," hello  ");
      assert._equal(" olleh olleh  ",reverseWords," hello hello  ");
    });

    it("should reverse words that consist of characters other than alphabets",function(){
      assert._equal("321 654",reverseWords,"123 456");
      assert._equal("+-- -++",reverseWords,"--+ ++-");
      assert._equal("+ab ab+",reverseWords,"ba+ +ba");
      assert._equal("+ --+-- +",reverseWords,"+ --+-- +");
    });

    it("should reverse just the word if only a single word is given as text",function(){
      assert._equal("olleh",reverseWords,"hello");
    });

    it("should return an empty string if an empty string is provided",function(){
      assert._equal("",reverseWords,"");
    });

    it("should return the original string if the original string is just a character",function(){
      assert._equal("a",reverseWords,"a");
      assert._equal("1",reverseWords,"1");
      assert._equal(".",reverseWords,".");
    });
  });

  describe("interleave",function(){
    before(skipIfNotPresent(interleave));

    it("should not use inappropriate in-built functions",function(){
      let text="abc";
      text=clobberSplit(text);
      interleave(text,",");
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should interleave a given string between every character in the text",function(){
      assert._equal("a,b,c",interleave,"abc",",");
      assert._equal("1-2",interleave,"12","-");
      assert._equal("1-2-3-4",interleave,"1234","-");
    });

    it("should return an empty string when an empty string is provided as text",function(){
      assert._equal("",interleave,"",",");
      assert._equal("",interleave,""," ");
      assert._equal("",interleave,""," + ");
    });

    it("should return the original string when the separator is empty",function(){
      assert._equal("h",interleave,"h","");
      assert._equal("he",interleave,"he","");
      assert._equal("hello",interleave,"hello","");
      assert._equal("    ",interleave,"    ","");
    });

    it("should interleave when the separator consists of more than one characters",function(){
      assert._equal("a, b, c",interleave,"abc",", ");
      assert._equal(" ++a++b++c",interleave," abc","++");
      assert._equal("a, b, c",interleave,"abc",", ");
    });

    it("should not add the separator when the given text consists of just a single character",function(){
      assert._equal("a",interleave,"a",",");
      assert._equal("a",interleave,"a",", ");
      assert._equal(" ",interleave," ","  ");
    });

    it("should interleave characters in the event of leading spaces",function(){
      assert._equal(" ,1,2",interleave," 12",",");
      assert._equal(" , ,1,2",interleave,"  12",",");
    });

    it("should interleave characters in the event of trailing spaces",function(){
      assert._equal("1,2, ",interleave,"12 ",",");
      assert._equal("1,2, , ",interleave,"12  ",",");
    });
  });

  describe("wordFrequency",function(){
    before(skipIfNotPresent(wordFrequency));

    it("should count the number of times a word occurs in the given text",function(){
      assert._equal(1,wordFrequency,"hello world","hello");
      assert._equal(1,wordFrequency,"hello world","world");
      assert._equal(2,wordFrequency,"hello hello","hello");
      assert._equal(3,wordFrequency,"hello hello hello","hello");
    });

    it("should count the number of times a word occurs when there are leading spaces",function(){
      assert._equal(1,wordFrequency," hello world","hello");
      assert._equal(2,wordFrequency," hello hello","hello");
    });

    it("should count the number of times a word occurs when there are trailing spaces",function(){
      assert._equal(1,wordFrequency,"hello world ","world");
      assert._equal(2,wordFrequency,"hello hello ","hello");
    });

    it("should count the number of words when there is more than one space separating the words",function(){
      assert._equal(1,wordFrequency,"hello  world","hello");
      assert._equal(1,wordFrequency,"hello  world","world");
      assert._equal(2,wordFrequency,"hello  hello","hello");
      assert._equal(2,wordFrequency,"world  hello  world","world");
    });

    it("should not count a word whose case does not match",function(){
      assert._equal(0,wordFrequency,"hello world","HELLO");
      assert._equal(0,wordFrequency,"hello world","Hello");
      assert._equal(0,wordFrequency,"Hello world","hello");
      assert._equal(0,wordFrequency,"HELLO world","hello");
    });

    it("should not count a word that doesn't exist in the given text",function(){
      assert._equal(0,wordFrequency,"hello world","god");
      assert._equal(0,wordFrequency,"hello world","hellooo");
      assert._equal(0,wordFrequency,"hello world","worldddd");
      assert._equal(0,wordFrequency,"hello world","123456");
    });

    it("should return 0 when the given text is empty",function(){
      assert._equal(0,wordFrequency,"","whatever");
      assert._equal(0,wordFrequency,"","something");
      assert._equal(0,wordFrequency,"","12345");
      assert._equal(0,wordFrequency,""," ");
    });

    it("should return 0 when the given word is empty",function(){
      assert._equal(0,wordFrequency,"hello world","");
      assert._equal(0,wordFrequency,"whatever","");
    });

    it("should match a single word if the text contains only a single word",function(){
      assert._equal(1,wordFrequency,"hello","hello");
      assert._equal(1,wordFrequency," hello","hello");
      assert._equal(1,wordFrequency,"hello ","hello");
    });

    it("should not match partial words",function(){
      assert._equal(0,wordFrequency,"hello","he");
      assert._equal(0,wordFrequency,"hello hell hel she","he");
    });

    it("should treat non-alphabetic characters as words",function(){
      assert._equal(1,wordFrequency,"123","123");
      assert._equal(2,wordFrequency,"123 123","123");
      assert._equal(2,wordFrequency,"123  123","123");
      assert._equal(1,wordFrequency,"123+-_  123","123");
    });

    it("should treat single characters as words",function(){
      assert._equal(1,wordFrequency,"a b","a");
      assert._equal(1,wordFrequency,"a b","b");
      assert._equal(2,wordFrequency,"a b a","a");
      assert._equal(2,wordFrequency,"a b a b","b");
      assert._equal(2,wordFrequency,"a bcd a def","a");
    });
  });

  describe("strikeOut",function(){
    before(skipIfNotPresent(strikeOut));

    it("should not use inappropriate in-built functions",function(){
      let text="madam";
      text=clobberSplit(text);
      strikeOut(text,"a");
      assert._equal(0,splitRefCount);
      restoreSplit(text);
    });

    it("should strike out all occurrences of a given letter in the given text",function(){
      assert._equal("he--o",strikeOut,"hello","l");
      assert._equal("-ello",strikeOut,"hello","h");
      assert._equal("hell-",strikeOut,"hello","o");
      assert._equal("-----",strikeOut,"hhhhh","h");
    });

    it("should return the original word if the given letter is not included in the word",function(){
      assert._equal("a",strikeOut,"a","z");
      assert._equal("hello",strikeOut,"hello","z");
      assert._equal("hel lo",strikeOut,"hel lo","z");
    });

    it("should return the original word if the given letter is empty",function(){
      assert._equal("hello",strikeOut,"hello","");
      assert._equal("hello world",strikeOut,"hello world","");
    });

    it("should return an empty string if the original text is empty",function(){
      assert._equal("",strikeOut,"","a");
    });

    it("should return an empty string when both the original text and the letter is empty",function(){
      assert._equal("",strikeOut,"","");
    });

    it("should use only the first letter if option provided as letters has more than one word",function(){
      assert._equal("he--o",strikeOut,"hello","london")
    });

    it("should strike out when there are multiple spaces in the given string",function(){
      assert._equal("hell-  w-rld",strikeOut,"hello  world","o");
      assert._equal("  hell- w-rld",strikeOut,"  hello world","o");
      assert._equal("hell- w-rld  ",strikeOut,"hello world  ","o");
    });

    it("should strike out spaces if given letter is space",function(){
      assert._equal("hello--world",strikeOut,"hello  world"," ");
      assert._equal("--hello-world",strikeOut,"  hello world"," ");
      assert._equal("hello-world--",strikeOut,"hello world  "," ");
      assert._equal("hello-world--",strikeOut,"hello world  ","  ");
    });

    it("should strike out non-alphabetic characters",function(){
      assert._equal("123+_^&--$%$rld",strikeOut,"123+_^&  $%$rld"," ");
      assert._equal("--123+_^&-world",strikeOut,"  123+_^& world"," ");
      assert._equal("123+_^&-world--",strikeOut,"123+_^& world  "," ");
      assert._equal("123+_^&-world--",strikeOut,"123+_^& world  ","  ");
      assert._equal("1-3+_^& world  ",strikeOut,"123+_^& world  ","2");
    });

    it("should strike out '-' when '-' is the given letter",function(){
      assert._equal(" -",strikeOut," -","-");
      assert._equal("----",strikeOut,"----","-");
      assert._equal("   -",strikeOut,"   -","-");
      assert._equal("   -",strikeOut,"   -","---");
      assert._equal(" - ",strikeOut," - ","-");
    });
  });
});
