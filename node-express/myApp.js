require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// serve static folder #middleware
app.use("/public", express.static(__dirname + "/public"));

// [11.] --- Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}));

// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  const json = { message: "Hello json" };
  json.message =
    process.env.MESSAGE_STYLE === "uppercase"
      ? json.message.toUpperCase()
      : json.message;
  res.json(json);
});

// [7.] --- Chain Middleware to Create a Time Server
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);

// [8.] --- Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => res.json({ echo: req.params.word }))

// [10.] --- Get Query Parameter Input from the Client
app.route('/name')
.get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
})
.post((req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
})

module.exports = app;