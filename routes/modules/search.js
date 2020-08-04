const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// Search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  if (keyword === '') return
  // keyword = keyword.toLowerCase()
  // console.log(`keyword = ${keyword}`)
  return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then((restaurants) => res.render('index', { restaurants: restaurants, keyword }))
    .catch((error) => console.log(error))
})

module.exports = router