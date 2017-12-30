const skipIfNotPresent=function(fnToCheck) {
  return function(){
    if(!fnToCheck)
      this.skip();
  }
}

module.exports=skipIfNotPresent;
