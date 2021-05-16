// require dependencies for page
    // express.js for server
const express = require('express');
    // animals object used for json
const { animals } = require('./data/animals');

// using express.js, create the server
const app = express();

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

// create get response
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

// run server on local port 3001
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});