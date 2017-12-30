require('./globalRequires.js');

const clobberReverse=require('./clobberArrayOperations.js').clobberReverse;
const restoreReverse=require('./clobberArrayOperations.js').restoreReverse;
const reverseRefCount=require('./clobberArrayOperations.js').reverseRefCount;

const clobberConcat=require('./clobberArrayOperations.js').clobberConcat;
const restoreConcat=require('./clobberArrayOperations.js').restoreConcat;
const concatRefCount=require('./clobberArrayOperations.js').concatRefCount;

const clobberIncludes=require('./clobberArrayOperations.js').clobberIncludes;
const restoreIncludes=require('./clobberArrayOperations.js').restoreIncludes;
const includesRefCount=require('./clobberArrayOperations.js').includesRefCount;

const clobberSome=require('./clobberArrayOperations.js').clobberSome;
const restoreSome=require('./clobberArrayOperations.js').restoreSome;
const someRefCount=require('./clobberArrayOperations.js').someRefCount;

const clobberEvery=require('./clobberArrayOperations.js').clobberEvery;
const restoreEvery=require('./clobberArrayOperations.js').restoreEvery;
const everyRefCount=require('./clobberArrayOperations.js').everyRefCount;

const skipIfNotPresent=require('./skipIfNotPresent.js');
const assert=require('./wrappedAssert.js');

let union;
let intersection;
let difference;
let isSubset;
let isReverse;
let areEqual;
let isSameSet;
let errorInLoadingModule;

try {
  union=require('../src/sets.js').union;
  intersection=require('../src/sets.js').intersection;
  difference=require('../src/sets.js').difference;
  isSubset=require('../src/sets.js').isSubset;
  isReverse=require('../src/sets.js').isReverse;
  areEqual=require('../src/sets.js').areEqual;
  isSameSet=require('../src/sets.js').isSameSet;
} catch (e) {
  errorInLoadingModule=e;
}

