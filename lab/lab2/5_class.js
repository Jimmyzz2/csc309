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

Auto.add = 10;
const myToyota = new Tesla('blue', '', 6);
// myTesla.__proto__ = Auto;
console.log(myTesla.add)
console.log(myToyota.add)
console.log(Auto.add);

