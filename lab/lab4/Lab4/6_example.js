// Paridhika: Object.constructor vs. Object.prototype

function MyObject(name) {
    this.name = name.toString();
    // this.getMessage = function() {
    //   return "I am " + this.name;
    // };
}
MyObject.getMessage = function () {
    return "Changed Message: I am " + this.name;
};
var obj1 = new MyObject("Jack");
// console.log(obj1.getMessage()); // Error getMessage is added inside the constructor
console.log(obj1.constructor === MyObject); // true
console.log(obj1.constructor.getMessage()); // Changed Message: I am MyObject
MyObject.getMessage = function () {
    return "Changed Message: I am " + this.name;
}.bind(new MyObject("Jill"));
console.log(obj1.constructor.getMessage()); // Changed Message: I am Jill
console.log(obj1.constructor.prototype === MyObject.prototype);
MyObject.prototype.getMessage = function () {
    return "From prototype: I am " + this.name;
};
console.log(obj1.getMessage()); // From prototype: I am Jack
console.log(obj1.constructor.prototype.getMessage()); // From prototype: I am undefined
MyObject.prototype.getMessage = function () {
    return "From prototype: I am " + this.name;
}.bind(new MyObject("John"));
console.log(obj1.constructor.prototype.getMessage()); // From prototype: I am John