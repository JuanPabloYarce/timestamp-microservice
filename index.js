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

/*app.get("/api/:info", (req, res, next) => {
  const { word } = req.params;
  req.params.word = new Date(word).toString();
  next();
},
(req, res) => {
  res.json(req.params.word);
}
); */

app.get("/api/:info?", (req, res) => {
  const { info } = req.params;
  let time;
  let unix;
  if (!info) {
    // Si no se proporciona información, utilizar la fecha y hora actual
    let fechaActual = new Date(Date.now());
    time = fechaActual.toUTCString(); // Formatear en formato UTC
    unix = fechaActual.getTime();
  } else {

    // Verificar si la información proporcionada es un timestamp UNIX
    if (!isNaN(info)) {
      time = new Date(parseInt(info)).toUTCString();
      unix = info;
    } else {
      // Si no es un timestamp, intentar interpretarlo como una cadena de fecha
      let fecha = new Date(info);

      if (!isNaN(fecha.getTime())) {
        time = new Date(info).toUTCString();
        unix = fecha.getTime();
      }
      else {
        // Si la entrada no es válida, responder con un mensaje de error
        return res.status(400).json({ "error": "Invalid Date" });
      }

    }
  }
  res.json({ unix: unix, utc: time });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
