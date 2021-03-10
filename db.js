const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const dbPath = path.join(home, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            let taskList
            fs.readFile(path, {flag: 'a+'}, (err, data) => {
                if (err) return reject(err);
                try {
                    taskList = JSON.parse(data.toString())
                } catch (err1) {
                    taskList = []
                }
                resolve(taskList)
            })
        })
    },
    write(note, path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(note)+'\n', (err) => {
                if (err) return reject(err);
                resolve()
            })
        })
    }
}
module.exports = db
