const reverse=require('./stringsBasic.js').reverse;
/*
  strip
  This function removes leading and trailing spaces of the given text
  strip(" hello") => "hello" (the front space is removed)
  strip("hello ") => "hello" (the last space is removed)
  strip(" hello ") => "hello" (both spaces are removed)
  strip("  hello ") => "hello" (both spaces are removed)
  strip("hello") => "hello" (no spaces removed)
*/

const strip=function(text) {
  return text.replace(/^\s+/,"").replace(/\s+$/,"");
}

/*
  camelCase
  This function takes a list of words and turns them into a single camelCased
  word. camelCasing involves a single identifier consisting of words concatenated
  together where all words apart from the first are capitalised.
  camelCase(["camel","case"]) => "camelCase"
*/

const capitalize=function(text) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

const isNotEmpty=function(string) {
  return string!="";
}

const trim=function(string) {
  return string.trim();
}

const camelCase=function(listOfWords) {
  let nonEmptyWords=listOfWords.filter(isNotEmpty).map(trim);
  if(nonEmptyWords.length==0)
    return "";

  let firstWord=nonEmptyWords[0].toLowerCase();
  let restOfWords=nonEmptyWords.slice(1).map(capitalize);
  let allWords=[firstWord].concat(restOfWords);

  return allWords.join("");
}

/*
  uniqueLetterCount
  this function counts the number of unique occurrences of letters in a text
  The function only counts alphabets in the English language. It also treats
  both cases as the same. Pop contains 2 letters for instance, p and o.
  uniqueLetterCount("hello") => 4
  uniqueLetterCount("heLlo") => 4
  uniqueLetterCount("HeLo") => 4
  uniqueLetterCount("a,b,c") => 3
*/
const uniqueLetterCount=function(text) {
  let letters={};
  for (var i = 0; i < text.length; i++) {
    if(text[i].match(/[a-z]/i))
      letters[text[i].toUpperCase()]=true;
  }
  return Object.keys(letters).length;
}


/*
  reverseWordOrder
  This function reverses the order of space separated words in a string.
  Assume that all words are separated by spaces. Also, preserve the number of
  spaces between words. Words can also consist of characters that are not from
  the English alphabet.

  reverseWordOrder("This is my name") => "name my is This";
  reverseWordOrder("This   is my name") => "name my is   This";
  reverseWordOrder("Hello") => "Hello";

  Leading and trailing spaces will be reversed too as folows:

  reverseWordOrder(" hello") => "hello "
  reverseWordOrder("hello ") => " hello"

  Non Alphabetic characters
  reverseWordOrder("hello 123 +-&*") => "+-&* 123 hello"
*/

const reverseWordOrder=function(text) {
  return text.split(" ").reverse().join(" ");
}

/*
  reverseWords
  This function reverses each word but preserves the order in which they occur
  Assume that all words are separated by spaces. Also, preserve the number of
  spaces between words. Words can consist of characters other than letters in the
  English alphabet. &,*,(,) etc are all valid characters that can constitute a word.

  reverseWords("hello world") => "olleh dlrow";
  reverseWords("this is it") => "siht si ti";
  reverseWords("+-- --+") => "--+ +--"
  reverseWords(" hello  world " => " olleh  dlrow ")
*/

const reverseWords=function(text) {
  return text.split(" ").map(reverse).join(" ");
}

/*
  interleave
  This function inserts a given string between every character in the text. The
  given string should be alternated and should not appear before the first character
  or after the last character.

  interleave("abc", ",") => "a,b,c"
  interleave("abc", ", ") => "a, b, c"
  interleave("12345", "-") => "1-2-3-4-5"
  interleave("1234", "e&a") => "1e&a2e&a3e&a4"
  interleave("", "x") => ""
  interleave(" 123", ",") => " ,1,2,3"
*/

const interleave=function(text,separator) {
  let actualSeparator="";
  let interleaved="";
  for (var i = 0; i < text.length; i++) {
    interleaved=interleaved + actualSeparator + text[i];
    actualSeparator=separator;
  }
  return interleaved;
}

/*
  wordFrequency
  This function counts the number of times a word occurs in a given text.
  A word is any set of characters bounded by space. It is case sensitive.
  Partial matches are not allowed.

  wordFrequency("hello world","hello") => 1
  wordFrequency("hello world","world") => 1
  wordFrequency("hello hello","hello") => 2
  wordFrequency("hello Hello","Hello") => 1
  wordFrequency("hellohello Hello","hello") => 0

*/

const isEqualToWordGen=function(word) {
  return function(anotherWord) {
    return anotherWord==word;
  }
}

const wordFrequency=function(text,word) {
  var isEqualToWord=isEqualToWordGen(word);
  return text.split(/\s+/).filter(isEqualToWord).length;
}

/*
  strikeOut
  This function strikes out all the occurrences of a given letter in the given text.
  Striking out involves replacing the occurrence of a letter with the character '-'.

  strikeOut("hello fellow","l") => "he--o fe--ow";
  strikeOut("hello","o") => "hell-";
  strikeOut("hello","h") => "-ello";
  strikeOut("hello","a") => "hello";
  strikeOut("hello","") => "hello";
  strikeOut("","a") => "";
  strikeOut("","") => "";

  when the letter you want struck out is passed as a word with multiple letters, then only
  the first one is used.
  strikeOut("hello","hello") => "-ello";
*/

const strikeOut=function(text,letter) {
  if(letter.length==0 || text.length==0)
    return text;
  let r=new RegExp(letter[0],'g');
  return text.replace(r,"-");
}

exports.strip=strip;
exports.camelCase=camelCase;
exports.uniqueLetterCount=uniqueLetterCount;
exports.reverseWordOrder=reverseWordOrder;
exports.reverseWords=reverseWords;
exports.interleave=interleave;
exports.wordFrequency=wordFrequency;
exports.strikeOut=strikeOut;
