/* Reservations.js */ 
'use strict';


const log = console.log
const fs = require('fs');
const datetime = require('date-and-time')

const startSystem = () => {

	let status = {};

	try {
		status = getSystemStatus();
	} catch(e) {
		status = {
			numRestaurants: 0,
			totalReservations: 0,
			currentBusiestRestaurantName: null,
			systemStartTime: new Date(),
		}

		fs.writeFileSync('status.json', JSON.stringify(status))
	}

	return status;
}

/*********/


// You may edit getSystemStatus below.  You will need to call updateSystemStatus() here, which will write to the json file
const getSystemStatus = () => {
	const status = fs.readFileSync('status.json')
	updateSystemStatus()
	return JSON.parse(status)
}

/* Helper functions to save JSON */
// You can add arguments to updateSystemStatus if you want.
const updateSystemStatus = () => {
	
	/* Add your code below */
	let oldStatusString 
	let oldStatus
	// get old status
	try {
		oldStatusString = fs.readFileSync("status.json")
		oldStatus = JSON.parse(oldStatusString)
	} catch (err) {
		return null
	}

	// change new status
	const reservations = getAllReservations()
	const restaurants = getAllRestaurants()
	restaurants.sort(function (a, b) {
		return a.numReservations > b.numReservations ? -1 : 0
	})
	let currentBusiestRestaurantName = '' 
	if (restaurants.length >= 1) {
		currentBusiestRestaurantName = restaurants[0].name
	}
	const status = {
		numRestaurants: restaurants.length,
		totalReservations: reservations.length,
		currentBusiestRestaurantName: currentBusiestRestaurantName,
		systemStartTime: oldStatus.systemStartTime,
	}
	fs.writeFileSync('status.json', JSON.stringify(status))
}

const saveRestaurantsToJSONFile = (restaurants) => {
	/* Add your code below */
	const restaurantsString = JSON.stringify(restaurants)
	try {
		fs.writeFileSync("restaurants.json", restaurantsString)
	} catch (err) {
		log("cannot save to restaurants.json")
		return 
	}
};

const saveReservationsToJSONFile = (reservations) => {
	/* Add your code below */
	reservations.sort( function (a,b) {
		return a.time.getTime < b.time.getTime ? -1 : 1 
	})
	const reservationsString = JSON.stringify(reservations)
	try {
		fs.writeFileSync("reservations.json", reservationsString)
	} catch (err) {
		log("cannot save to reservations.json")
		return
	}


};

/*********/

// Should return an array of length 0 or 1.
const addRestaurant = (name, description) => {
	// get all the restaurants from restaurants.json
	const restaurantsParsed = getAllRestaurants();
	// Check for duplicate names
	const restaurantWithName = getRestaurantByName(name)
	if (restaurantWithName !== null) {
		return []
	}
	
	// if no duplicate names:
	const restaurant = {
		name,
		description,
		numReservations: 0 
	} 	
	restaurantsParsed.push(restaurant)
	// write back to restaurants.json
	saveRestaurantsToJSONFile(restaurantsParsed)
	return [restaurant];

}

// should return the added reservation object
const addReservation = (restaurant, time, people) => {
	
	// get all reservations and restaurants
	const reservationsParsed = getAllReservations()
	const restaurantsParsed = getAllRestaurants()
	// $ node app.js --addResv  "Red Lobster" "Mar 17 2019 17:15:00" 5
	// "2018-11-17T17:15:00.000Z"
	
	/* Add your code below */
	
	const pattern = datetime.compile('MMM DD YYYY HH:mm:ss')
	const formatTime = datetime.parse(time, pattern)
	const reservation = {
		restaurant,
		time: formatTime, 
		people: parseInt(people)
	}
	reservationsParsed.push(reservation)

	// add numReservation to restaurant in restauratns.json
	for (let i = 0; i < restaurantsParsed.length; i++) {
		if (restaurantsParsed[i].name === restaurant) {
			restaurantsParsed[i].numReservations += 1
		}
	}
	// write back to reservations.json and restaurants.json
	saveRestaurantsToJSONFile(restaurantsParsed)
	saveReservationsToJSONFile(reservationsParsed)
	return reservation;



}


/// Getters - use functional array methods when possible! ///

// Should return an array - check to make sure restaurants.json exists
const getAllRestaurants = () => {
	/* Add your code below */
	let restaurantsJSONString;
	let restaurantsParsed;
	try {
		restaurantsJSONString = fs.readFileSync('restaurants.json')
		restaurantsParsed = JSON.parse(restaurantsJSONString)
	} catch (err) {
		// log("There is no restaurants.json in current working directory or it is empty")
		return [];
	}
	return restaurantsParsed

};

// Should return the restaurant object if found, or an empty object if the restaurant is not found.
const getRestaurantByName = (name) => {
	/* Add your code below */
	const restaurantsParsed = getAllRestaurants() 
	for (let i = 0; i < restaurantsParsed.length; i++) {
		if (name === restaurantsParsed[i].name) {
			return restaurantsParsed[i];
		}
	}
	return null
};

