const makeAdder = function(a){
    return function(num){
        return a + num;
    }
}

var addTwo = makeAdder(2) 
console.log(addTwo(3)) // 5
var addThree = makeAdder(3)
console.log(addThree(4)) // 7
console.log(addThree(4)) // 7 (doesn’t keep adding)

const makeAdder1 = function(a){
    return function(num){
        a = a + num;
        return a;
    };
}

addTwo = makeAdder1(2);
console.log(addTwo(3)) // 5
addThree = makeAdder1(3);
console.log(addThree(4)) // 7
console.log(addThree(4)) // 11 ( keep adding)
