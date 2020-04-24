//promises Micro task queue example 2
setTimeout(function(){
console.log("1st setTimeout")
},0)

var promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){resolve("Fulfilled - ")},0)
});

setTimeout(function(){
    console.log("2nd setTimeout")
},0)

for (var i = 1; i <= 5; i++) {
    (function(j){
        promise2.then(function(value){
            console.log(value + j)
        });
    })(i)
}