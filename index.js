require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./server/routes/user");
const playlistRoutes = require("./server/routes/playlist");

// CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);

// instead of having a domain name like www.bestrecipes.com,
// we are using localhost:3000 or whatever PORT is set in the .env file.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`));