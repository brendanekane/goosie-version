// imports
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  csurf = require('csurf'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  { environment } = require('./config'),
  routes = require('./routes'),
  { ValidationError } = require('sequelize');

// production boolean
const isProduction = environment === 'production';

const app = express();

// middlewares

//http request logger
app.use(morgan('dev'));
// cookie parser
app.use(cookieParser());
// parses json requests and puts on body
app.use(express.json());
// only allows cors in dev
if (!isProduction) {
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);
// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);
// connect routes to the app
app.use(routes);

// catch unhandled http rrequests
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors and format
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
