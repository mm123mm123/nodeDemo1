const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const dbPath = path.join(home, '.todo')
module.exports.add = (taskName) => {
    fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
            const taskList = []
            if (err) {
                console.log(err);
            } else if (data) {
                console.log(data);
            }
        }
    )
}
