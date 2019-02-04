const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const routes = require("./routes/api");
const EventEmitter = require("events");

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ppc", {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;

//Serve Static Files from react App
app.use(express.static(path.join(__dirname, "client/build")));
// Set Static Folder dev
// app.use(express.static(path.join(__dirname, "public")));

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Uses API routes for routing
app.use(routes);

// const Stream = new EventEmitter();
// app.get("/events", function(request, response) {
//   response.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive"
//   });

//   Stream.on("message", function(event, data) {
//     response.write(
//       "event: " +
//         String(event) +
//         "\n" +
//         "data: " +
//         JSON.stringify(data) +
//         "\n\n"
//     );
//   });
// });

// app.get("/events", (req, res) => {
//   res.set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive"
//   });
//   app.on("message", data => {
//     res.write(`event: message\n`);
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
