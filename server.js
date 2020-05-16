// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TABLES DATA
// =============================================================
var tables = [

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Route to reserve.html
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/reserve.html"));
});
// Route to view.html
app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/view.html"));
});
// 
// view table api
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});
// view wait list link api (not working yet)
app.get("/api/wait", function (req, res) {
  return res.json(tables);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable)
  // tables = tables.concat(newTable);

  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});


// Displays a single character, or returns false
// app.get("/api/tables/:table", function(req, res) {
//   var chosen = req.params.tables;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });