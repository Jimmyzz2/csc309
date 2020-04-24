// Lab 1: Javascript

// #############################
// Variable hoisting: start easy:

// Why can't we get the console to log any of the a's?
function foo() {
	var a = 7;
	function bar() {
		// var a is hoisted here (don't write this until after)
		console.log(a)
		var a = 3
	}

	bar();
}

foo();


// ######################################
// Function hoisting example
var b = 4;
function f() {
  
  b = 7;
  
  return b; // return prior to declaring function b()

  function b() {}
}

a = f();
console.log(b); // 4
console.log(a); // 7

// function b() {} gets hoisted to the top of the 
// f() function scope: 
// Show the hoist of the above example:
function f() {
  // Hoisted b function definition
  function b() {}
  
  b = 10;
  return b;
}

// ###########################################
// Hoist with immediate invoked function expression

var s = 'hello';

(function() {
  console.log('Value before: ' + s);
  var s = 'hi';
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

// #####################
/// Closure example
// this function makes a function that appends the argument to a string
const stringAdder = function() {
	let x = "";
	return function(s) {
		x = x + s
		return x;
	}
}

adder = stringAdder();
adder("U")
adder("of")
adder("T")

// ################
// Basic object example (make sure they understand this)

const getName = function () {
	return this.name
}
const student = {
	name: "James",
	myName: getName
}

student.myName(); //James
ourGetName = student.myName;
ourGetName(); //undefined
ourGetName.bind(student)(); //James
ourGetName.call(student); // different way to call 

// #########################
// Nested objects
const students = {
	student1: {
		name: "James",
		myName: getName
	},
	student2: {
		name: "Jen",
		myName: getName
	} 
}

students.student1.myName();
students.student2.myName();
getName.bind(students.student1)

// ##############################
// Object scope example

const myObject = {
    myVar: "bar",
    func: function() {
        const a = 5;
        (function() {
            console.log("this.myVar = " + this.myVar); // undefined, 'this' isn't context of myObject
            console.log("a = " + a); // 5
        })()
        //  }).bind(this)()   // bind it (replace last line), and 'bar' appears
     }
};
myObject.func(); 

// ###################################

// Let them know there is a handout on the course website to try.










