const express = require("express")
const shoe_routes = require('./shoes')

const router = express.Router()

router.use("/shoes", shoe_routes)

module.exports = router