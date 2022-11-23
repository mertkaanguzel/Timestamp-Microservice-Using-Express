const express = require('express');
const app = express();


const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.json(formatTimeStamp(''));
});


app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  res.json(formatTimeStamp(req.params.date));
});



let listener = app.listen(63372, function () {
  console.log('App is listening on port ' + listener.address().port);
});

function formatTimeStamp(timestamp) {
  let time = {};
  

  time = isNaN(Number(timestamp)) ?
   new Date(timestamp) : new Date(Number(timestamp));

   if (timestamp == '') {
    time = new Date();
  }

   if(time == "Invalid Date") return { error : "Invalid Date" };
   
  return {'unix' : time.getTime(),
   'utc' : time.toGMTString()};

}