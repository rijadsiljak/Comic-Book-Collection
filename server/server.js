let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),

   dbConfig = require('./database/db');


   var session = require('express-session');



   const createError = require('http-errors');
// Connecting with mongo db
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const comicRoute = require('../server/Routes/comic.route.js')
const app = express();
app.use(bodyParser.json(
 
));
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/crud-mean')));
app.use('/', express.static(path.join(__dirname, 'dist/crud-mean')));
app.use('/api', comicRoute);
app.use(session({ secret: 'SECRET' }));

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler

app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, res ) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});