/*
  factorial
  This function returns the factorial of a number >= 0. Negative numbers
  should return undefined
*/

function factorial(number) {
  if(number==0)
    return 1;
  if(number<0)
    return undefined;
  let product=number;
  let i=1;
  do {
    product=product*i;
    i++;
  } while (i<number);
  return product;
}

/*
  nthFiboTerm
  This function calculates the nth fibonacci term. It assumes that the term uses
  a 1 based index. nthFiboTerm(1) => 0, nthFiboTerm(2) => 1 etc
*/
function nthFiboTerm(term) {
  if(term<1)
    return undefined;
  let first=0;
  let second=1;
  let count=1;
  while(count<term) {
    let third=first+second;
    first=second;
    second=third;
    count++;
  }
  return first;
}


/*
  sumOfAnyN
  This function provides the sum of a range that spans from m to n. m and n may
  be negative, but n should always be greater than m.
*/
function sumOfAnyN(fromTerm,toTerm) {
  let sum=0;
  for (var i = fromTerm; i < toTerm; i++) {
    sum+=i;
  }
  return sum;
}

/*
  productOfAnyN
  This function provides the product of a range that spans from m to n. m and n may
  be negative, but n should always be greater than m.
*/
function productOfAnyN(fromTerm,toTerm) {
  let product=1;
  for (var i = fromTerm; i < toTerm; i++) {
    product*=i;
  }
  return product;
}

/*
  sumOfEvenInRange
  This function provides the sum of even numbers in a range that spans from m to n. m and n may
  be negative, but n should always be greater than m.
*/
function sumOfEvenInRange(fromTerm,toTerm) {
  let sum=0;
  for (var i = fromTerm; i < toTerm; i++) {
    if(i%2==0)
      sum+=i;
  }
  return sum;
}

/*
  sumOfOddInRange
  This function provides the sum of odd numbers in a range that spans from m to n. m and n may
  be negative, but n should always be greater than m.
*/
function sumOfOddInRange(fromTerm,toTerm) {
  let sum=0;
  for (var i = fromTerm; i < toTerm; i++) {
    if(i%2!=0)
      sum+=i;
  }
  return sum;
}

exports.factorial=factorial;
exports.nthFiboTerm=nthFiboTerm;
exports.sumOfAnyN=sumOfAnyN;
exports.productOfAnyN=productOfAnyN;
exports.sumOfEvenInRange=sumOfEvenInRange;
exports.sumOfOddInRange=sumOfOddInRange;
