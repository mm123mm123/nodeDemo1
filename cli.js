const program = require('commander');
const api = require('./index.js')
const db = require("./db");
let inquirer = require('inquirer');
program.version('0.0.1');

program
    .option('-x, --xxx', 'this is first option')
program
    .command('add <tasks...>')
    .description('add a new task')
    .action((tasks) => {
        api.add(tasks)
            .then(() => {
                console.log('添加成功');
            }, () => {
                console.log('请重新添加');
            })
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        db.write([])
            .then(() => {
                    console.log('清空啦');
                },
                () => {
                    console.log('出错啦');
                })
    })

async function displayTaskList() {
    if (process.argv.length === 2) {
        let taskList = await db.read()
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'taskIndex',
                    message: '请选择待办事项',
                    choices: [
                        {name: '退出', value: -1},
                        ...taskList.map((task, index) => {
                            return {
                                name: `${task.done === true ? '[X]' : '[_]'}` + ` ${task.task}`,
                                value: index
                            }
                        }),
                        {name: '新建', value: -2}
                    ],
                }
            ])
            .then((answers) => {
                if (answers.taskIndex >= 0) {
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'action',
                                message: '请选择操作',
                                choices: [
                                    {name: '退出', value: 'quit'},
                                    {name: '已完成', value: 'markAsDone'},
                                    {name: '未完成', value: 'markAsUndone'},
                                    {name: '改标题', value: 'editTitle'},
                                    {name: '删除', value: 'deleteTask'},
                                ],
                            }
                        ]).then((actions) => {
                        switch (actions.action) {
                            case 'markAsDone':
                                taskList[answers.taskIndex].done = true
                                db.write(taskList)
                                break
                            case 'markAsUndone':
                                taskList[answers.taskIndex].done = false
                                db.write(taskList)
                                break
                            case 'editTitle':
                                inquirer.prompt({
                                    type: 'input',
                                    name: 'name',
                                    message: "What's your task name?",
                                }).then((taskName) => {
                                    if (taskName.name !== '') {
                                        taskList[answers.taskIndex].task = taskName.name
                                        db.write(taskList)
                                    }
                                });
                                break
                            case 'deleteTask':
                                inquirer.prompt({
                                    type: 'confirm',
                                    name: 'deleteStatus',
                                    message: "confirm deletion?",
                                }).then((isDelete) => {
                                    if (isDelete.deleteStatus === true) {
                                        taskList.splice(answers.taskIndex, 1)
                                        db.write(taskList)
                                    }
                                })
                                break
                        }
                    })
                } else if (answers.taskIndex === -2) {
                    inquirer.prompt(
                        [{
                            type: 'input',
                            name: 'task',
                            message: "please set newTaskName",
                        },
                            {
                                type: 'input',
                                name: 'done',
                                message: "please set newTaskStatus",
                            }]
                    ).then((taskMsg) => {
                        if (taskMsg.task !== '' && (['true', 'false'].indexOf(taskMsg.done) >= 0)) {
                            taskList.push(taskMsg)
                            db.write(taskList)
                        }
                    })
                }
            });
    }
}


void displayTaskList()
program.parse(process.argv);




