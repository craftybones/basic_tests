let splitRef=0;
let trimRef=0;
let TrimLeftRef=0;
let RightTrimRef=0;

let actualSplit=String.prototype.split;
let actualTrim=String.prototype.trim;
let actualTrimLeft=String.prototype.trimLeft;
let actualTrimRight=String.prototype.trimRight;

const genNewSplit=function(theThis){
  String.prototype.split=function(...args) {
    splitRef++;
    return actualSplit.apply(this,args);
  }
}

function clobberSplit(instance) {
  resetSplitRefCount();
  genNewSplit(instance);
  return instance;
}

function restoreSplit(instance) {
  resetSplitRefCount();
  String.prototype.split=actualSplit;
}

function splitRefCount() {
  return splitRef;
}

function resetSplitRefCount() {
  splitRef=0;
}


const genNewTrim=function(theThis){
  String.prototype.trim=function(...args) {
    trimRef++;
    return actualTrim.apply(this,args);
  }
}

function clobberTrim(instance) {
  resetTrimRefCount();
  genNewTrim(instance);
  return instance;
}

function restoreTrim(instance) {
  resetTrimRefCount();
  String.prototype.trim=actualTrim;
}

function trimRefCount() {
  return trimRef;
}

function resetTrimRefCount() {
  trimRef=0;
}

const genNewTrimLeft=function(theThis){
  String.prototype.trimLeft=function(...args) {
    trimLeftRef++;
    return actualTrimLeft.apply(this,args);
  }
}

function clobberTrimLeft(instance) {
  resetTrimLeftRefCount();
  genNewTrimLeft(instance);
  return instance;
}

function restoreTrimLeft(instance) {
  resetTrimLeftRefCount();
  String.prototype.trimLeft=actualTrimLeft;
}

function trimLeftRefCount() {
  return trimLeftRef;
}

function resetTrimLeftRefCount() {
  trimLeftRef=0;
}


const genNewTrimRight=function(theThis){
  String.prototype.trimRight=function(...args) {
    trimRightRef++;
    return actualTrimRight.apply(this,args);
  }
}

function clobberTrimRight(instance) {
  resetTrimRightRefCount();
  genNewTrimRight(instance);
  return instance;
}

function restoreTrimRight(instance) {
  resetTrimRightRefCount();
  String.prototype.trimRight=actualTrimRight;
}

function trimRightRefCount() {
  return trimRightRef;
}

function resetTrimRightRefCount() {
  trimRightRef=0;
}



exports.clobberSplit=clobberSplit;
exports.restoreSplit=restoreSplit;
exports.splitRefCount=splitRefCount;
exports.resetSplitRefCount=resetSplitRefCount;

exports.clobberTrim=clobberTrim;
exports.restoreTrim=restoreTrim;
exports.trimRefCount=trimRefCount;
exports.resetTrimRefCount=resetTrimRefCount;

exports.clobberTrimLeft=clobberTrimLeft;
exports.restoreTrimLeft=restoreTrimLeft;
exports.trimLeftRefCount=trimLeftRefCount;
exports.resetTrimLeftRefCount=resetTrimLeftRefCount;

exports.clobberTrimRight=clobberTrimRight;
exports.restoreTrimRight=restoreTrimRight;
exports.trimRightRefCount=trimRightRefCount;
exports.resetTrimRightRefCount=resetTrimRightRefCount;
