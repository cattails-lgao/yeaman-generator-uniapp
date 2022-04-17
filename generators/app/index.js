const Generator = require('yeoman-generator');
const fs = require('fs');
const path = require('path');

function getJsonFiles(jsonPath) {
    let jsonFiles = [];
    function findJsonFile(jsonPath) {
        const files = fs.readdirSync(jsonPath);
        
        files.forEach(function (item, index) {
            const fPath = path.join(jsonPath, item);
            let stat = fs.statSync(fPath);
            if (stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) {
                jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);

    return jsonFiles.map(item => {
        const index = item.indexOf('templates');

        return item.slice(index + 10);
    });
}
module.exports = class AppGenerator extends Generator {
    prompting() {
        // promise
        return this.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'project names:',
                default: this.appname
            }
        ]).then(answers => {
            this.answers = answers;
        })
    }

    writing() {
        const reads = getJsonFiles(path.join(__dirname, 'templates'));
        
        reads.forEach(item => {
            const tmpl = this.templatePath(item);
            const output = this.destinationPath(item);
            const context = this.answers;
    
            this.fs.copyTpl(tmpl, output, context);
        })
    }
}