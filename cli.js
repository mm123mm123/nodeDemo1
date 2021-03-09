const program = require('commander');
const api = require('./index.js')
program.version('0.0.1');

program
    .option('-x, --xxx', 'this is first option')
program
    .command('add <tasks...>')
    .description('add a new task')
    .action((tasks) => {
        api.add(tasks)
    });
program.parse(process.argv);
const options = program.opts()




