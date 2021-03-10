const db = require("./db")
module.exports.add = async (taskName) => {
    let taskList = await db.read()

    taskList.push({task: taskName.join(' ').toString(), done: false})

    await db.write(taskList)

}
