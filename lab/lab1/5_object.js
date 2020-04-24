// ################
// Basic object example 
// "use strict"
const getName = function () {
	return this.name
}
const student = {
	name: "James",
	myName: getName
}

student.myName(); //James
ourGetName = student.myName;
console.log(ourGetName()); //undefined
ourGetName.bind(student)(); //James
ourGetName.call(student); // different way to call 
console.log(ourGetName.bind(student)())
console.log(ourGetName.call(student))