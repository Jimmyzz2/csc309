"use strict"
// Why can't we get the console to log any of the a's?
function foo() {
	var a = 7;
	function bar() {
		// var a is hoisted here 
		console.log(a);
		var a = 3;
    }
	bar();
}
foo();