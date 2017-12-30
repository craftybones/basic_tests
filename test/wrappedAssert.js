const assert=require("chai").assert;

function separator() {
  return ":::::";
}

function testMessage(args) {
  let joined=args.join("  |  ");
  return `${joined} ${separator()}`;
}

assert._isOk=function(func,...allArgs) {
  let message=testMessage(allArgs);
  this.isOk(func.apply(this,allArgs),message);
}

assert._isNotOk=function(func,...allArgs) {
  let message=testMessage(allArgs);
  this.isNotOk(func.apply(this,allArgs),message);
}

assert._equal=function(expected,func,...allArgs) {
  let message=testMessage(allArgs);
  this.equal(expected,func.apply(this,allArgs),message);
}

assert._deepEqual=function(expected,func,...allArgs) {
  let message=testMessage(allArgs);
  this.deepEqual(expected,func.apply(this,allArgs),message);
}

assert._sameMembers=function(expected,func,...allArgs) {
  let message=testMessage(allArgs);
  this.sameMembers(expected,func.apply(this,allArgs),message);
}

module.exports=assert;
