"use strict";

/* Variables/scope/hoisting */

// Precedence in hoisting

console.log(typeof foo); // error or output?
foo(); // error or output?
console.log(foo);
// Below we have *two* functions named foo, and a variable declared with var.
//  How will hoisting of the declarations below affect the
//  output of the lines of code above?
function foo() {
    console.log( 1 );
}
function foo() {
    console.log( 2 );
}

var foo = 3;