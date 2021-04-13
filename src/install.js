const inquirer = require('inquirer')

const yargs = require('yargs')
const logger = require('./logger/logger')
const setups = require('./setups')

var opsys = process.platform;
if (opsys == "darwin") {
    opsys = "MacOS";
} else if (opsys == "win32" || opsys == "win64") {
    opsys = "Windows";
} else if (opsys == "linux") {
    opsys = "Linux";
}
if (setups[opsys]){
    logger.success(`Installing VIM for ${opsys}`)
    setups[opsys].setup();
    return;
} 
logger.error(`OS ${opsys} is not yet supported`);

 // I don't know what linux is.
//  const CHOICES = [1,2,3]
// const QUESTIONS = [
//   {
//     name: 'template',
//     type: 'list',
//     message: 'What project template would you like to generate?',
//     choices: CHOICES,
//     when: () => !yargs.argv['template']
//   },
//   {
//     name: 'name',
//     type: 'input',
//     message: 'Project name:',
//     when: () => !yargs.argv['name'],
//     validate: (input) => {
//       if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
//       else return 'Project name may only include letters, numbers, underscores and hashes.';
//     }
//   }
// ];

// const CURR_DIR = process.cwd();

// export interface TemplateConfig {
//   files?: string[]
//   postMessage?: string
// }

// export interface CliOptions {
//   projectName: string
//   templateName: string
//   templatePath: string
//   tartgetPath: string
//   config: TemplateConfig
// }

// inquirer.prompt(QUESTIONS)
//   .then(answers => {

//     // answers = Object.assign({}, answers, yargs.argv);

//     // const projectChoice = answers['template'];
//     // const projectName = answers['name'];
//     // const templatePath = path.join(__dirname, 'templates', projectChoice);
//     // const tartgetPath = path.join(CURR_DIR, projectName);
//     // const templateConfig = getTemplateConfig(templatePath);

//     // const options: CliOptions = {
//     //   projectName,
//     //   templateName: projectChoice,
//     //   templatePath,
//     //   tartgetPath,
//     //   config: templateConfig
//     // }

//     // if (!createProject(tartgetPath)) {
//     //   return;
//     // }

//     // createDirectoryContents(templatePath, projectName, templateConfig);

//     // if (!postProcess(options)) {
//     //   return;
//     // }

//     // showMessage(options);
//   });

// function showMessage(options: CliOptions) {
//   console.log('');
//   console.log(chalk.green('Done.'));
//   console.log(chalk.green(`Go into the project: cd ${options.projectName}`));

//   const message = options.config.postMessage;

//   if (message) {
//     console.log('');
//     console.log(chalk.yellow(message));
//     console.log('');
//   }

// }

// function getTemplateConfig(templatePath: string): TemplateConfig {
//   const configPath = path.join(templatePath, '.template.json');

//   if (!fs.existsSync(configPath)) return {};

//   const templateConfigContent = fs.readFileSync(configPath);

//   if (templateConfigContent) {
//     return JSON.parse(templateConfigContent.toString());
//   }

//   return {};
// }

// function createProject(projectPath: string) {
//   if (fs.existsSync(projectPath)) {
//     console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
//     return false;
//   }

//   fs.mkdirSync(projectPath);
//   return true;
// }

// function postProcess(options: CliOptions) {
//   if (isNode(options)) {
//     return postProcessNode(options);
//   }
//   return true;
// }

// function isNode(options: CliOptions) {
//   return fs.existsSync(path.join(options.templatePath, 'package.json'));
// }

// function postProcessNode(options: CliOptions) {
//   shell.cd(options.tartgetPath);

//   let cmd = '';

//   if (shell.which('yarn')) {
//     cmd = 'yarn';
//   } else if (shell.which('npm')) {
//     cmd = 'npm install';
//   }

//   if (cmd) {
//     const result = shell.exec(cmd);

//     if (result.code !== 0) {
//       return false;
//     }
//   } else {
//     console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
//   }

//   return true;
// }

// const SKIP_FILES = ['node_modules', '.template.json'];

// function createDirectoryContents(templatePath: string, projectName: string, config: TemplateConfig) {
//   const filesToCreate = fs.readdirSync(templatePath);

//   filesToCreate.forEach(file => {
//     const origFilePath = path.join(templatePath, file);

//     // get stats about the current file
//     const stats = fs.statSync(origFilePath);

//     if (SKIP_FILES.indexOf(file) > -1) return;

//     if (stats.isFile()) {
//       let contents = fs.readFileSync(origFilePath, 'utf8');

//       contents = template.render(contents, { projectName });

//       const writePath = path.join(CURR_DIR, projectName, file);
//       fs.writeFileSync(writePath, contents, 'utf8');
//     } else if (stats.isDirectory()) {
//       fs.mkdirSync(path.join(CURR_DIR, projectName, file));

//       // recursive call
//       createDirectoryContents(path.join(templatePath, file), path.join(projectName, file), config);
//     }
//   });
// }