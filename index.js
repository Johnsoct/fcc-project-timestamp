// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function (req, res) {
  function isUnixTimestampString (timestamp) {
    if (timestamp !== undefined) {
      if (!isNaN(timestamp)) {
        return true
      }
    }
    return false
  }

  function getError () {
    // invalid date should return { error: "Invalid Date" }
    return { error: "Invalid Date" }
  }

  function getNow () {
    return { 
      // empty date should return current time as JSON with unix key
      unix: (new Date()).getTime(),
      // Empty date should return current time as JSON with utc key
      utc: (new Date()).toUTCString(),
    }
  }

  function getValidDates () {
    return {
      // valid date should return JSON with unix key that is a unix timestamp in milliseconds (as a Number)
      unix: date.getTime(),
      // valid date should return JSON with utc key that is a string date in format "Thu, 01 Jan 1970 00:00:00 GMT"
      utc: date.toUTCString(),
    }
  }

  const date = isUnixTimestampString(req.params.date)
    ? new Date(Number(req.params.date))
    : new Date(req.params.date)
  let response = {}

  console.log(`Date ${date}; URL param ${req.params.date}`)

  if (req.params.date === undefined) {
    response = getNow()
  }
  else if (date.toString() === 'Invalid Date' && req.params.date) {
    response = getError()
  }
  else {
    response = getValidDates()
  }

  res.json(response);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
