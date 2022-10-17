// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.json(formatTimeStamp(''));
});

// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  res.json(formatTimeStamp(req.params.date));
});


// listen for requests :)
let listener = app.listen(/*process.env.PORT*/63372, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function formatTimeStamp(timestamp) {
  let time = {};
  
  console.log(typeof(timestamp));
  time = isNaN(Number(timestamp)) ?
   new Date(timestamp) : new Date(Number(timestamp));

   if (timestamp == '') {
    time = new Date();  
  }

   if(time == "Invalid Date") return { error : "Invalid Date" };
   
  return {'unix' : time.getTime(),
   'utc' : time.toGMTString()};

}