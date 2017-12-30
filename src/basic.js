function isDivisibleBy(divisor,num){
  return num%divisor==0;
}

/*
  isEven
  This function takes a number and returns true or false
  based on whether the number is even or not
*/
function isEven(number) {
  return number%2==0;
}

/*
  isOdd
  This function takes a number and returns true or false
  based on whether the number is odd or not
*/
function isOdd(number) {
  return number%2!=0;
}

/*
  square
  This function takes a number and returns the mathematical square
  of that number
*/
function square(number) {
  return number*number;
}

/*
  cube
  This function takes a number and returns the mathematical cube
  of that number
*/
function cube(number) {
  return number*number*number;
}

/*
  gcd
  This function returns the greatest common divisor of any two numbers
*/
function gcd(num1,num2) {
  let divisor=Math.min(num1,num2);
  while(divisor>0) {
    if(isDivisibleBy(divisor,num1) && isDivisibleBy(divisor,num2))
      return divisor;
    divisor--;
  }
  return 1;
}

/*
  lcm
  This function returns the least common multiple of any two numbers
*/
function lcm(num1,num2) {
  return (num1*num2)/gcd(num1,num2);
}

/*
  simpleInterest
  This function returns the simple interest calculated when given
  principle, period and rate of interest(in that order)
*/
function simpleInterest(principle,period,rate) {
  return (principle*period*rate)/100.0;
}

/*
  compoundInterest
  This function returns the simple interest calculated when given
  principle, period and rate of interest annually(in that order)
*/
function compoundInterest(principle,period,rate) {
  let realRate=(100+rate)/100.0;
  let interest=principle*Math.pow(realRate,period);
  return interest-principle;
}

/*
  greatestOf
  This function returns the greatest of three numbers
*/
function greatestOf(num1,num2,num3) {
  if (num1>num2) {
    return num1>num3?num1:num3;
  }
  return num2>num3?num2:num3;
}

/*
  averageOf
  This function returns the average of three numbers
*/
function averageOf(num1,num2,num3) {
  return (num1+num2+num3)/3;
}

exports.isEven=isEven;
exports.isOdd=isOdd;
exports.square=square;
exports.cube=cube;
exports.gcd=gcd;
exports.lcm=lcm;
exports.simpleInterest=simpleInterest;
exports.compoundInterest=compoundInterest;
exports.greatestOf=greatestOf;
exports.averageOf=averageOf;
