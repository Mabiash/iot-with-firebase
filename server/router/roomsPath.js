const express = require("express");
const router = express.Router();
const {getRoomsPath, deleteRoomPath, addRoomPath} = require("../controller/roomsPath.js")

router.get("/path", getRoomsPath)

router.post("/path", addRoomPath)

router.post("/path-delete", deleteRoomPath)

module.exports = router;