require('./globalRequires.js');
require('./clobberMath.js').clobberMax();
const assert=require('./wrappedAssert.js');

const restoreMax=require('./clobberMath.js').restoreMax;
const maxRefCount=require('./clobberMath.js').maxRefCount;
const resetMaxRefCount=require('./clobberMath.js').resetMaxRefCount;
let errorInLoadingModule;

let isEven;
let isOdd;
let square;
let cube;
let gcd;
let lcm;
let simpleInterest;
let compoundInterest;
let greatestOf;
let averageOf;

try {
  isEven=require('../src/basic.js').isEven;
  isOdd=require('../src/basic.js').isOdd;
  square=require('../src/basic.js').square;
  cube=require('../src/basic.js').cube;
  gcd=require('../src/basic.js').gcd;
  lcm=require('../src/basic.js').lcm;
  simpleInterest=require('../src/basic.js').simpleInterest;
  compoundInterest=require('../src/basic.js').compoundInterest;
  greatestOf=require('../src/basic.js').greatestOf;
  averageOf=require('../src/basic.js').averageOf;
} catch (e) {
  errorInLoadingModule=e;
}

const skipIfNotPresent=require('./skipIfNotPresent.js');

describe("basic.js",function(){
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

describe("basic",function(){
  describe("isEven",function(){
    before(skipIfNotPresent(isEven));

    it("should be true for even positive numbers",function(){
      assert._isOk(isEven,2);
      assert._isOk(isEven,10);
      assert._isOk(isEven,1024);
      assert._isOk(isEven,256565656);
    });

    it("should be true for even negative numbers",function(){
      assert._isOk(isEven,-2);
      assert._isOk(isEven,-10);
      assert._isOk(isEven,-1024);
      assert._isOk(isEven,-256565656);
    });

    it("should be true for zero",function(){
      assert._isOk(isEven,0);
    });

    it("should be false for odd positive numbers",function(){
      assert._isNotOk(isEven,1);
      assert._isNotOk(isEven,91);
      assert._isNotOk(isEven,1023);
      assert._isNotOk(isEven,256565655);
    });

    it("should be false for odd negative numbers",function(){
      assert._isNotOk(isEven,-1);
      assert._isNotOk(isEven,-91);
      assert._isNotOk(isEven,-1023);
      assert._isNotOk(isEven,-256565655);
    });
  });

  describe("isOdd",function(){
    before(skipIfNotPresent(isOdd));

    it("should be true for odd positive numbers",function(){
      assert._isOk(isOdd,1);
      assert._isOk(isOdd,9);
      assert._isOk(isOdd,1023);
      assert._isOk(isOdd,256565655);
    });

    it("should be true for odd negative numbers",function(){
      assert._isOk(isOdd,-1);
      assert._isOk(isOdd,-9);
      assert._isOk(isOdd,-1023);
      assert._isOk(isOdd,-256565655);
    });

    it("should be false for 0",function(){
      assert._isNotOk(isOdd,0);
    });

    it("should be false for even positive numbers",function(){
      assert._isNotOk(isOdd,2);
      assert._isNotOk(isOdd,10);
      assert._isNotOk(isOdd,1024);
      assert._isNotOk(isOdd,256565656);
    });

    it("should be false for even negative numbers",function(){
      assert._isNotOk(isOdd,-2);
      assert._isNotOk(isOdd,-10);
      assert._isNotOk(isOdd,-1024);
      assert._isNotOk(isOdd,-256565656);
    });
  });

  describe("square",function(){
    before(skipIfNotPresent(square));

    it("should provide the square of positive integers",function(){
      assert._equal(1,square,1);
      assert._equal(4,square,2);
      assert._equal(9,square,3);
      assert._equal(10000,square,100);
    });

    it("should provide the square of negative integers",function(){
      assert._equal(1,square,-1);
      assert._equal(4,square,-2);
      assert._equal(9,square,-3);
      assert._equal(10000,square,-100);
    });

    it("should provide the square of 0",function(){
      assert._equal(0,square,0);
    });
  });

  describe("cube",function(){
    before(skipIfNotPresent(cube));

    it("should provide the cube of positive integers",function(){
      assert._equal(1,cube,1);
      assert._equal(8,cube,2);
      assert._equal(27,cube,3);
      assert._equal(1000000,cube,100);
    });

    it("should provide the cube of negative integers",function(){
      assert._equal(-1,cube,-1);
      assert._equal(-8,cube,-2);
      assert._equal(-27,cube,-3);
      assert._equal(-1000000,cube,-100);
    });

    it("should provide the cube of 0",function(){
      assert._equal(0,cube,0);
    });
  });

  describe("gcd",function(){
    before(skipIfNotPresent(gcd));

    it("should calculate the GCD when both numbers are non-prime",function(){
      assert._equal(2,gcd,4,6);
      assert._equal(3,gcd,6,9);
      assert._equal(15,gcd,15,45);
    });

    it("should return 1 as the GCD when both numbers are prime",function(){
      assert._equal(1,gcd,2,3);
      assert._equal(1,gcd,3,5);
      assert._equal(1,gcd,5,29);
    });

    it("should be 1 when either of the numbers is 1",function(){
      assert._equal(1,gcd,1,5);
      assert._equal(1,gcd,100,1);
    });

    it("should return the same number when both numbers are equal",function(){
      assert._equal(1,gcd,1,1);
      assert._equal(100,gcd,100,100);
    });

    it("should be 1 if one is prime and the other isn't a multiple",function(){
      assert._equal(1,gcd,2,25);
      assert._equal(1,gcd,3,8);
      assert._equal(1,gcd,26,17);
    });
  });

  describe("lcm",function(){
    before(skipIfNotPresent(lcm));

    it("should be the product of both numbers when both are prime",function(){
      assert._equal(6,lcm,2,3);
      assert._equal(15,lcm,3,5);
      assert._equal(323,lcm,19,17);
    });

    it("should be the greater number when one of the numbers is one",function(){
      assert._equal(2,lcm,2,1);
      assert._equal(15,lcm,15,1);
      assert._equal(323,lcm,1,323);
    });

    it("should be 0 when either of the numbers is 0",function(){
      assert._equal(0,lcm,2,0);
      assert._equal(0,lcm,0,200);
      assert._equal(0,lcm,0,0);
    });

    it("should be the greater number if greater number multiple of lower num",function(){
      assert._equal(6,lcm,2,6);
      assert._equal(15,lcm,3,15);
      assert._equal(323,lcm,19,323);
    });

    it("should be the product of both nums if greater num is prime",function(){
      assert._equal(52,lcm,4,13);
      assert._equal(66,lcm,6,11);
      assert._equal(970,lcm,10,97);
    });
  });

  describe("simple interest",function(){
    before(skipIfNotPresent(simpleInterest));

    it("should return 0 if the interest rate is 0",function(){
      assert._equal(0,simpleInterest,10,1,0);
    });

    it("should return 0 if the period is 0",function(){
      assert._equal(0,simpleInterest,10,0,1);
    });

    it("should return 0 if the principle is 0",function(){
      assert._equal(0,simpleInterest,0,1,10);
    });

    it("should return half the principle for a period of one and a rate of 50",function(){
      assert._equal(2,simpleInterest,4,1,50);
      assert._equal(75,simpleInterest,150,1,50);
      assert._equal(1500,simpleInterest,3000,1,50);
    });

    it("should calculate the SI for a given principle, period and rate",function(){
      assert._equal(10,simpleInterest,1000,1,1);
      assert._equal(100,simpleInterest,100,10,10);
      assert._equal(11880,simpleInterest,3300,30,12);
    });
  });

  describe("compound interest",function(){
    before(skipIfNotPresent(compoundInterest));

    it("should return 0 when rate is 0",function(){
      assert._equal(0,compoundInterest,10000,1,0);
    });

    it("should return 0 when period is 0",function(){
      assert._equal(0,compoundInterest,10000,0,1);
    });

    it("should return 0 when principle is 0",function(){
      assert._equal(0,compoundInterest,0,1,100);
    });

    it("should return the compounded interest(SI) for a single year",function(){
      assert._equal(1,compoundInterest,100,1,1);
      assert._equal(10,compoundInterest,1000,1,1);
      assert._equal(23,compoundInterest,2300,1,1);
    });

    it("should return the compounded interest for a period greater than a year",function(){
      assert._equal(41,compoundInterest,400,2,5);
      assert._equal(125,compoundInterest,100,2,50);
    });
  });

  describe("greatest of three numbers",function(){
    before(skipIfNotPresent(greatestOf));

    it("should not use Math.max",function(){
      resetMaxRefCount();
      greatestOf(1,2,3);
      assert.equal(0,maxRefCount());
      restoreMax();
    });

    it("should provide the greatest of three positive numbers regardless of order",function(){
      assert._equal(3,greatestOf,1,2,3);
      assert._equal(3,greatestOf,2,3,1);
      assert._equal(3,greatestOf,3,1,2);
    });

    it("should provide x when all three numbers are x",function(){
      assert._equal(1,greatestOf,1,1,1);
      assert._equal(0,greatestOf,0,0,0);
      assert._equal(-1,greatestOf,-1,-1,-1);
    });

    it("should provide the greatest of three negative numbers regardless of order",function(){
      assert._equal(-1,greatestOf,-2,-3,-1);
      assert._equal(-1,greatestOf,-3,-1,-2);
      assert._equal(-1,greatestOf,-1,-2,-3);
    });

    it("should provide the greatest of three positive numbers when two of them are equal",function(){
      assert._equal(2,greatestOf,1,2,2);
      assert._equal(2,greatestOf,1,1,2);
      assert._equal(2,greatestOf,1,2,1);
      assert._equal(2,greatestOf,2,2,1);
      assert._equal(2,greatestOf,2,1,2);
      assert._equal(2,greatestOf,2,1,1);
    });

    it("should provide the greatest of three negative numbers when two of them are equal",function(){
      assert._equal(-1,greatestOf,-1,-2,-2);
      assert._equal(-1,greatestOf,-1,-1,-2);
      assert._equal(-1,greatestOf,-1,-2,-1);
      assert._equal(-1,greatestOf,-2,-2,-1);
      assert._equal(-1,greatestOf,-2,-1,-2);
      assert._equal(-1,greatestOf,-2,-1,-1);
    });
  });

  describe("average of three numbers",function(){
    before(skipIfNotPresent(averageOf));

    it("should return x if all three numbers are x",function(){
      assert._equal(2,averageOf,2,2,2);
      assert._equal(-1,averageOf,-1,-1,-1);
      assert._equal(0,averageOf,0,0,0);
    });

    it("should return the average of three positive integers",function(){
      assert._equal(2,averageOf,1,2,3);
      assert._equal(250,averageOf,300,200,250);
    });

    it("should return the average of three negative integers",function(){
      assert._equal(-2,averageOf,-1,-2,-3);
      assert._equal(-250,averageOf,-300,-200,-250);
    });
  });
});
