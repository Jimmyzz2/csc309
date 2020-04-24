// ###########################################
// Hoist with immediate invoked function expression
"use strict"
var s = 'hello';

(function() {
  console.log('Value before: ' + s);
  var s = 'hi';
  // s = 'hi';
  console.log('Value after: ' + s);
})();


var s = 'hello';
// The hoist
(function() {
  var s;
  console.log('Value before: ' + s);
  s = 'hi';
  console.log('Value after: ' + s);
})();
