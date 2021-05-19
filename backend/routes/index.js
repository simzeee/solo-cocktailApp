// backend/routes/index.js
const express = require('express');
const router = express.Router();
// const csurf = require('csurf')

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;