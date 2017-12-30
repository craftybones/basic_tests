require('./globalRequires.js');
const assert=require('./wrappedAssert.js');

const clobberMap=require('./clobberArrayOperations.js').clobberMap;
const restoreMap=require('./clobberArrayOperations.js').restoreMap;
const mapRefCount=require('./clobberArrayOperations.js').mapRefCount;

const clobberFilter=require('./clobberArrayOperations.js').clobberFilter;
const restoreFilter=require('./clobberArrayOperations.js').restoreFilter;
const filterRefCount=require('./clobberArrayOperations.js').filterRefCount;

const clobberReduce=require('./clobberArrayOperations.js').clobberReduce;
const restoreReduce=require('./clobberArrayOperations.js').restoreReduce;
const reduceRefCount=require('./clobberArrayOperations.js').reduceRefCount;

const clobberReverse=require('./clobberArrayOperations.js').clobberReverse;
const restoreReverse=require('./clobberArrayOperations.js').restoreReverse;
const reverseRefCount=require('./clobberArrayOperations.js').reverseRefCount;

let selectOdd;
let selectEven;
let sumUp;
let reverseList;
let reverseFibo;
let greatestInList;
let leastInList;
let mapLengths;
let extractDigits;
let isAscendingOrder;
let isDescendingOrder;
let countBelowThreshold;
let countAboveThreshold;
let errorInLoadingModule;

try {
  selectOdd=require('../src/arrayIterations.js').selectOdd;
  selectEven=require('../src/arrayIterations.js').selectEven;
  sumUp=require('../src/arrayIterations.js').sumUp;
  reverseList=require('../src/arrayIterations.js').reverseList;
  reverseFibo=require('../src/arrayIterations.js').reverseFibo;
  greatestInList=require('../src/arrayIterations.js').greatestInList;
  leastInList=require('../src/arrayIterations.js').leastInList;
  mapLengths=require('../src/arrayIterations.js').mapLengths;
  extractDigits=require('../src/arrayIterations.js').extractDigits;
  isAscendingOrder=require('../src/arrayIterations.js').isAscendingOrder;
  isDescendingOrder=require('../src/arrayIterations.js').isDescendingOrder;
  countBelowThreshold=require('../src/arrayIterations.js').countBelowThreshold;
  countAboveThreshold=require('../src/arrayIterations.js').countAboveThreshold;
} catch (e) {
  errorInLoadingModule=e;
}

const skipIfNotPresent=require('./skipIfNotPresent.js');

