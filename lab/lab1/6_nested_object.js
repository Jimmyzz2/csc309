// #########################
// Nested objects
"use strict"
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

//console.log(students.student1.myName());
//console.log(students.student2.myName());
console.log(getName.bind(students.student1)())
console.log(getName.bind(students.student2)())
var name1 = getName.bind(students.student1);
console.log(name1());