// Should return an array - check to make sure reservations.json exists
const getAllReservations = () => {
  /* Add your code below */
	let reservationsJSONString 
	let reservationsParsed 
	try {
		reservationsJSONString = fs.readFileSync('reservations.json')
		reservationsParsed = JSON.parse(reservationsJSONString)
	} catch (err) {
		// log('There is not reservations.json in current working directory or it is empty')
		return []
	}	
	for (let i = 0; i < reservationsParsed.length; i++) {
		reservationsParsed[i].time = new Date(reservationsParsed[i].time)
	}
	// sort 
	reservationsParsed.sort(function (a, b){
		return a.time.getTime() < b.time.getTime() ? -1 : 1
	})
	return reservationsParsed
};

// Should return an array
const getAllReservationsForRestaurant = (name) => {
	/* Add your code below */
	const reservationsParsed = getAllReservations()
	const reservationsForRestaurant = []
	for (let i = 0; i < reservationsParsed.length; i++ ){
		if (reservationsParsed[i].restaurant === name ) {
			reservationsForRestaurant.push(reservationsParsed[i])
		}
	}

	return reservationsForRestaurant
};


// Should return an array
const getReservationsForHour = (time) => {
	/* Add your code below */
	// create new array
	const reservationsForHour = []
	const reservationsParsed = getAllReservations()
	// Mar 17 2019 16:30:00 
	const pattern = datetime.compile('MMM DD YYYY HH:mm:ss')
	const inputTimeParsed = datetime.parse(time, pattern)
	for (let i = 0; i < reservationsParsed.length; i++) {
		// check inputTime next hour from  
		let reservationTime = reservationsParsed[i].time
		if ( (reservationTime.getTime() - inputTimeParsed.getTime()) / 1000 <= 3599	
		 && (reservationTime.getTime() - inputTimeParsed.getTime()) / 1000 >= 0
			) {
			reservationsForHour.push(reservationsParsed[i])
			}
	}
	return reservationsForHour
	


}

// should return a reservation object
const checkOffEarliestReservation = (restaurantName) => {
	// get all restaurants and reservations 
	const restaurants = getAllRestaurants()
	const reservations = getAllReservations()

	// find the reservations we want 
	const reservationsForRestaurant = getAllReservationsForRestaurant(restaurantName)
	
	// find the reservation for restaurant with earliest time
	if (reservationsForRestaurant.length === 0) {
		return null 
	}
	const checkedOffReservation = reservationsForRestaurant[0]

	// delete the reservation for restaurant with earliest time from json file 
	
	
	
	let index;
	for (let i= 0; i < reservations.length; i++) {
		if (reservations[i].restaurant === checkOffEarliestReservation.restaurant
			&& reservations[i].time === checkOffEarliestReservation.time
			&& reservations[i].people === checkOffEarliestReservation.people
			){
				index = i
			}

		
	}

	reservations.splice(index, 1)

	// deducte 1 from restaurant numReservations 
	for (let i = 0; i < restaurants.length; i++) {
		if (restaurants[i].name === restaurantName) {
			restaurants[i].numReservations -= 1
		}
	}

	// save both restaurants and reservations
	saveRestaurantsToJSONFile(restaurants)
	saveReservationsToJSONFile(reservations)
	return checkedOffReservation
}


const addDelayToReservations = (restaurant, minutes) => {
	// Hint: try to use a functional array method
	// get all reservations 
	const reservations = getAllReservations()
	
	const reservationsForRestaurant = []
	// add minutes to any reservations with restaurant 
	for (let i = 0; i < reservations.length; i++) {
		if (reservations[i].restaurant === restaurant) {
			reservations[i].time= datetime.addMinutes(reservations[i].time, minutes)
			reservationsForRestaurant.push(reservations[i])
		}
	}
	// save to the reservations file 
	saveReservationsToJSONFile(reservations)
	return reservationsForRestaurant
	
}

startSystem(); // start the system to create status.json (should not be called in app.js)
// May not need all of these in app.js..but they're here.
module.exports = {
	addRestaurant,
	getSystemStatus,
	getRestaurantByName,
	getAllRestaurants,
	getAllReservations,
	getAllReservationsForRestaurant,
	addReservation,
	checkOffEarliestReservation,
	getReservationsForHour,
	addDelayToReservations
}


// some tests here 
// addRestaurant("MC", "cheap fries")
// addReservation("Red Lobster", "Mar 17 2019 17:15:00", 5)
// log(getReservationsForHour('Nov 17 2018 13:31:00'))
// log(checkOffEarliestReservation("Red Lobster"))

// addReservation("Red Lobster", "Mar 17 2019 17:15:00", 5)
// addReservation("Red Lobster", "Mar 18 2019 17:15:00", 5)
// addReservation("Red Lobster", "Mar 19 2019 17:15:00", 5)
// getAllReservations()







// task 
// 1. test save Reservation.time  finish 
// 2. handle I/O errors