describe("arrayIterations.js",function(){
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


describe("arrayIterations",function(){
  describe("selectOdd",function(){
    before(skipIfNotPresent(selectOdd));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      selectOdd(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberFilter(list);
      selectOdd(list);
      assert._equal(1,filterRefCount);
      restoreFilter(list);
    });

    it("should select only odd numbers from a list",function(){
      assert._deepEqual([1,3],selectOdd,[1,2,3,4,5]);
      assert._deepEqual([1],selectOdd,[1,2]);
      assert._deepEqual([3],selectOdd,[2,3,4]);
      assert._deepEqual([3],selectOdd,[2,3]);
      assert._deepEqual([20001],selectOdd,[20001,3000]);
    });

    it("should return an empty list when an empty list is provided",function(){
      assert._deepEqual([],selectOdd,[]);
    });

    it("should return an empty list when list consists of no odd numbers",function(){
      assert._deepEqual([],selectOdd,[0,2,4]);
      assert._deepEqual([],selectOdd,[0]);
    });

    it("should return an empty list when list consists only of negative even numbers",function(){
      assert._deepEqual([],selectOdd,[-2,-4]);
      assert._deepEqual([],selectOdd,[-2]);
    });

    it("should select negative odd numbers",function(){
      assert._deepEqual([-11],selectOdd,[-11]);
      assert._deepEqual([-11],selectOdd,[-11,-2]);
      assert._deepEqual([-11,1],selectOdd,[-11,1]);
      assert._deepEqual([-11,1],selectOdd,[-11,1,-2]);
    });

    it("should select all instances of the same odd number in an array",function(){
      assert._deepEqual([-3,-3],selectOdd,[-3,0,-3]);
      assert._deepEqual([-3,1,-3],selectOdd,[-3,1,-3]);
      assert._deepEqual([-3,1,1],selectOdd,[-3,1,1]);
      assert._deepEqual([1,1],selectOdd,[2,1,1]);
    });
  });

  describe("selectEven",function(){
    before(skipIfNotPresent(selectEven));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      selectEven(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberFilter(list);
      selectEven(list);
      assert._equal(1,filterRefCount);
      restoreFilter(list);
    });

    it("should select only even numbers from a list",function(){
      assert._deepEqual([2,4],selectEven,[1,2,3,4]);
      assert._deepEqual([2],selectEven,[1,2]);
      assert._deepEqual([2],selectEven,[1,2,3]);
      assert._deepEqual([2],selectEven,[2,3]);
      assert._deepEqual([3000],selectEven,[20001,3000]);
    });

    it("should return an empty list when an empty list is provided",function(){
      assert._deepEqual([],selectEven,[]);
    });

    it("should return an empty list when list consists of no even numbers",function(){
      assert._deepEqual([],selectEven,[1,3,5]);
      assert._deepEqual([],selectEven,[1]);
    });

    it("should return an empty list when list consists only of negative odd numbers",function(){
      assert._deepEqual([],selectEven,[-1,-3]);
      assert._deepEqual([],selectEven,[-1]);
    });

    it("should select negative even numbers",function(){
      assert._deepEqual([-2],selectEven,[-2]);
      assert._deepEqual([-22],selectEven,[-22,-1]);
      assert._deepEqual([-22,-4],selectEven,[-22,-4]);
      assert._deepEqual([-22,-4],selectEven,[-22,1,-4]);
    });

    it("should select all instances of the same even number in a list",function(){
      assert._deepEqual([-6,-6],selectEven,[-6,1,-6]);
      assert._deepEqual([-6,2,-6],selectEven,[-6,2,-6]);
      assert._deepEqual([-6,2,2],selectEven,[-6,2,2]);
      assert._deepEqual([2,2],selectEven,[1,2,2]);
    });
  });

  describe("sum of numbers",function(){
    before(skipIfNotPresent(sumUp));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      sumUp(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberReduce(list);
      sumUp(list);
      assert._equal(1,reduceRefCount);
      restoreReduce(list);
    });

    it("should return the only element as the sum in a list of length 1",function(){
      assert._equal(10,sumUp,[10]);
      assert._equal(1,sumUp,[1]);
      assert._equal(-10,sumUp,[-10]);
    });

    it("should sum up the numbers of a given list",function(){
      assert._equal(10,sumUp,[1,2,3,4]);
      assert._equal(3,sumUp,[1,2]);
    });

    it("should sum up the numbers of a given list with negative numbers",function(){
      assert._equal(-10,sumUp,[-1,-2,-3,-4]);
      assert._equal(3,sumUp,[1,2]);
    });

    it("should sum up the numbers of a given list with both positive and negative numbers",function(){
      assert._equal(1,sumUp,[-1,2]);
      assert._equal(-1,sumUp,[-2,1]);
    });

    it("should return 0 as the sum of an empty list",function(){
      assert._equal(0,sumUp,[]);
    });
  });

  describe("reverse a list",function(){
    before(skipIfNotPresent(reverseList));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      reverseList(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should not use inappropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberReverse(list);
      reverseList(list);
      assert._equal(0,reverseRefCount);
      restoreReverse(list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberReduce(list);
      reverseList(list);
      assert._equal(1,reduceRefCount);
      restoreReduce(list);
    });

    it("should reverse a given list",function(){
      assert._deepEqual([3,2,1],reverseList,[1,2,3]);
      assert._deepEqual([2,1],reverseList,[1,2]);
      assert._deepEqual([1],reverseList,[1]);
    });

    it("should return an empty list when given an empty list",function(){
      assert._deepEqual([],reverseList,[]);
    });
  });

  describe("reverse fibonacci",function(){
    before(skipIfNotPresent(reverseFibo));

    it("should not use inappropriate in-built functions",function(){
      // Roundabout way to test if someone is using reverse
      let actualRev=Array.prototype.reverse;
      clobberReverse(Array.prototype);

      reverseFibo(5);

      let count=reverseRefCount();
      Array.prototype.reverse=actualRev;
      restoreReverse(Array.prototype);

      assert.equal(0,count);
    });

    it("should provide the reversed fibonacci series",function(){
      assert._deepEqual([0],reverseFibo,1);
      assert._deepEqual([1,1,0],reverseFibo,3);
      assert._deepEqual([3,2,1,1,0],reverseFibo,5);
    });

    it("should return an empty list when the term requested is zero or lesser",function(){
      assert._deepEqual([],reverseFibo,0);
      assert._deepEqual([],reverseFibo,-1);
    });
  });

  describe("greatestInList",function(){
    before(skipIfNotPresent(greatestInList));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      greatestInList(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberReduce(list);
      greatestInList(list);
      assert._equal(1,reduceRefCount);
      restoreReduce(list);
    });

    it("should find the greatest in a given list of numbers",function(){
      assert._equal(100,greatestInList,[1,10,100]);
      assert._equal(100,greatestInList,[1,100,10]);
      assert._equal(100,greatestInList,[10,1,100]);
      assert._equal(100,greatestInList,[10,100,1]);
      assert._equal(100,greatestInList,[100,10,1]);
      assert._equal(100,greatestInList,[100,1,10]);
    });

    it("should find the greatest in a given list when the list has only one element",function(){
      assert._equal(1,greatestInList,[1]);
      assert._equal(0,greatestInList,[0]);
      assert._equal(-1,greatestInList,[-1]);
    });

    it("should find the greatest in a given list when the list has duplicate elements",function(){
      assert._equal(2,greatestInList,[1,2,1]);
      assert._equal(100,greatestInList,[0,100,100]);
      assert._equal(-1,greatestInList,[-3,-1,-3]);
      assert._equal(-3,greatestInList,[-3,-3]);
      assert._equal(-1,greatestInList,[-3,-1,-3,-1]);
    });

    it("should return undefined when the list is empty",function(){
      assert._equal(undefined,greatestInList,[]);
    });
  });

  describe("leastInList",function(){
    before(skipIfNotPresent(leastInList));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      leastInList(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberReduce(list);
      leastInList(list);
      assert._equal(1,reduceRefCount);
      restoreReduce(list);
    });

    it("should find the lowest number in a given list of numbers",function(){
      assert._equal(1,leastInList,[1,10,100]);
      assert._equal(1,leastInList,[1,100,10]);
      assert._equal(1,leastInList,[10,1,100]);
      assert._equal(1,leastInList,[10,100,1]);
      assert._equal(1,leastInList,[100,10,1]);
      assert._equal(1,leastInList,[100,1,10]);
    });

    it("should find the lowest number in a given list when the list has only one element",function(){
      assert._equal(1,leastInList,[1]);
      assert._equal(0,leastInList,[0]);
      assert._equal(-1,leastInList,[-1]);
    });
    //
    it("should find the lowest number in a given list when the list has duplicate elements",function(){
      assert._equal(1,leastInList,[1,2,1]);
      assert._equal(0,leastInList,[0,100,100]);
      assert._equal(-3,leastInList,[-3,-1,-3]);
      assert._equal(-3,leastInList,[-3,-3]);
      assert._equal(-3,leastInList,[-3,-1,-3,-1]);
    });

    it("should return undefined when the list is empty",function(){
      assert._equal(undefined,leastInList,[]);
    });
  });

  describe("mapping lengths",function(){
    before(skipIfNotPresent(mapLengths));

    it("should not modify the original list",function(){
      let list=["abc","def","ghi"];
      mapLengths(list);
      assert.deepEqual(["abc","def","ghi"],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=["abc","def","ghi"];
      list=clobberMap(list);
      mapLengths(list);
      assert._equal(1,mapRefCount);
      restoreMap(list);
    });

    it("should return a list of lengths given a list of strings",function(){
      assert._deepEqual([1,2,3],mapLengths,["i","am","bad"]);
      assert._deepEqual([4,3,1,6,4],mapLengths,["mary","had","a","little","lamb"]);
    });

    it("should return length as 0 when list contains strings of length 0",function(){
      assert._deepEqual([0],mapLengths,[""]);
      assert._deepEqual([0,0],mapLengths,["",""]);
      assert._deepEqual([0,0,0],mapLengths,["","",""]);
    });

    it("should return an empty list when an empty list is given as an argument",function(){
      assert._deepEqual([],mapLengths,[]);
    });
  });

  describe("ascending order",function(){
    before(skipIfNotPresent(isAscendingOrder));

    it("should return true for lists that contain elements in strict ascending order",function(){
      assert._equal(true,isAscendingOrder,[1,2,3]);
      assert._equal(true,isAscendingOrder,[-1,0,1]);
      assert._equal(true,isAscendingOrder,[100,200,300]);
    });

    it("should return true for lists that contain consecutive equal elements",function(){
      assert._equal(true,isAscendingOrder,[1,1,2]);
      assert._equal(true,isAscendingOrder,[1,2,2]);
      assert._equal(true,isAscendingOrder,[1,1,2,2]);
    });

    it("should return true for lists that contain only one element",function(){
      assert._equal(true,isAscendingOrder,[1]);
      assert._equal(true,isAscendingOrder,[-1]);
      assert._equal(true,isAscendingOrder,[100]);
    });

    it("should return false for lists that contain elements in strict descending order",function(){
      assert._equal(false,isAscendingOrder,[3,2,1]);
      assert._equal(false,isAscendingOrder,[1,0,-1]);
      assert._equal(false,isAscendingOrder,[300,200,100]);
    });

    it("should return false for lists that contain elements in non-strict descending order",function(){
      assert._equal(false,isAscendingOrder,[1,2,1]);
      assert._equal(false,isAscendingOrder,[10,10,9]);
      assert._equal(false,isAscendingOrder,[300,100,400]);
    });

    it("should return true for an empty list",function(){
      assert._equal(true,isAscendingOrder,[]);
    });
  });

  describe("descending order",function(){
    before(skipIfNotPresent(isDescendingOrder));

    it("should return true for lists that contain elements in strict descending order",function(){
      assert._equal(true,isDescendingOrder,[3,2,1]);
      assert._equal(true,isDescendingOrder,[1,0,-1]);
      assert._equal(true,isDescendingOrder,[300,200,100]);
    });

    it("should return true for lists that contain consecutive equal elements",function(){
      assert._equal(true,isDescendingOrder,[2,1,1]);
      assert._equal(true,isDescendingOrder,[2,2,1]);
      assert._equal(true,isDescendingOrder,[2,2,1,1]);
    });

    it("should return true for lists that contain only one element",function(){
      assert._equal(true,isDescendingOrder,[1]);
      assert._equal(true,isDescendingOrder,[-1]);
      assert._equal(true,isDescendingOrder,[100]);
    });

    it("should return false for lists that contain elements in strict ascending order",function(){
      assert._equal(false,isDescendingOrder,[1,2,3]);
      assert._equal(false,isDescendingOrder,[-1,0,1]);
      assert._equal(false,isDescendingOrder,[100,200,300]);
    });

    it("should return false for lists that contain elements in non-strict descending order",function(){
      assert._equal(false,isDescendingOrder,[2,1,2]);
      assert._equal(false,isDescendingOrder,[9,10,10]);
      assert._equal(false,isDescendingOrder,[200,300,100]);
    });

    it("should return true for an empty list",function(){
      assert._equal(true,isAscendingOrder,[]);
    });
  });

  describe("extract digits",function(){
    before(skipIfNotPresent(extractDigits));

    it("should extract the digits of a given positive number",function(){
      assert._deepEqual([1],extractDigits,1);
      assert._deepEqual([1,0],extractDigits,10);
      assert._deepEqual([1,3],extractDigits,13);
      assert._deepEqual([1,5],extractDigits,15);
      assert._deepEqual([1,9],extractDigits,19);
      assert._deepEqual([1,0,0],extractDigits,100);
      assert._deepEqual([1,0,1],extractDigits,101);
      assert._deepEqual([1,0,1],extractDigits,101);
      assert._deepEqual([9,9,9],extractDigits,999);
      assert._deepEqual([2,0,3,4,5],extractDigits,20345);
    });

    it("should extract 0",function(){
      assert._deepEqual([0],extractDigits,0);
    });

    it("should extract the digits of a given negative number, including the sign",function(){
      assert._deepEqual(["-",1],extractDigits,-1);
      assert._deepEqual(["-",1,0],extractDigits,-10);
      assert._deepEqual(["-",1,3],extractDigits,-13);
      assert._deepEqual(["-",1,5],extractDigits,-15);
      assert._deepEqual(["-",1,9],extractDigits,-19);
      assert._deepEqual(["-",1,0,0],extractDigits,-100);
      assert._deepEqual(["-",1,0,1],extractDigits,-101);
      assert._deepEqual(["-",1,0,1],extractDigits,-101);
      assert._deepEqual(["-",9,9,9],extractDigits,-999);
      assert._deepEqual(["-",2,0,3,4,5],extractDigits,-20345);
    });
  });

  describe("countBelowThreshold",function(){
    before(skipIfNotPresent(countBelowThreshold));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      countBelowThreshold(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberFilter(list);
      countBelowThreshold(list);
      assert._equal(1,filterRefCount);
      restoreFilter(list);
    });

    it("should provide count of numbers below certain threshold",function(){
      assert._equal(1,countBelowThreshold,[1,4],2);
      assert._equal(2,countBelowThreshold,[1,5,7,2],4);
      assert._equal(2,countBelowThreshold,[10,40,55,33,20],22);
    });

    it("should provide count of numbers below certain threshold for negative numbers",function(){
      assert._equal(2,countBelowThreshold,[-1,-4],0);
      assert._equal(3,countBelowThreshold,[-1,5,-7,2],4);
      assert._equal(4,countBelowThreshold,[10,-40,55,-33,-20],22);
    });

    it("should return 0 for empty list",function(){
      assert._equal(0,countBelowThreshold,[],2);
    });

    it("should return 0 if there is no number below threshold",function(){
      assert._equal(0,countBelowThreshold,[3,5,7],2);
      assert._equal(0,countBelowThreshold,[3,7,5],2);
      assert._equal(0,countBelowThreshold,[5,3,7],2);
      assert._equal(0,countBelowThreshold,[5,7,3],2);
      assert._equal(0,countBelowThreshold,[7,5,3],2);
      assert._equal(0,countBelowThreshold,[7,3,5],2);
    });

    it("should count all occurrences of duplicate numbers below threshold",function(){
      assert._equal(2,countBelowThreshold,[3,3,7],4);
      assert._equal(2,countBelowThreshold,[-7,3,5,5,-7],2);
    });

    it("should not count numbers that are equal to the threshold",function(){
      assert._equal(1,countBelowThreshold,[3,4],4);
      assert._equal(2,countBelowThreshold,[3,1,4],4);
    });
  });

  describe("countAboveThreshold",function(){
    before(skipIfNotPresent(countAboveThreshold));

    it("should not modify the original list",function(){
      let list=[1,2,3,4];
      countAboveThreshold(list);
      assert.deepEqual([1,2,3,4],list);
    });

    it("should use appropriate in-built functions",function(){
      let list=[1,2,3,4];
      list=clobberFilter(list);
      countAboveThreshold(list);
      assert._equal(1,filterRefCount);
      restoreFilter(list);
    });

    it("should provide count of numbers above a certain threshold",function(){
      assert._equal(1,countAboveThreshold,[1,4],2);
      assert._equal(2,countAboveThreshold,[1,5,7,2],4);
      assert._equal(3,countAboveThreshold,[10,40,55,33,20],20);
    });

    it("should provide count of numbers above certain threshold for negative numbers",function(){
      assert._equal(2,countAboveThreshold,[-1,-4],-5);
      assert._equal(3,countAboveThreshold,[-1,5,-7,2],-4);
      assert._equal(4,countAboveThreshold,[10,-40,55,-13,-20],-22);
    });

    it("should return 0 for empty list",function(){
      assert._equal(0,countAboveThreshold,[],2);
    });

    it("should return 0 if there is no number above threshold",function(){
      assert._equal(0,countAboveThreshold,[3,5,7],20);
      assert._equal(0,countAboveThreshold,[3,7,5],20);
      assert._equal(0,countAboveThreshold,[5,3,7],20);
      assert._equal(0,countAboveThreshold,[5,7,3],20);
      assert._equal(0,countAboveThreshold,[7,5,3],20);
      assert._equal(0,countAboveThreshold,[7,3,5],20);
    });

    it("should count all occurrences of duplicate numbers above threshold",function(){
      assert._equal(2,countAboveThreshold,[3,7,7],3);
      assert._equal(2,countAboveThreshold,[-7,3,5,5,-7],3);
    });

    it("should not count numbers that are equal to the threshold",function(){
      assert._equal(1,countAboveThreshold,[3,4],3);
      assert._equal(2,countAboveThreshold,[3,1,4],1);
    });
  });
});
