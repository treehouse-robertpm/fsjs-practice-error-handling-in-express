const express = require('express');
const path = require('path');

/* Import route definitions */
const quotesRouter = require('./routes/quotes');

/* Instantiate Express app */
const app = express();

/* Setup view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Express middleware for accessing the req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Static middleware for serving static files*/
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Root route redirect to the '/quotes' route */
app.get('/', (req, res) => {
  res.redirect('/quotes');
});

/* Use route definitions */
app.use('/quotes', quotesRouter);


/* ERROR HANDLERS */

/* 404 handler to catch undefined or non-existent route requests */ 
app.use((req, res, next) => {

  // Log out 404 handler indication
  console.log('404 error handler called');

  res.status(404).render('not-found')
});

/* Global error handler */
app.use((err, req, res, next) => {

  // Log out global error handler indication
  if (err) {
    console.log('Global error handler called', err);
  }

  // If global error handler catches 404, render 'not-found' template
  if (err.status === 404) {
    res.status(404).render('not-found', { err });

  // Else render error template
  }  else {
    err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
    res.status(err.status || 500).render('error', { err });
  }
});

module.exports = app;
