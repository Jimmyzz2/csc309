/* E4 server.js */
'use strict';
const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Restaurant } = require('./models/restaurant')


/// Route for adding restaurant, with *no* reservations (an empty array).
/* 
Request body expects:
{
	"name": <restaurant name>
	"description": <restaurant description>
}
Returned JSON should be the database document added.
*/
// POST /restaurants
app.post('/restaurants', (req, res) => {
	// Add code here
	const restaurant = new Restaurant({
		name: req.body.name,
		description: req.body.description,
		reservations: []
	})

	// save restaurant to the database
	restaurant.save().then((result) => {
		res.send(result)		
	}, (error) => {
		res.status(400).send(error) // bad request
	})
})


/// Route for getting all restaurant information.
// GET /restaurants
app.get('/restaurants', (req, res) => {
	// Add code here
	Restaurant.find().then((restaurants) => {
		res.send({ restaurants })
	}, (error) => {
		res.status(500).send(error) // server error 
	})
})


/// Route for getting information for one restaurant.
// GET /restaurants/id
app.get('/restaurants/:id', (req, res) => {
	// Add code here
	const id = req.params.id 
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send(error)
	})

})


/// Route for adding reservation to a particular restaurant.
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the updated restaurant database 
//   document that the reservation was added to, AND the reservation subdocument:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// POST /restaurants/id
app.post('/restaurants/:id', (req, res) => {
	// Add code here
	const id = req.params.id 
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			const reservation = {
				time: req.body.time,
				people: req.body.people
			}

			restaurant.reservations.push(reservation)
			// save 
			restaurant.save().then((result) => {
			res.send({
				reservation: reservation,
				restaurant: restaurant
			})		
			}, (error) => {
				res.status(400).send(error) // bad request
			})
		}
	}).catch((error) => {
		res.status(500).send(error)
	})

})


/// Route for getting information for one reservation of a restaurant (subdocument)
// GET /restaurants/id
app.get('/restaurants/:id/:resv_id', (req, res) => {
	// Add code here
	const id = req.params.id 
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			const resv_id = req.params.resv_id
			if (!ObjectID.isValid(resv_id)) {
				res.status(404).send()
				return;
			}
			const resv = restaurant.reservations.find(resv => JSON.stringify(resv_id) === JSON.stringify(resv._id))
			if (!resv) {
				res.status(404).send()
				return;	
			} else {
				res.send(resv)
			}
		}
	}).catch((error) => {
		res.status(500).send(error)
	})

})


/// Route for deleting reservation
// Returned JSON should have the updated restaurant database
//   document from which the reservation was deleted, AND the reservation subdocument deleted:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// DELETE restaurant/<restaurant_id>/<reservation_id>
app.delete('/restaurants/:id/:resv_id', (req, res) => {
	// Add code here
	const id = req.params.id 
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			const resv_id = req.params.resv_id
			if (!ObjectID.isValid(resv_id)) {
				res.status(404).send()
				return;
			}
			const resv = restaurant.reservations.find(resv => JSON.stringify(resv_id) === JSON.stringify(resv._id))
			if (!resv) {
				res.status(404).send()
				return;	
			} else {
				// delete the reservation from the restaurant
				restaurant.reservations.splice(restaurant.reservations.indexOf(resv), 1)
			// save 
				restaurant.save().then((result) => {
				res.send({
					reservation: resv,
					restaurant: restaurant
				})		
				}, (error) => {
					res.status(400).send(error) // bad request
				})
			}
		}
	}).catch((error) => {
		res.status(500).send(error)
	})

})


/// Route for changing reservation information
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the updated restaurant database
//   document in which the reservation was changed, AND the reservation subdocument changed:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// PATCH restaurant/<restaurant_id>/<reservation_id>
app.patch('/restaurants/:id/:resv_id', (req, res) => {
	// Add code here
	const id = req.params.id 
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			const resv_id = req.params.resv_id
			if (!ObjectID.isValid(resv_id)) {
				res.status(404).send()
				return;
			}
			const resv = restaurant.reservations.find(resv => JSON.stringify(resv_id) === JSON.stringify(resv._id))
			if (!resv) {
				res.status(404).send()
				return;	
			} else {
				// update the reservation from the restaurant
				resv.time = req.body.time
				resv.people = req.body.people
			// save 
				restaurant.save().then((result) => {
				res.send({
					reservation: resv,
					restaurant: restaurant
				})		
				}, (error) => {
					res.status(400).send(error) // bad request
				})
			}
		}
	}).catch((error) => {
		res.status(500).send(error)
	})

})


////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
