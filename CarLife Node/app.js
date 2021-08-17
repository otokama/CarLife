const express = require('express');
const app = express();
const path = require('path');
app.use( express.static(path.join(__dirname+'../../Carlife_angular/dist/HW2'), {redirect: false}));

/*
const allowedExt = ['.js','.ico','.css','.png','.jpg','.woff2','.woff','.ttf','.svg'];
*/
/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.user.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());


app.use('/user', require('./routes/user.router'));
app.use('/main', require('./routes/maintenance.router'));
app.use('/vehicle', require('./routes/vehicle.router'));
app.use('/mods', require('./routes/mods.router'));
app.use('/comment', require('./routes/comment.router'));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, `../../Carlife_angular/dist/HW2${req.url}`));
});

app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
module.exports = app;
