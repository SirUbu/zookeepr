const fs = require('fs');
const path = require('path');

// function to handle user query parameter
function filterByQuery(query, zookeepers) {
    // set results as passed in parameter
    let filteredResults = zookeepers;
    
    // use query for different filters
    if (query.age) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.age === Number(query.age));
    }
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.name === query.name);
    }

    // return updated filtered array
    return filteredResults;
};

// function that takes id and array of zookeepers and returns a single zookeeper object
function findById(id, zookeepers) {
    const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0];
    return result;
};

// function that adds a new animal to the array and animals.json
function createNewZookeeper(body, zookeepers) {
    // const the incoming animal object
    const zookeeper = body;

    // push incoming animal object to array
    zookeepers.push(zookeeper);
    
    // use fs to write to animals.json
    fs.writeFileSync(
        path.join(__dirname, '../data/zookeepers.json'), 
        JSON.stringify({ zookeepers }, null, 2)
    );

    // return finished code to post route for response
    return zookeeper;
};

// function to validate incoming animal addition
function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== 'string') {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== 'number') {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
        return false;
    }
    return true;
};

// export functions as object
module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
};