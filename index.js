// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

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

app.get("/api/:date?", function(req, res) {
  var dateParam = req.params.date;

  //Handle empty string passed in
  if (dateParam === undefined) {
    var now = new Date();
    return res.json({ "unix": Date.parse(now), "utc": now.toUTCString() });
  }
  else {
    // Check if a date passed in
    var parsedDate = Date.parse(dateParam);

    // If not a number, then it wasnt a valid date string (may be unix)
    if (isNaN(parsedDate)) {
      var unix = parseInt(dateParam);

      if (isNaN(unix)){
        return res.json({ error : "Invalid Date" });
      }

      var dateObject = new Date(unix);

      return res.json({ "unix": unix, "utc": dateObject.toUTCString() })
    }
    else {
      // parsedDate is a number so was a valid date
      var dateObject = new Date(dateParam);

      return res.json({ "unix": parsedDate, "utc": dateObject.toUTCString() });
    }
  }  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
