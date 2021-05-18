// require dependencies
const router = require('express').Router();
const animalRoutes = require('./animalRoutes');
const zookeeperRoutes = require('./zookeeperRoutes')

// use module exports from animalRoutes.js
router.use(animalRoutes);

// use module exports form the zookeeperRoutes.js
router.use(zookeeperRoutes);

// export routes
module.exports = router;