const express = require("express");
const app = express();
const cors = require('cors');
const userRoute = require("./router/user.js")
const roomsPathRoute = require("./router/roomsPath.js")
const port = 3000;

app.use(cors({
    origin: '*', // change this if your frontend runs on another port
    credentials: true
  }));
  

app.use(express.json());

app.use("/", userRoute);
app.use("/rooms", roomsPathRoute);

app.listen(port, '0.0.0.0', () => {
    console.log(`app running on http//localhost:${port}`);
})