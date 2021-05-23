const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const cocktailsRouter = require('./cocktails')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/cocktails', cocktailsRouter);

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;