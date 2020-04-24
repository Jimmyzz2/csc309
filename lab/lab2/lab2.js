/* Lab 2 JS */
'use strict';

///// Go through the examples slowly and carefully.  Give them time to digest and understand.
// Give them time for questions


// Prototypes 

/*   
I would start off by giving an explanation of the differences between class and prototypal inheritance.
They're all familiar with what goes on in Java, and some of them are likely still confused as to how it's different.
I'll leave it mostly to you on how you'd like to explain it, but you should include points like:

- class inheritance relies on a blueprint for the class (the class code), and then an instance is created
using that class code.
- prototypal inheritance relies on objects delegating to other objects - instances are not created from a blueprint,
but rather one instance uses another instance as its property delegate if those properites cannot be found

Make sure you always remind them that javascipt does not have classes the same way java does - they will likely still be
thinking that at this point.
 */


// We are a Toyota factory

 // Remind them of creating object literals
const toyota = {
  brand: 'Toyota',
  color: 'red',
  type: 'sedan',
  seats: 5,
  
};

// We will now make a car object that will act as a prototype

const car = {
	type: 'car', // a default car type
    describe: function() {  
     console.log(`This is a ${this.color} ${this.brand} ${this.type} that has ${this.seats} seats.`);
  } // I will teach them about string templates later, but do introduce them.
}

Object.setPrototypeOf(toyota, car) // not usually done in production code, but important to understand

toyota.describe()
// show in console that __proto__ is now the car object

// also show them that:
console.log(toyota.__proto__ === car) // true
// you can do an equality like the above with the objects below as well throughout the lab
// to remind them what's happening

/// Now explain to them that usually we don't use setPrototypeOf, and
// instead, we can create a 'constructor' function (not like in Java), to create an 'instance'

function Toyota(color, type, seats) {
	this.brand = 'Toyota'
	this.color = color
	this.type = type
	this.seats = seats
}

// We are setting the prototype of the constructor function
Toyota.prototype = car // car will get set to Toyota's __proto__

const myToyota = new Toyota('black', 'SUV', 7)
myToyota.describe()

const mySecondToyota = new Toyota('lime green', 'convertible', 2)
mySecondToyota.describe()

// Add to the prototype a function for car
car.seatsFive = function() {
	return this.seats >= 5
}

// show that both cars now have the seatsFive method - they delegate to the same object
console.log(myToyota.seatsFive())
console.log(mySecondToyota.seatsFive())

// quiz: what do these do? why?
myToyota.__proto__.describe()
Toyota.prototype.describe()
Toyota.prototype.describe.bind(mySecondToyota)()

/// object.create
// Attach a delegate prototype using Object.create
const myThirdToyota = Object.create(car) // add the car prototype to the object
Toyota.bind(myThirdToyota)('red', 'minivan', 7) // call Toyota constructor on car
myThirdToyota.describe()



// classes, what is really going on 
class CarClass {}
console.log(typeof(CarClass)) // it's a function - the constructor
console.dir(CarClass) // show what's going on in the console - it has a prototype property

// Let's use another name
class Auto {
	constructor() {
		this.type = 'car'
	}

	describe() {	
	   console.log(`This is a ${this.color} ${this.brand} ${this.type} that has ${this.seats} seats.`);
	}
}

console.dir(Auto)
/// Show the prototype in the console
 
class Tesla extends Auto {  // explain that extends just sets the prototype
	constructor(color, type, seats) {
		super()
		this.brand = 'Tesla'
		this.color = color
		this.type = type
		this.seats = seats
	}
}

console.dir(Tesla)
/// Show the prototype in the console

const myTesla = new Tesla('grey', 'crossover', 5)
myTesla.describe()

console.log(myTesla) // show __proto__ in the console

// At this point, show them anything else you'd like - maybe quiz them on what happens when you change
// some of the prototypes of the class creating functions.
// remind them that all 'instance variables' are public, and we can change anything at will

// Answer any lingering questions



