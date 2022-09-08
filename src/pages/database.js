const express    = require("express");
const mysql      = require('mysql');
const { DOUBLE } = require("mysql/lib/protocol/constants/types");
const path       = require("path");
const { getCoords }  = require("./db");

const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const app = express();

//Sets the path for what the app will use as a frontend,
app.set('views', path.join(__dirname, '../views'));
//This sets the "view engine" to ejs of the app
app.set('view engine', 'ejs');
// connection to folder, set public for javascript, css, and resources
app.use(express.static(path.join(__dirname, '../public')));
//api function to get coordinates
app.get('/api/coord', getCoords);
//routes to home directory
app.use('/', indexRouter.homepage);

//Connect to the given port, or gives an error if not connected 
const listener = app.listen(PORT, (err) => {
  if (err) {
    console.info(`Error starting the server: ${err}`);
    return;
  }
  console.info(`Listening on port ${listener.address().port}`);
});