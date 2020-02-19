const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require('util');

const writeFileSync = util.promisify(fs.writeFile);

function promptUser() {
return inquirer.prompt([{
            type: "input",
            name: "github_userName",
            message: "What is your GitHub username?"

        },
        {
            type: "input",
            name: "project_name",
            message: "What is your project's name?"
        },
        {
            type: "input",
            name: "project_description",
            message: "Please write a short description of your project?"
        },
        {
            type: "list",
            name: "project_license",
            choices: ["ISC", "MIT", "BSD", "Mozilla" ],
            message: "What kind of license should your project have? User can choose from list of items"
        },
        {
            type: "input",
            name: "install_dependencies",
            message: "What command should be run to install dependencies?",
            default: "npm i"
        },
        {
            type: "input",
            name: "run_tests",
            message: "What command should be run to run tests?",
            default: "npm test"
        },
        {
            type: "input",
            name: "user_needToKnow",
            message: "What does the user need to know about using the repo?"
        },
        {
            type: "input",
            name: "repo_contributing",
            message: "What does the user need to know about contributing to the repo?"
        }
    ]);
}

function generateReadme(response, answer, answersURL) {
    return `
    
# demo_day_project2
[![GitHub license](https://img.shields.io/badge/license-GPL%203.0-blue.svg)](https://github.com/calvincarter/demo_day_project2)

## Description

the best project ever project

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${answer.install_dependencies}
\`\`\`

## Usage

nothing just welcome all hands on deck

## License

This project is licensed under the GPL 3.0 license.
  
## Contributing

please help

## Tests

To run tests, run the following command:

\`\`\`
npm test
\`\`\`

## Questions

<img src="https://avatars1.githubusercontent.com/u/4831868?v=4" alt="avatar" style="border-radius: 16px" width="30" />

If you have any questions about the repo, open an issue or contact [calvincarter](https://api.github.com/users/calvincarter).`;
}

promptUser()
  .then(function(answer) {
    if (answer.project_license === 'Mozilla') {
      answersURL = 'https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg'
    }
    if (answers.project_license === 'MIT') {
      answersURL = 'https://img.shields.io/badge/License-MIT-yellow.svg'
    }
    if (answers.project_license === 'ISC') {
      answersURL = 'https://img.shields.io/badge/License-ISC-blue.svg'
    }
    if (answers.project_license === 'BSD') {
      answersURL = 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg'
    }
    axios.get(`https://api.github.com/users/${answer.github_userName}`)
      .then((res) => {
        response = res.data;
        readme = generateReadme(response, answer, answersURL);
        return writeFileSync("finished_readMe.md", readme);
      })
  })
  .catch(function(err) {
    console.log(err);
  });