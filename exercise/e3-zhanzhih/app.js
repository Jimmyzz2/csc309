/* E3 app.js */
'use strict';
const log = console.log
const yargs = require('yargs').option('addRest', {
    type: 'array' // Allows you to have an array of arguments for particular command
  }).option('addResv', {
    type: 'array' 
  }).option('addDelay', {
    type: 'array' 
  })

const reservations = require('./reservations');

// datetime available if needed
const datetime = require('date-and-time')
require('date-and-time/plugin/meridiem');
datetime.plugin('meridiem');


const yargs_argv = yargs.argv
//log(yargs_argv) // uncomment to see what is in the argument array

if ('addRest' in yargs_argv) {
	const args = yargs_argv['addRest']
	const rest = reservations.addRestaurant(args[0], args[1]);	
	if (rest.length > 0) {
		/* complete */ 
		log(`Added restaurant ${args[0]}.`)
	} else {
		/* complete */ 
		log('Duplicate restaurant not added.')
	}
}

if ('addResv' in yargs_argv) {
	const args = yargs_argv['addResv']
	const resv = reservations.addReservation(args[0], args[1], args[2]);

	// Produce output below
	log(`Added reservation at ${resv.restaurant} on ${datetime.format(resv.time, 'MMM DD YYYY')} at ${datetime.format(resv.time, 'h:mm aa')} for ${resv.people} people.`)
}

if ('allRest' in yargs_argv) {
	const restaurants = reservations.getAllRestaurants(); // get the array
	
	// Produce output below
	restaurants.forEach( rest => 
		log(`${rest.name}: ${rest.description} - ${rest.numReservations} active reservations`)
		)
}

if ('restInfo' in yargs_argv) {
	const restaurants = reservations.getRestaurantByName(yargs_argv['restInfo']);
	if (restaurants !== null) {
	// Produce output below
		log(`${restaurants.name}: ${restaurants.description} - ${restaurants.numReservations} active reservations`)	
	}

	

}

if ('allResv' in yargs_argv) {
	const restaurantName = yargs_argv['allResv']
	const reservationsForRestaurant = reservations.getAllReservationsForRestaurant(restaurantName); // get the arary
	
	// Produce output below
	if (reservationsForRestaurant.length >= 1) {
		log(`Reservations for ${reservationsForRestaurant[0].restaurant}:`)
		reservationsForRestaurant.forEach( resv => 
			log(`- ${datetime.format(resv.time, 'MMM DD YYYY, h:mm aa')}, table for ${resv.people}`)
		)
	}
}

if ('hourResv' in yargs_argv) {
	const time = yargs_argv['hourResv']
	const reservationsForRestaurant = reservations.getReservationsForHour(time); // get the arary
	
	// Produce output below
	log('Reservations in the next hour:')
	reservationsForRestaurant.forEach( resv => 
		log(`- ${resv.restaurant}: ${datetime.format(resv.time, 'MMM DD YYYY, h:mm aa')}, table for ${resv.people}`)
		)

}

if ('checkOff' in yargs_argv) {
	const restaurantName = yargs_argv['checkOff']
	const earliestReservation = reservations.checkOffEarliestReservation(restaurantName); 
	
	// Produce output below
	if (earliestReservation !== null) {
		log(`Checked off reservation on ${datetime.format(earliestReservation.time, 'MMM DD YYYY, h:mm aa')}, table for ${earliestReservation.people}`)
	}

}

if ('addDelay' in yargs_argv) {
	const args = yargs_argv['addDelay']
	const resv = reservations.addDelayToReservations(args[0], args[1]);	

	if (resv.length >= 1) {
	// Produce output below
	log(`Reservations for ${resv[0].restaurant}:`)
	resv.forEach( r => 
		log(`- ${datetime.format(r.time, 'MMM DD YYYY, h:mm aa')}, table for ${r.people}`)
		)
	}

	
}

if ('status' in yargs_argv) {
	const status = reservations.getSystemStatus()
	log(`Number of restaurants: ${status.numRestaurants}`)
	log(`Number of total reservations: ${status.totalReservations}`)
	log(`Busiest restaurant: ${status.currentBusiestRestaurantName}`)
	log(`System started at: ${datetime.format(new Date(status.systemStartTime), 'MMM DD YYYY, h:mm aa')}`)
	// Produce output below
}
