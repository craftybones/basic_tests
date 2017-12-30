require('./globalRequires.js');
const assert=require('./wrappedAssert.js');

let factorial;
let nthFiboTerm;
let sumOfAnyN;
let productOfAnyN;
let sumOfEvenInRange;
let sumOfOddInRange;
let errorInLoadingModule;

try {
  factorial=require('../src/loops.js').factorial;
  nthFiboTerm=require('../src/loops.js').nthFiboTerm;
  sumOfAnyN=require('../src/loops.js').sumOfAnyN;
  productOfAnyN=require('../src/loops.js').productOfAnyN;
  sumOfEvenInRange=require('../src/loops.js').sumOfEvenInRange;
  sumOfOddInRange=require('../src/loops.js').sumOfOddInRange;
} catch (e) {
  errorInLoadingModule=e;
}

const skipIfNotPresent=require('./skipIfNotPresent.js');

describe("loops.js",function(){
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

describe("loops",function(){
  describe("factorial",function(){
    before(skipIfNotPresent(factorial));

    it("should return the appropriate factorial for positive integers",function(){
      assert._equal(1,factorial,1);
      assert._equal(2,factorial,2);
      assert._equal(6,factorial,3);
      assert._equal(3628800,factorial,10);
    });

    it("should return 1 for 0",function(){
      assert._equal(1,factorial,0);
    });

    it("should return undefined for negative numbers",function(){
      assert._equal(undefined,factorial,-1);
    });
  });

  describe("nthFiboTerm",function(){
    before(skipIfNotPresent(nthFiboTerm));

    it("should work for the seed numbers 0,1",function(){
      assert._equal(0,nthFiboTerm,1);
      assert._equal(1,nthFiboTerm,2);
    });

    it("should work for terms greater than 2",function(){
      assert._equal(1,nthFiboTerm,3);
      assert._equal(2,nthFiboTerm,4);
      assert._equal(3,nthFiboTerm,5);
      assert._equal(5,nthFiboTerm,6);
      assert._equal(89,nthFiboTerm,12);
      assert._equal(4181,nthFiboTerm,20);
    });

    it("should return undefined for terms <= 0",function(){
      assert._equal(undefined,nthFiboTerm,0);
      assert._equal(undefined,nthFiboTerm,-1);
      assert._equal(undefined,nthFiboTerm,-100);
    });
  });

  describe("sumOfAnyN",function(){
    before(skipIfNotPresent(sumOfAnyN));

    it("should provide the sum of the first n numbers",function(){
      assert._equal(6,sumOfAnyN,1,4);
      assert._equal(15,sumOfAnyN,1,6);
      assert._equal(5050,sumOfAnyN,1,101);
    });

    it("should provide the sum of a range of numbers beginning with a term greater 1",function(){
      assert._equal(2,sumOfAnyN,2,3);
      assert._equal(45,sumOfAnyN,5,11);
      assert._equal(3825,sumOfAnyN,50,101);
    });

    it("should provide the sum of when range is negative and ascending",function(){
      assert._equal(-6,sumOfAnyN,-3,0);
      assert._equal(-45,sumOfAnyN,-10,-4);
      assert._equal(-3825,sumOfAnyN,-100,-49);
    });

    it("should provide the sum of when range is from negative to positive",function(){
      assert._equal(0,sumOfAnyN,-3,4);
      assert._equal(5,sumOfAnyN,-1,4);
      assert._equal(-100001,sumOfAnyN,-100001,100001);
    });

    it("should return 0 if the range is in the wrong direction",function(){
      assert._equal(0,sumOfAnyN,1,0);
      assert._equal(0,sumOfAnyN,1,-1);
      assert._equal(0,sumOfAnyN,-1,-20);
      assert._equal(0,sumOfAnyN,100,1);
    });
  });

  describe("productOfAnyN",function(){
    before(skipIfNotPresent(productOfAnyN));

    it("should return 0 if range starts with 0",function(){
      assert._equal(0,productOfAnyN,0,3);
      assert._equal(0,productOfAnyN,0,8);
      assert._equal(0,productOfAnyN,0,100);
    });

    it("should return factorial for range begining with 1",function(){
      assert._equal(1,productOfAnyN,1,1);
      assert._equal(1,productOfAnyN,1,2);
      assert._equal(2,productOfAnyN,1,3);
      assert._equal(362880,productOfAnyN,1,10);
    });

    it("should return product for positive ascending range",function(){
      assert._equal(60,productOfAnyN,3,6);
      assert._equal(24,productOfAnyN,2,5);
      assert._equal(110,productOfAnyN,10,12);
      assert._equal(181440,productOfAnyN,3,10);
    });

    it("should return product for negative ascending range",function(){
      assert._equal(-6,productOfAnyN,-3,0);
      assert._equal(-362880,productOfAnyN,-9,0);
      assert._equal(24,productOfAnyN,-4,0);
    });

    it("should return 1 if the range is in the wrong direction",function(){
      assert._equal(1,productOfAnyN,1,0);
      assert._equal(1,productOfAnyN,1,-1);
      assert._equal(1,productOfAnyN,-1,-20);
      assert._equal(1,productOfAnyN,100,1);
    });

    it("should return 1 if the length of the range is 0",function(){
      assert._equal(1,productOfAnyN,0,0);
      assert._equal(1,productOfAnyN,-1,-1);
      assert._equal(1,productOfAnyN,20,20);
    });
  });

  describe("sumOfEvenInRange",function(){
    before(skipIfNotPresent(sumOfEvenInRange));

    it("should provide the sum of even numbers between 1 and n",function(){
      assert._equal(2,sumOfEvenInRange,1,4);
      assert._equal(6,sumOfEvenInRange,1,6);
      assert._equal(2550,sumOfEvenInRange,1,101);
    });

    it("should provide the sum of even numbers in a range when range begins with a term > 1",function(){
      assert._equal(2,sumOfEvenInRange,2,3);
      assert._equal(24,sumOfEvenInRange,5,11);
      assert._equal(1950,sumOfEvenInRange,50,101);
    });

    it("should provide the sum of even numbers when range is negative and ascending",function(){
      assert._equal(-2,sumOfEvenInRange,-3,0);
      assert._equal(-24,sumOfEvenInRange,-10,-4);
      assert._equal(-1950,sumOfEvenInRange,-100,-49);
    });

    it("should provide the sum of when range is from negative to positive",function(){
      assert._equal(0,sumOfEvenInRange,-3,4);
      assert._equal(2,sumOfEvenInRange,-1,4);
      assert._equal(0,sumOfEvenInRange,-100001,100001);
    });

    it("should return 0 if the range is in the wrong direction",function(){
      assert._equal(0,sumOfEvenInRange,1,0);
      assert._equal(0,sumOfEvenInRange,1,-1);
      assert._equal(0,sumOfEvenInRange,-1,-20);
      assert._equal(0,sumOfEvenInRange,100,1);
    });
  });

  describe("sumOfOddInRange",function(){
    before(skipIfNotPresent(sumOfOddInRange));

    it("should provide the sum of odd numbers between 1 and n",function(){
      assert._equal(4,sumOfOddInRange,1,4);
      assert._equal(9,sumOfOddInRange,1,6);
      assert._equal(2500,sumOfOddInRange,1,101);
    });

    it("should provide the sum of odd numbers in a range when range begins with a term > 1",function(){
      assert._equal(0,sumOfOddInRange,2,3);
      assert._equal(21,sumOfOddInRange,5,11);
      assert._equal(1875,sumOfOddInRange,50,101);
    });

    it("should provide the sum of odd numbers when range is negative and ascending",function(){
      assert._equal(-4,sumOfOddInRange,-3,0);
      assert._equal(-21,sumOfOddInRange,-10,-4);
      assert._equal(-1875,sumOfOddInRange,-100,-49);
    });

    it("should provide the sum of when range is from negative to positive",function(){
      assert._equal(0,sumOfOddInRange,-3,4);
      assert._equal(3,sumOfOddInRange,-1,4);
      assert._equal(-100001,sumOfOddInRange,-100001,100001);
    });

    it("should return 0 if the range is in the wrong direction",function(){
      assert._equal(0,sumOfOddInRange,1,0);
      assert._equal(0,sumOfOddInRange,1,-1);
      assert._equal(0,sumOfOddInRange,-1,-20);
      assert._equal(0,sumOfOddInRange,100,1);
    });
  });
});
