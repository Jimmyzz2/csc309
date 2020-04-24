// Returning nested functions that keep along 
// their arguments to use in the final result.
//  - also known as "currying".
function evaluate(x) {
	return (y) => {
		return (z) => {
			return x + y * z;
		};
	};
}
console.log(evaluate(3)(5)(10)) // output?

// this binding, Immediately Invoked functions.
const myObject = {
    boo: "bar",
    func: function() {
        const self = this;
        console.log(this);
        console.log("outer func:  this.boo = " + this.boo);
        console.log("outer func:  self.boo = " + self.boo);
        (function() {
            console.log("inner func:  this.boo = " + this.boo);
            console.log("inner func:  self.boo = " + self.boo);
        })(); //this.boo will output undefined. how can we fix it?

        // we can bind this:
        (function() {
            console.log("inner func:  this.boo = " + this.boo);
            console.log("inner func:  self.boo = " + self.boo);
        }).bind(this)(); // will define this.
    }
};
// myObject.func(); //output?
const k = myObject.func
k() // output?
