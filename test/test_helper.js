/** @format */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test');
mongoose.connection
  .once('open', () => console.log('Goog to go!!'))
  .on('error', error => {
    console.warn('Warning', error);
  });
