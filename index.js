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
    
# Project Name
## ${answer.project_name}
[![GitHub license](https://img.shields.io/badge/license-${answer.answersURL})](https://github.com/${answer.github_userName}/${answer.project_name})

## Description
\`\`\
${answer.project_description}
\`\`\


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
\`\`\
${answer.user_needToKnow}
\`\`\

## License

This project is licensed under the ${answer.project_license}.

## Contributing
\`\`\
${answer.repo_contributing}
\`\`\


## Tests

To run tests, run the following command:

\`\`\`
${answer.run_tests}
\`\`\`

## Questions

![${response.avatar_url}](${response.avatar_url})

If you have any questions about the repo, open an issue or contact [${answer.github_userName}](https://api.github.com/users/${answer.github_userName}).`;


}

// IF STATEMENTS FOR THE LICENSES
promptUser()
  .then(function(answer) {
    if (answer.project_license === 'Mozilla') {
      answersURL = 'MPL%202.0-brightgreen.svg'
    }
    if (answer.project_license === 'MIT') {
      answersURL = 'MIT-yellow.svg'
    }
    if (answer.project_license === 'ISC') {
      answersURL = 'ISC-blue.svg'
    }
    if (answer.project_license === 'BSD') {
      answersURL = 'BSD%203--Clause-blue.svg'
    }
    axios.get(`https://api.github.com/users/${answer.github_userName}`)
      .then((res) => {
        response = res.data;
        answer.answersURL = answersURL
        readme = generateReadme(response, answer, answersURL);
        return writeFileSync("finished_readMe.md", readme);
      })
  })
  .catch(function(err) {
    console.log(err);
  });