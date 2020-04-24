// ######################################
// Function hoisting example
"use strict"
var b = 4;
function f() {
  b = 7;
  return b; // return prior to declaring function b()
  function b() {}
}

var a = f();
console.log(b); // 4
console.log(a); // 7

// function b() {} gets hoisted to the top of the 
// f() function scope: 
// Show the hoist of the above example:
function f() {
  // Hoisted b function definition
  function b() {}
  b = 7;
  return b;
}
