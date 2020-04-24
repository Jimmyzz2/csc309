const toyota = {
    brand: 'Toyota',
    color: 'red',
    type: 'sedan',  // comment this to set type as car
    seats: 5,
    
  };
  
  // We will now make a car object that will act as a prototype
  
  const car = {
      type: 'car', // a default car type
      describe: function() {  
       console.log(`This is a ${this.color} ${this.brand} ${this.type} that has ${this.seats} seats.`);
    } 
  }
  
  // toyota.__proto__ = car;
  Object.setPrototypeOf(toyota, car) 
  
  toyota.describe()
  
  console.log(toyota.__proto__ === car) 
  
  //console.log(toyota.type);