const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/users', require('./followRoutes'));
router.use('/users', require('./messageRoutes'));
router.use('/users', require('./postRoutes'));

module.exports = router;
