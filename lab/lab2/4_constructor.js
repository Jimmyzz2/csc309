function Toyota(color, type, seats) {
	 this.brand = 'Toyota'
	this.color = color
	this.type = type
	this.seats = seats
}

const car = {
    type: 'car', // a default car type
    describe: function() {  
     console.log(`This is a ${this.color} ${this.brand} ${this.type} that has ${this.seats} seats.`);
  } 
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
// myToyota.__proto__.describe()
// Toyota.prototype.describe()
Toyota.prototype.describe.bind(mySecondToyota)()

/// object.create
// Attach a delegate prototype using Object.create
const myThirdToyota = Object.create(car) // add the car prototype to the object
// const myThirdToyota = car // add the car prototype to the object
Toyota.bind(myThirdToyota)('red', 'minivan', 7) // call Toyota constructor on car
myThirdToyota.describe()
myThirdToyota.add = 10;
console.log(car.add);
console.log(myToyota.add);