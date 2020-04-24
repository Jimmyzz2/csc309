// #####################
/// Closure example
// this function makes a function that appends the argument to a string
"use strict"
const stringAdder = function() {
	let x = "";
	return function(s) {
		x = x + s
		return x;
	}
}

var adder = stringAdder();
adder("U")
adder("of")
adder("T")
console.log(adder(""));