require('./globalRequires.js');

const skipIfNotPresent=require('./skipIfNotPresent.js');
const assert=require('./wrappedAssert.js');

let range;
let errorInLoadingModule;

try {
  range=require('../src/sequences.js').range;
} catch (e) {
  errorInLoadingModule=e;
}

describe("sequences.js",function(){
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

describe("sequences",function(){
  describe("range",function(){
    before(skipIfNotPresent(range));

    it("should provide numbers in a positive ascending sequence of step length 1(not provided)",function(){
      assert._deepEqual([1],range,1,2);
      assert._deepEqual([1,2],range,1,3);
      assert._deepEqual([1,2,3],range,1,4);
      assert._deepEqual([0,1,2,3],range,0,4);
    });

    it("should provide numbers in a positive ascending sequence of step length 1(provided)",function(){
      assert._deepEqual([1],range,1,2,1);
      assert._deepEqual([1,2],range,1,3,1);
      assert._deepEqual([1,2,3],range,1,4,1);
      assert._deepEqual([0,1,2,3],range,0,4,1);
    });

    it("should provide numbers in a positive ascending sequence of step length greater than 1",function(){
      assert._deepEqual([1],range,1,3,2);
      assert._deepEqual([1,3],range,1,4,2);
      assert._deepEqual([1],range,1,4,3);
      assert._deepEqual([1,4],range,1,7,3);
      assert._deepEqual([1,4,7],range,1,9,3);
    });

    it("should provide numbers in a negative ascending sequence of step length 1",function(){
      assert._deepEqual([-1],range,-1,0);
      assert._deepEqual([-2,-1],range,-2,0);
      assert._deepEqual([-3,-2,-1],range,-3,0);
      assert._deepEqual([-4,-3,-2],range,-4,-1);
      assert._deepEqual([-1,0,1],range,-1,2);
    });

    it("should provide numbers in a negative ascending sequence of step length greater than 1",function(){
      assert._deepEqual([-8,-6,-4,-2],range,-8,0,2);
      assert._deepEqual([-8,-6,-4],range,-8,-2,2);
      assert._deepEqual([-8,-3],range,-8,0,5);
      assert._deepEqual([-8],range,-8,0,8);
    });

    it("should provide an empty list when the step length is 0",function(){
      assert._deepEqual([],range,1,100,0);
      assert._deepEqual([],range,-100,-1,0);
      assert._deepEqual([],range,100,1,0);
      assert._deepEqual([],range,-1,-100,0);
    });

    it("should provide numbers in a positive descending sequence",function(){
      assert._deepEqual([3,2,1],range,3,0,-1);
      assert._deepEqual([2,1,0],range,2,-1,-1);
      assert._deepEqual([1,0,-1],range,1,-2,-1);
    });

    it("should provide numbers in a negative descending sequence",function(){
      assert._deepEqual([-1,-2,-3],range,-1,-4,-1);
      assert._deepEqual([-1],range,-1,-2,-1);
    });

    it("should provide numbers in a positive descending sequence when step length lesser than -1",function(){
      assert._deepEqual([3,1],range,3,0,-2);
      assert._deepEqual([2,0],range,2,-1,-2);
      assert._deepEqual([1,-4],range,1,-5,-5);
    });

    it("should provide numbers in a negative descending sequence when step length lesser than -1",function(){
      assert._deepEqual([-1,-3],range,-1,-4,-2);
      assert._deepEqual([-1,-5],range,-1,-6,-4);
    });

    it("should provide an empty list when range is ascending but step is descending",function(){
      assert._deepEqual([],range,0,100,-1);
      assert._deepEqual([],range,0,10,-2);
    });

    it("should provide an empty list when range is descending but step is descending",function(){
      assert._deepEqual([],range,100,0);
      assert._deepEqual([],range,100,0,1);
      assert._deepEqual([],range,100,0,2);
    });

    it("should provide an empty list when the starting and ending numbers are the same",function(){
      assert._deepEqual([],range,1,1);
      assert._deepEqual([],range,10,10);
      assert._deepEqual([],range,-10,-10);
    });
  });
});
