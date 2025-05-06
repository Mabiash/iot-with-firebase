const express = require("express");
const router = express.Router();
const {getRoomsPath, addRoomPath} = require("../controller/roomsPath.js")

router.get("/path", getRoomsPath)

router.post("/path", addRoomPath)

module.exports = router;