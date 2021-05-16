// require dependencies for page
const fs = require('fs');
const path = require('path');
    // express.js for server
const express = require('express');
    // animals object used for json
const { animals } = require('./data/animals');

// assign the port is present or default
const PORT = process.env.PORT || 3001;

// using express.js, create the server
const app = express();

// middleware start
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make files readily available 
app.use(express.static('public'));
// middleware end

// function to handle user query parameter
function filterByQuery(query, animalsArray) {
    // set empty array for personality traits
    let personalityTraitsArray = [];
    
    // set results as passed in parameter
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // if personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filterResults array updating the array for each trait in the .forEach() loop and adding entries containing the trait to the array
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }

    // use query for different filters
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    // return updated filtered array
    return filteredResults;
}

// function that takes id and array of animals and returns a single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// function to validate incoming animal addition
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// function that add a new animal to the array and animals.json
function createNewAnimal(body, animalsArray) {
    // const the incoming animal object
    const animal = body;

    // push incoming animal object to array
    animalsArray.push(animal);
    
    // use fs to write to animals.json
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'), 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
};

// create get route for requests by query
app.get('/api/animals', (req, res) => {
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
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// create post route to add data to server
app.post('/api/animals', (req, res) => {
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

// create get route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// create get route for animals.html
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// create get route for zookeepers.html
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// create get route for wildcard
app.get('*', (req, res) => {
    req.sendFile(path.join(__dirname, './public/index.html'));
});

// run server on local port 3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});