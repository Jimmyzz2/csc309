//promises Micro task queue example 1
// can show how callback queue works with promises
// (not necessary that they know this, just interesting)
setTimeout(function(){
    console.log("1st setTimeout")
  },0)
  
  var promise = new Promise(function(resolve, reject){
      resolve("Synchronous call")
  })
  
  promise.then(function(value){
    console.log(value + " : promise fulfilled")
  })
  
  setTimeout(function(){
    console.log("2nd setTimeout")
  },0)
  