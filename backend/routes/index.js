const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const teamRouter = require('./teamRouter');
const playerRouter = require('./playerRouter');

router.use('/user', userRouter);
router.use('/player', playerRouter);
router.use('/team', teamRouter);

module.exports = router;