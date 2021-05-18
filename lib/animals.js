// require dependencies
const fs = require('fs');
const path = require('path');

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
};

// function that takes id and array of animals and returns a single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// function that adds a new animal to the array and animals.json
function createNewAnimal(body, animalsArray) {
    // const the incoming animal object
    const animal = body;

    // push incoming animal object to array
    animalsArray.push(animal);
    
    // use fs to write to animals.json
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'), 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
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
};

// export functions as object
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};