describe("sets.js",function(){
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

describe("sets",function(){
  describe("union",function(){
    before(skipIfNotPresent(union));

    it("should not use inappropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      firstList=clobberConcat(firstList);
      secondList=clobberConcat(secondList);
      union(firstList,secondList);
      assert._equal(0,concatRefCount);
      restoreConcat(firstList);
      restoreConcat(secondList);
    });

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[5,6,7,8];

      union(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      union(secondList,firstList);
      assert.deepEqual([5,6,7,8],secondList);

    });

    it("should return the union of two lists as a new list",function(){
      let firstList=[1,2,3];
      let secondList=[4,5,6];

      assert._deepEqual([1,2,3,4,5,6],union,firstList,secondList);
      assert._deepEqual([4,5,6,1,2,3],union,secondList,firstList);
    });

    it("should return an empty list if both lists provided are empty",function(){
      assert._deepEqual([],union,[],[]);
    });

    it("should return contents of the non-empty list if one of the lists is empty",function(){
      assert._deepEqual([1,2,3],union,[1,2,3],[]);
      assert._deepEqual([1,2,3],union,[],[1,2,3]);
    });

    it("should return a set that contains only one instance of duplicate elements",function(){
      let firstList=[1,2,3];
      let secondList=[3,2,1];

      assert._deepEqual([1,2,3],union,firstList,secondList);
      assert._deepEqual([3,2,1],union,secondList,firstList);
      assert._deepEqual([2],union,[2],[2]);
      assert._deepEqual([2,1],union,[2,2],[1]);
      assert._deepEqual([2,1],union,[2],[1,1]);
      assert._deepEqual([2,1],union,[2],[2,1]);
    });
  });
  describe("intersection",function(){
    before(skipIfNotPresent(intersection));

    it("should use appropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      firstList=clobberIncludes(firstList);
      secondList=clobberIncludes(secondList);
      intersection(firstList,secondList);
      assert.isAbove(includesRefCount(),0);
      restoreIncludes(firstList);
      restoreIncludes(secondList);
    });

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[5,6,7,8];

      intersection(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      intersection(secondList,firstList);
      assert.deepEqual([5,6,7,8],secondList);
    });

    it("should provide the intersection of two lists that are not subsets of each other",function(){
      assert._sameMembers([1],intersection,[1,2],[1,3]);
      assert._sameMembers([1],intersection,[1,3],[1,2]);
      assert._sameMembers([1,3],intersection,[1,2,3],[1,3,4]);
      assert._sameMembers([3,2],intersection,[1,2,3],[3,2]);
    });

    it("should provide the subset if one list is the subset of another",function(){
      assert._sameMembers([1],intersection,[1],[1,3]);
      assert._sameMembers([1],intersection,[1,3],[1]);
      assert._sameMembers([1,2,3],intersection,[1,2,3],[1,2,3,4]);
      assert._sameMembers([3,2,1],intersection,[1,2,3,4],[1,2,3]);
    });

    it("should provide an empty list if either of the lists given are empty",function(){
      assert._sameMembers([],intersection,[],[1,3]);
      assert._sameMembers([],intersection,[1,3],[]);
    });

    it("should contain only one instance of duplicate intersecting elements",function(){
      assert._sameMembers([1],intersection,[1,1],[1,1]);
      assert._sameMembers([1,2],intersection,[1,2],[1,1,2]);
      assert._sameMembers([1,2],intersection,[1,2,2],[1,1,2]);
      assert._sameMembers([1,2],intersection,[1,2,2,3,3],[1,1,2]);
    });

    it("should provide an empty list if there are no common elements",function(){
      assert._sameMembers([],intersection,[1],[4]);
      assert._sameMembers([],intersection,[1,2,3],[4,5,6]);
    });
  });

  describe("difference",function(){
    before(skipIfNotPresent(difference));

    it("should use appropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      firstList=clobberIncludes(firstList);
      secondList=clobberIncludes(secondList);
      difference(firstList,secondList);
      assert.isAbove(includesRefCount(),0);
      restoreIncludes(firstList);
      restoreIncludes(secondList);
    });

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[5,6,7,8];

      difference(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      difference(secondList,firstList);
      assert.deepEqual([5,6,7,8],secondList);
    });

    it("should return a list containing elements in the first list but not the second",function(){
      assert._sameMembers([1],difference,[1,2],[2]);
      assert._sameMembers([2],difference,[1,2],[1]);
      assert._sameMembers([1],difference,[1,2],[2,3]);
      assert._sameMembers([3],difference,[2,3],[1,2]);
    });

    it("should return the non-empty list if the second list is empty",function(){
      assert._sameMembers([1],difference,[1],[]);
      assert._sameMembers([1,2],difference,[1,2],[]);
      assert._sameMembers([1,2,3],difference,[1,2,3],[]);
    });

    it("should return an empty list when the first list is empty",function(){
      assert._sameMembers([],difference,[],[1]);
      assert._sameMembers([],difference,[],[1,2]);
      assert._sameMembers([],difference,[],[1,2,3]);
    });

    it("should return an empty list when both lists are empty",function(){
      assert._sameMembers([],difference,[],[]);
    });

    it("should return a list containing only one instance of duplicate elements",function(){
      assert._sameMembers([2],difference,[1,1,2],[1]);
      assert._sameMembers([2],difference,[1,2,2],[1]);
      assert._sameMembers([2],difference,[1,1,2],[1,1]);
      assert._sameMembers([2],difference,[1,1,2,2],[1,1]);
      assert._sameMembers([2,3],difference,[1,1,2,2,3,3],[1,1]);
      assert._sameMembers([3],difference,[1,1,2,2,3],[1,1,2,2]);
      assert._sameMembers([],difference,[1,1,2,2,2],[1,1,2,2]);
      assert._sameMembers([],difference,[1,1,2,2,2],[2,2,1,1]);
      assert._sameMembers([1],difference,[1,1,2,2,2],[2,2]);
      assert._sameMembers([1],difference,[1,1,2,2,2],[2,2,3,3,3]);
    });
  });

  describe("isSubset",function(){
    before(skipIfNotPresent(isSubset));

    it("should use appropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      secondList=clobberSome(secondList);
      secondList=clobberEvery(secondList);
      firstList=clobberIncludes(firstList);
      isSubset(firstList,secondList);
      let someCount=someRefCount();
      let everyCount=everyRefCount();
      let includesCount=includesRefCount();
      assert.isOk(someCount>0||everyCount>0);
      assert.isAbove(includesCount,0);
      restoreSome(secondList);
      restoreEvery(secondList);
    });

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[5,6,7,8];

      isSubset(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      isSubset(secondList,firstList);
      assert.deepEqual([5,6,7,8],secondList);
    });

    it("should return true when the second list is a subset of the first",function(){
      assert._isOk(isSubset,[1,2],[1]);
      assert._isOk(isSubset,[1,2],[2]);
      assert._isOk(isSubset,[1,2],[1,2]);
      assert._isOk(isSubset,[1,2],[2,1]);
    });

    it("should return false when the second list is not a subset of the first",function(){
      assert._isNotOk(isSubset,[1,2],[3]);
      assert._isNotOk(isSubset,[1,2],[2,3]);
      assert._isNotOk(isSubset,[1,2],[1,2,3]);
      assert._isNotOk(isSubset,[1,2],[2,1,3]);
    });

    it("should return true when the first list contains duplicates not in the second list",function(){
      assert._isOk(isSubset,[1,1],[]);
      assert._isOk(isSubset,[1,2,2],[1]);
      assert._isOk(isSubset,[1,1,2],[2]);
    });

    it("should return true when the first list contains duplicates present in the second list",function(){
      assert._isOk(isSubset,[1,1],[1]);
      assert._isOk(isSubset,[1],[1,1]);
      assert._isOk(isSubset,[1,2,2],[2]);
      assert._isOk(isSubset,[1,1,2],[1]);
    });

    it("should return true when common elements are duplicated in both lists",function(){
      assert._isOk(isSubset,[1,1,2,2],[1,1,2,2]);
      assert._isOk(isSubset,[1,2,2,2],[1,1,1,2]);
      assert._isOk(isSubset,[2,2,1,1],[1,1,2,2]);
      assert._isOk(isSubset,[2,2,1,1,3],[3,1,1,2,2]);
    });

    it("should return true when the first list is non-empty and the second list is empty",function(){
      assert._isOk(isSubset,[1],[]);
      assert._isOk(isSubset,[1,2],[]);
    });

    it("should return false when the second list is non-empty and the first list is empty",function(){
      assert._isNotOk(isSubset,[],[1]);
      assert._isNotOk(isSubset,[],[1,2]);
    });

    it("should return true when both lists are empty",function(){
      assert._isOk(isSubset,[],[]);
    });
  });

  describe("isReverse",function(){
    before(skipIfNotPresent(isReverse));

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[5,6,7,8];

      isReverse(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      isReverse(secondList,firstList);
      assert.deepEqual([5,6,7,8],secondList);
    });

    it("should return true when the given lists are reverses of each other",function(){
      assert._isOk(isReverse,[1,2],[2,1]);
      assert._isOk(isReverse,[2,1],[1,2]);
      assert._isOk(isReverse,[1,2,3],[3,2,1]);
      assert._isOk(isReverse,[3,2,1],[1,2,3]);
      assert._isOk(isReverse,[1,2,"a"],["a",2,1]);
      assert._isOk(isReverse,["a",2,1],[1,2,"a"]);
      assert._isOk(isReverse,["b","a"],["a","b"]);
      assert._isOk(isReverse,["a","b"],["b","a"]);
    });

    it("should return false when the given lists are not reverses of each other",function(){
      assert._isNotOk(isReverse,[1,2,"a"],["b",2,1]);
      assert._isNotOk(isReverse,["b",2,1],[1,2,"a"]);
      assert._isNotOk(isReverse,[1,2,3],[3,4,1]);
      assert._isNotOk(isReverse,[3,4,1],[1,2,3]);
    });

    it("should return false when the lists are not of the same size",function(){
      assert._isNotOk(isReverse,[1,2,3],[2,1]);
      assert._isNotOk(isReverse,[2,1],[1,2,3]);
      assert._isNotOk(isReverse,[1,2],[3,2,1]);
      assert._isNotOk(isReverse,[3,2,1],[1,2]);
    });

    it("should return true when both lists are empty",function(){
      assert._isOk(isReverse,[],[]);
    });
  });

  describe("areEqual",function(){
    before(skipIfNotPresent(areEqual));

    it("should use appropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      firstList=clobberEvery(firstList);
      secondList=clobberEvery(secondList);
      areEqual(firstList,secondList);
      assert.isAbove(everyRefCount(),0);
      restoreEvery(firstList);
      restoreEvery(secondList);
    });

    it("should return true when both lists are equal",function(){
      assert._isOk(areEqual,[1,2],[1,2]);
      assert._isOk(areEqual,[1,2,3],[1,2,3]);
      assert._isOk(areEqual,[1,2,3,4],[1,2,3,4]);
      assert._isOk(areEqual,[1,3,3,4],[1,3,3,4]);
      assert._isOk(areEqual,["a",1,2],["a",1,2]);
    });

    it("should return false when the lengths of both lists are different",function(){
      assert._isNotOk(areEqual,[1],[1,2]);
      assert._isNotOk(areEqual,[1,2],[1]);
    });

    it("should return false when the two lists have entirely different elements",function(){
      assert._isNotOk(areEqual,[1,2,3],[4,5,6]);
    });

    it("should return true when both lists are empty",function(){
      assert._isOk(areEqual,[],[]);
    });

    it("should return false when both lists have the same element but in different order",function(){
      assert._isNotOk(areEqual,[1,2],[2,1]);
      assert._isNotOk(areEqual,[1,2,3],[3,2,1]);
    });
  });

  describe("isSameSet",function(){
    before(skipIfNotPresent(isSameSet));

    it("should not modify any of the original lists",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];

      isSameSet(firstList,secondList);
      assert.deepEqual([1,2,3,4],firstList);

      isSameSet(secondList,firstList);
      assert.deepEqual([1,2,3,4],secondList);
    });

    it("should use appropriate in-built functions",function(){
      let firstList=[1,2,3,4];
      let secondList=[1,2,3,4];
      firstList=clobberEvery(firstList);
      secondList=clobberEvery(secondList);
      isSameSet(firstList,secondList);
      assert.isAbove(everyRefCount(),0);
      restoreEvery(firstList);
      restoreEvery(secondList);
    });

    it("should return true when both lists contain the same set of elements",function(){
      assert._isOk(isSameSet,[1],[1]);
      assert._isOk(isSameSet,[1,2],[1,2]);
      assert._isOk(isSameSet,[1,2,3],[3,1,2]);
    });

    it("should return false when the first list contains elements missing in the second",function(){
      assert._isNotOk(isSameSet,[],[1]);
      assert._isNotOk(isSameSet,[1,2],[1]);
      assert._isNotOk(isSameSet,[1,2,3],[1,2]);
      assert._isNotOk(isSameSet,[1,2,3,4],[3,1,2]);
      assert._isNotOk(isSameSet,[1,2,3,4],[1,2,3,5]);
    });

    it("should return false when the second list contains elements missing in the first",function(){
      assert._isNotOk(isSameSet,[1],[]);
      assert._isNotOk(isSameSet,[1],[1,2]);
      assert._isNotOk(isSameSet,[1,2],[1,2,3]);
      assert._isNotOk(isSameSet,[3,1,2],[1,2,3,4]);
    });

    it("should return true when both lists are empty",function(){
      assert._isOk(isSameSet,[],[]);
    });

    it("should return true even if duplicate elements exist in either list",function(){
      assert._isOk(isSameSet,[1,1],[1]);
      assert._isOk(isSameSet,[1,1,2],[1,2]);
      assert._isOk(isSameSet,[1,2,2],[1,2]);
      assert._isOk(isSameSet,[1],[1,1]);
      assert._isOk(isSameSet,[1,2],[1,1,2]);
      assert._isOk(isSameSet,[1,1,1],[1,1]);
    });
  });
});
