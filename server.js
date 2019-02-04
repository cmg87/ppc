const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const routes = require("./routes/api");

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ppc", {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;

//Serve Static Files from react App
app.use(express.static(path.join(__dirname, "client/build")));

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Uses API routes for routing
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
