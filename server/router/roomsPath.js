const express = require("express");
const router = express.Router();
const roomsPath = require("../controller/roomsPath.js")


router.get("/path", roomsPath)

module.exports = router;