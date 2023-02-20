// imports
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  csurf = require('csurf'),
  helmet = require('helmet'),
  cookieParser = require('cookie-parser'),
  { environment } = require('./config'),
  routes = require('./routes');

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

module.exports = app;
