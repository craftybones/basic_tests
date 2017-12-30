const isOdd=function(num) {return num%2!=0}
const isEven=function(num) {return num%2==0}
const add=function(a,b){return a+b}

/*
  selectOdd
  This function selects all the odd numbers from a given list of numbers
*/

const selectOdd=function(list) {
  return list.filter(isOdd);
}

/*
  selectEven
  This function selects all the even numbers from a given list of numbers
*/

const selectEven=function(list) {
  return list.filter(isEven);
}

/*
  sumUp
  This function sums up all the numbers of a given list
*/

const sumUp=function(list) {
  return list.reduce(add,0);
}

/*
  reverseList
  This function reverses the elements of a given list and provides a new list
*/

const reverseList=function(list) {
  return list.reduce(function(l,e){
    l.unshift(e);
    return l;
  },[]);
}

/*
  reverseFibo
  This function provides the first n terms of a fibonacci series in reverse order
  This function accepts a single number, n as its only argument.
*/

const reverseFibo=function(n) {
  let newList=[];
  let s1=0;
  let s2=1;
  for (var i = 0; i < n; i++) {
    newList.unshift(s1);
    let s3=s1+s2;
    s1=s2;
    s2=s3;
  }
  return newList;
}

const greatestOfTwo=function(a,b) {
  return a>b?a:b;
}

const leastOfTwo=function(a,b) {
  return a<b?a:b;
}

/*
  greatestInList
  This function provides the greatest number in a list, given a list of numbers
*/

const greatestInList=function(list) {
  return list.reduce(greatestOfTwo,undefined);
}

/*
  leastInList
  This function provides the lowest number in a list, given a list of numbers
*/

const leastInList=function(list) {
  return list.reduce(leastOfTwo,undefined);
}

/*
  mapLengths
  This function provides a list of lengths corresponding to the list of strings
  given as an argument
*/

const mapLengths=function(list) {
  return list.map(function(s){return s.length});
}

/*
  isAscendingOrder
  This function checks if a given list is in ascending order or not
*/

const isAscendingOrder=function(list) {
  index=0;
  while (index<list.length-1) {
    if(list[index]>list[index+1])
      return false;
    index++;
  }
  return true;
}

/*
  isDescendingOrder
  This function checks if a given list is in descending order or not
*/

const isDescendingOrder=function(list) {
  index=0;
  while (index<list.length-1) {
    if(list[index]<list[index+1])
      return false;
    index++;
  }
  return true;
}

/*
  extractDigits
  This function extracts the digits of a given number and returns a list of digits
*/

const extractDigits=function(number) {
  if(number==0)
    return [0];
  let list=[]
  absNumber=Math.abs(number);
  while(absNumber>0) {
    list.unshift(absNumber%10);
    absNumber=(Math.floor(absNumber/10)*10)/10;
  }
  if(number<0)
    list.unshift("-");
  return list;
}

/*
  countBelowThreshold
  This function provides the count of numbers below given threshold
*/

const countBelowThreshold=function(list,threshold) {
  let newList=[];

  newList = list.filter(function(num) {
    return num<threshold;
  });

  return newList.length;
}

/*
  countAboveThreshold
  This function provides the count of numbers above given threshold
*/

const countAboveThreshold=function(list,threshold) {
  let newList=[];

  newList = list.filter(function(num) {
    return num>threshold;
  });

  return newList.length;
}

exports.selectOdd=selectOdd;
exports.selectEven=selectEven;
exports.sumUp=sumUp;
exports.reverseList=reverseList;
exports.reverseFibo=reverseFibo;
exports.greatestInList=greatestInList;
exports.leastInList=leastInList;
exports.mapLengths=mapLengths;
exports.isAscendingOrder=isAscendingOrder;
exports.isDescendingOrder=isDescendingOrder;
exports.extractDigits=extractDigits;
exports.countBelowThreshold=countBelowThreshold;
exports.countAboveThreshold=countAboveThreshold;
