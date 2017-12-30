let mapRef=0;
let filterRef=0;
let reduceRef=0;
let reverseRef=0;
let concatRef=0;
let includesRef=0;
let someRef=0;
let everyRef=0;

let actualReverse=Array.prototype.reverse;
let actualIncludes=Array.prototype.includes;
let actualConcat=Array.prototype.concat;
let actualSome=Array.prototype.some;
let actualEvery=Array.prototype.every;

const genNewMap=function(theThis){
  return function(...args) {
    mapRef++;
    return Array.prototype.map.apply(theThis,args);
  }
}

function clobberMap(instance) {
  resetMapRefCount();
  instance.map=genNewMap(instance);
  return instance;
}

function restoreMap(instance) {
  resetMapRefCount();
  instance.map=Array.prototype.map;
}

function mapRefCount() {
  return mapRef;
}

function resetMapRefCount() {
  mapRef=0;
}



const genNewFilter=function(theThis){
  return function(...args) {
    filterRef++;
    return Array.prototype.filter.apply(theThis,args);
  }
}

function clobberFilter(instance) {
  resetFilterRefCount();
  instance.filter=genNewFilter(instance);
  return instance;
}

function restoreFilter(instance) {
  resetFilterRefCount();
  instance.filter=Array.prototype.filter;
}

function filterRefCount() {
  return filterRef;
}

function resetFilterRefCount() {
  filterRef=0;
}



const genNewReduce=function(theThis){
  return function(...args) {
    reduceRef++;
    return Array.prototype.reduce.apply(theThis,args);
  }
}

function clobberReduce(instance) {
  resetReduceRefCount();
  instance.reduce=genNewReduce(instance);
  return instance;
}

function restoreReduce(instance) {
  resetReduceRefCount();
  instance.reduce=Array.prototype.reduce;
}

function reduceRefCount() {
  return reduceRef;
}

function resetReduceRefCount() {
  reduceRef=0;
}


const genNewConcat=function(theThis){
  return function(...args) {
    concatRef++;
    return actualConcat.apply(theThis,args);
  }
}

function clobberConcat(instance) {
  resetConcatRefCount();
  instance.concat=genNewConcat(instance);
  return instance;
}

function restoreConcat(instance) {
  resetConcatRefCount();
  instance.concat=actualConcat;
}

function concatRefCount() {
  return concatRef;
}

function resetConcatRefCount() {
  concatRef=0;
}



const genNewReverse=function(theThis){
  return function(...args) {
    reverseRef++;
    return actualReverse.apply(theThis,args);
  }
}

function clobberReverse(instance) {
  resetReverseRefCount();
  instance.reverse=genNewReverse(instance);
  return instance;
}

function restoreReverse(instance) {
  resetReverseRefCount();
  instance.reverse=actualReverse;
}

function reverseRefCount() {
  return reverseRef;
}

function resetReverseRefCount() {
  reverseRef=0;
}


const genNewIncludes=function(theThis){
  return function(...args) {
    includesRef++;
    return actualIncludes.apply(theThis,args);
  }
}

function clobberIncludes(instance) {
  resetIncludesRefCount();
  instance.includes=genNewIncludes(instance);
  return instance;
}

function restoreIncludes(instance) {
  resetIncludesRefCount();
  instance.includes=actualIncludes;
}

function includesRefCount() {
  return includesRef;
}

function resetIncludesRefCount() {
  includesRef=0;
}

const genNewSome=function(theThis){
  return function(...args) {
    someRef++;
    return actualSome.apply(theThis,args);
  }
}

function clobberSome(instance) {
  resetSomeRefCount();
  instance.some=genNewSome(instance);
  return instance;
}

function restoreSome(instance) {
  resetSomeRefCount();
  instance.some=actualSome;
}

function someRefCount() {
  return someRef;
}

function resetSomeRefCount() {
  someRef=0;
}

const genNewEvery=function(theThis){
  return function(...args) {
    everyRef++;
    return actualEvery.apply(theThis,args);
  }
}

function clobberEvery(instance) {
  resetEveryRefCount();
  instance.every=genNewEvery(instance);
  return instance;
}

function restoreEvery(instance) {
  resetEveryRefCount();
  instance.every=actualEvery;
}

function everyRefCount() {
  return everyRef;
}

function resetEveryRefCount() {
  everyRef=0;
}


exports.clobberMap=clobberMap;
exports.restoreMap=restoreMap;
exports.mapRefCount=mapRefCount;
exports.resetMapRefCount=resetMapRefCount;

exports.clobberFilter=clobberFilter;
exports.restoreFilter=restoreFilter;
exports.filterRefCount=filterRefCount;
exports.resetFilterRefCount=resetFilterRefCount;

exports.clobberReduce=clobberReduce;
exports.restoreReduce=restoreReduce;
exports.reduceRefCount=reduceRefCount;
exports.resetReduceRefCount=resetReduceRefCount;

exports.clobberReverse=clobberReverse;
exports.restoreReverse=restoreReverse;
exports.reverseRefCount=reverseRefCount;
exports.resetReverseRefCount=resetReverseRefCount;

exports.clobberIncludes=clobberIncludes;
exports.restoreIncludes=restoreIncludes;
exports.includesRefCount=includesRefCount;
exports.resetIncludesRefCount=resetIncludesRefCount;

exports.clobberConcat=clobberConcat;
exports.restoreConcat=restoreConcat;
exports.concatRefCount=concatRefCount;
exports.resetConcatRefCount=resetConcatRefCount;

exports.clobberSome=clobberSome;
exports.restoreSome=restoreSome;
exports.someRefCount=someRefCount;
exports.resetSomeRefCount=resetSomeRefCount;

exports.clobberEvery=clobberEvery;
exports.restoreEvery=restoreEvery;
exports.everyRefCount=everyRefCount;
exports.resetEveryRefCount=resetEveryRefCount;
