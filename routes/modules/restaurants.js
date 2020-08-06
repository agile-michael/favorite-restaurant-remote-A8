const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 新增(New)(Create)
router.get('/new', (req, res) => {
  // console.log(req)
  return res.render('new')
})

router.post('/', (req, res) => {
  // console.log(req.body)
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽 (Read) (Detail)
router.get('/:_id', (req, res) => {
  // console.log(req.params._id)
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Edit
router.get('/:_id/edit', (req, res) => {
  // console.log(req.params)
  const id = req.params._id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router