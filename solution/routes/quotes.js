const express = require('express');
const router = express.Router();
const { quotes } = require('../data')

/* GET quotes - render index template, passing it a title prop and the list of quotes */
router.get('/', (req, res, next) => {

  // Log out home route handler indication
  console.log('Home route called');

  res.render('index', { title: 'Code Quotes', quotes: quotes });
});

/* GET generated error route - create and throw 500 server error */
router.get('/error', (req, res, next) => {

  // Log out custom error handler indication
  console.log('Custom error route called');

  const err = new Error();
  err.message = `Custom 500 error thrown`
  err.status = 500;
  throw err;
});

/* GET individual quote route */
router.get('/:id', (req, res, next) => {

  // Log out quote handler indication
  console.log(`Quote ${req.params.id} route called`);

  // If quote exists, render quote template, passing it a title prop and the requested quote
  if (quotes[req.params.id]) {
    res.render('quote', { title: 'Code Quote', quote: quotes[req.params.id] });

  // Else create 404 error and forward to global error handler
  } else {
    const err = new Error();
    err.status = 404;
    err.message = `Looks like the quote you requested doesn't exist.`
    next(err);
  }
});

module.exports = router;
