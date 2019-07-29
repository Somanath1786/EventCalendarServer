const { NODE_ENV, MONGO_DB_CONNECTION } = process.env
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(cors());

var port = process.env.PORT || 5000;

if (NODE_ENV === "development")
{
    app.use(require('morgan')('dev'));
}

// Set up a Mong DB database connection here
if (MONGO_DB_CONNECTION)
{
    mongoose.connect(MONGO_DB_CONNECTION, {useNewUrlParser: true})
    console.log('Connected to DataBase...');
}
else
{
    console.log('Unable to connect to database');
}

// Application-level Middleware
if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// Routes
app.use('/api/events', require('./api/routes/events'))
app.use('/api/giveEvents', require('./api/routes/giveEvents'))
app.use('/api/fhlEvents', require('./api/routes/fhlEvents'))
app.use('/api/summerOfOneEvents', require('./api/routes/summerOfOneEvents'))
app.use('/api/EnDFunEvents', require('./api/routes/eNdFunEvents'))

// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

// Error Handler
app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)
  const { message, status } = err
  res.status(status).json({ status, message })
})


// Set up a listener to listen on the specified PORT
const listener = () => console.log('Listening on port ' + port);
app.listen(port, listener);