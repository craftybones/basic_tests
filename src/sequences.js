/*
  range. This function generates a range of numbers in a list.
  It also accepts an optional step argument that defaults to one.

  range(1,5) => [1,2,3,4]
  range(1,10,2) => [1,3,5,7,9]
  range(5,0,-1) => [5,4,3,2,1]
  range(100,1) => []
*/

const lesserThan=function(i,end) {
  return i<end;
}

const greaterThan=function(i,end) {
  return i>end;
}

const isInvalidRange=function(start,end,step) {
  let isStepZero = (step==0);
  let isPositiveDirectionWrong = start>end && step>0;
  let isNegativeDirectionWrong = start<end && step<0;
  return isStepZero || isPositiveDirectionWrong || isNegativeDirectionWrong;
}

const range=function(start,end,step=1) {
  let list=[];
  let compare=lesserThan;

  if(isInvalidRange(start,end,step))
    return list;

  if(step<0)
    compare=greaterThan;

  for (var i = start; compare(i,end); i+=step) {
    list.push(i);
  }
  return list;
}

exports.range=range;
