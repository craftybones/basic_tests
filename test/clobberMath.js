let maxRef=0;
let oldMax;

const newMax=function(...args) {
  maxRef++;
  return oldMax.apply(Math,args);
}

function clobberMax() {
  oldMax=Math.max;
  Math.max=newMax;
}

function restoreMax() {
  resetMaxRefCount();
  Math.max=oldMax;
}

function maxRefCount() {
  return maxRef;
}

function resetMaxRefCount() {
  maxRef=0;
}

exports.clobberMax=clobberMax;
exports.restoreMax=restoreMax;
exports.maxRefCount=maxRefCount;
exports.resetMaxRefCount=resetMaxRefCount;
