// require dependencies
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');
const router = require('express').Router();

// create get route for requests by query
router.get('/zookeepers', (req, res) => {
    // set results as overall zookeeper array
    let results = zookeepers;

    // if request query present, pass into query function and return results
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    // respond with json of results
    res.json(results);
});

// create get route for requests by params id
router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// create post route to add zookeeper data to server
router.post('/zookeepers', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    // if any data is invalid, send 400 error
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted.');
    // else add the zookeeper to the json file and zookeepers array
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

// export routes
module.exports = router;