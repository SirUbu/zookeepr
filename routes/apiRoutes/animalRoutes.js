// require dependencies
const { 
    filterByQuery, 
    findById, 
    createNewAnimal, 
    validateAnimal 
} = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

// create get route for requests by query
router.get('/animals', (req, res) => {
    // set results as overall animal array
    let results = animals;

    // if request query present, pass into query function to return results
    if (req.query) {
        results = filterByQuery(req.query, results);
    }

    // respond with json of results
    res.json(results);
});

// create get route for requests by params id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// create post route to add data to server
router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data is invalid, send 400 error
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    // else add animal to json file and animals array 
    } else {
        const animal = createNewAnimal(req.body, animals);
        
        res.json(animal);
    }
});

// export routes
module.exports = router;