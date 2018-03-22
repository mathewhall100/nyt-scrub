const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const http = require('http')
const io = require('socket.io')();
const app = express();

const PORT = process.env.PORT || 3001;


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);


io.on('connection', (socket) => {
  console.log("SOCKET SERVER CONNECTED");

 socket.on('article saved', data => {
    console.log(`article saved: ${data}`)
    io.sockets.emit("new saved article", `article saved: ${data}`)
  });

  socket.on('disconnect', () => {
    console.log("CLIENT DISCONNECTED")
  })

});

io.listen(8000);
console.log("socket.io listening on port 8000");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
