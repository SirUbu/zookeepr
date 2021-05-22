
# Zoo Keepr
## Description
A server based application to manager and see Zoo animals and Zookeeper data via a stylish UI. 

## Table of Contents
* [Usage](#usage)
* [Questions](#questions)

      
* [Installation](#installation)
        
* [Credits](#credits)
        
* [License](#license)
        
* [Contributing](#contributing)
        
* [Tests](#tests)
        
    
  

## Installation
There is no need to install this application to use it. Visit the [Usage](#usage) section for a link to the server deployed application. <br><br> To create your own version, clone this repository locally and run `nmp i` to install the required dependencies. See the [Credits](#credits) section for information on these dependencies and how to use them. 
    
## Usage
This application allows you to see and manage the animals and Zookeepers of the server. <br><br> Visit the site and click on *View Animals* to see the current catalog of animals. <br> Click on *View Zookeepers* to see the current catalog of Zookeepers. <br> From the main page you have two forms: one to add a new animal and one to add a new Zookeeper. Fill out the required information and click the **ADD** button to add to the respective catalog. <br><br> *Future Update: allow the user to click on a **REMOVE** button on the animal or Zookeeper in the catalog to remove them.

### Screenshot
![Project Screenshot](./assets/images/screenshot.PNG)
    

### Link
https://sir-ubu-zookeepr.herokuapp.com/
    

## Credits
**RESOURCES** <br> [Heroku](https://dashboard.heroku.com) <br> [Jest.js](https://jestjs.io/) <br> [Express.js](https://expressjs.com/) <br> [Node.js](https://nodejs.org/en/)
    

## License
[![MIT License](https://img.shields.io/badge/License-MIT%20License-informational)](https://choosealicense.com/licenses/mit/)
    


## Contributing
This repository is not open to outside contribution.


## Tests
This application uses Jest.js for testing framework. Visit [Credits](#credits) for the link. <br><br> THere are two testing suites: <br> 1. animals.test.js <br> 2. zookeepers.test.js <br><br> Each of these testing suites are designed to test the following: <br> - Creation of a new object <br> - Search query from options. <br> - Search by ID <br> - Validate the appropriate information for adding to catalog. <br><br> To runs these test locally, once cloned and dependencies installed, in the terminal execute `npm test` ro run all tests or `npm run test zookeepers` or `npm run test animals`. 
    
## Questions
For all questions regarding this project, feel free to contact me at:

GitHub: [SirUbu](https://github.com/SirUbu)

Email: thesirubu@gmail.com
