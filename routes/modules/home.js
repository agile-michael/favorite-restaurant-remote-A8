const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean() // 把資料轉換成單純的 JS 物件, Promise(ES6)方法
    .sort({ _id: 'asc' }) // desc
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

module.exports = router