const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const dbPath = path.join(home, '.todo')
const db = require("./db")
module.exports.add = async (taskName) => {
    let taskList = await db.read()

    taskList.push({task: taskName.toString(), done: false})

    await db.write(taskList)

}
