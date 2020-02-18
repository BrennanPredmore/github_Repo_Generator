const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([{
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
            choices: ["ISC", "MIT", "BSD", ],
            message: "What kind of license should your project have? User can choose from list of items"
        },
        {
            type: "input",
            name: "install_dependencies",
            message: "What command should be run to install dependencies?"
        },
        {
            type: "input",
            name: "run_tests",
            message: "What command should be run to run tests?"
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
    ]


).then(function (answer) {

    console.log(answer);

    //TODO Generate data
    const data = getData(answer);
    fs.writeFile("index.html", data, function () {

    })
});