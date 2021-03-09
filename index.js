const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const dbPath = path.join(home, '.todo')
module.exports.add = (taskName) => {
    let taskList = []
    fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
            let newTask = {task: taskName.toString(), done: false}
            if (err) {
                console.log(err);
            } else if (data.toString() === '') {
                taskList.push(newTask)
            } else {
                taskList = JSON.parse(data.toString())
                taskList.push(newTask)
            }
            fs.writeFile(dbPath, JSON.stringify(taskList)+'\n', (err) => {
                if (err) {
                    console.log(err);
                }
            })
            console.log(data.toString());
        }
    )

}
