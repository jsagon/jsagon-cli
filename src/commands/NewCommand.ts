import inquirer from 'inquirer'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Steps from 'cli-step'
import AbstractCommand from './AbstractCommand'
import { getRepoSkeletonDefault, urlServer } from '../config/repo'
import { showSuccessInstall } from '../view/ui'

const exec = require('util').promisify(require('child_process').exec)

class NewCommand extends AbstractCommand {
    protected projectName: string
    protected language: string
    protected viewEngine: string
    protected packageManager: string
    protected monoapp: boolean = false
    protected steps: any

    public async execute (args: any = {}): Promise<void> {
      this.projectName = args.name

      await this.askProjectName()
      await this.askLanguage()
      await this.askViewEngine()

      const totalNumberOfSteps = 3
      this.steps = new Steps(totalNumberOfSteps)

      await this.process()
    }

    private async askProjectName (): Promise<void> {
      if (this.projectName) return

      const { projectName } = await inquirer
        .prompt([
          {
            name: 'projectName',
            message: 'Project name?',
            default: 'App'
          }
        ])

      this.projectName = projectName
    }

    private async askLanguage (): Promise<void> {
      const { language } = await inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'language',
            message: 'Which language to use?',
            default: 'ts',
            choices: [{ value: 'ts', name: 'TypeScript' }, { value: 'js', name: 'JavaScript' }]
          }
        ])

      this.language = language
    }

    private async askViewEngine (): Promise<void> {
      const { viewEngine } = await inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'viewEngine',
            message: 'Which View Engine to use?',
            default: 'hbs',
            choices: [{ value: 'hbs', name: 'Handlebars' }/*, { value: 'ejs', name: 'EJS' } */]
          }
        ])

      this.viewEngine = viewEngine
    }

    private async askPackageManager (): Promise<void> {
      const { packageManager } = await inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'packageManager',
            message: 'Package manager to install dependencies?',
            default: 'npm',
            choices: [{ value: 'npm', name: 'NPM' }, { value: 'yarn', name: 'YARN' }, { value: 'man', name: 'Manually' }]
          }
        ])

      this.packageManager = packageManager
    }

    private async process (): Promise<void> {
      const step1 = this.steps.advance('Preparing template', '').start()
      const infoProject: any = await this.requestProjectInfo()
      if (!infoProject) return step1.error('Template not found based on criterias', 'x')
      if (!infoProject.gitRepo) return step1.error('Git repository not availabled', 'x')
      step1.success('Template prepared', 'white_check_mark')

      const step2 = this.steps.advance('Cloning template', '').start()
      await this.clone(infoProject.gitRepo)
      step2.success('Template cloned', 'white_check_mark')

      await this.askPackageManager()
      const step3 = this.steps.advance('Installing dependencies', '').start()
      await this.installDependencies()
      step3.success('Application successfully created', 'white_check_mark')
      console.log('')
      console.log('  Now, go to your project folder and execute "npm run dev" and open your browser and navigate to http://localhost:3000')
      showSuccessInstall()
    }

    private async requestProjectInfo (): Promise<{}|null> {
      try {
        const result = await axios.get(urlServer, {
          params: {
            language: this.language,
            view_engine: this.viewEngine,
            mono_app: this.monoapp ? 1 : 0
          }
        })

        const response = result.data
        if (response.gitRepo) return response
        // else console.log('Git repository not found on server template info')
      } catch (e) {
        console.log('')
        console.log(`Unabled to connect to the server to download the template ${urlServer}`)
      }

      console.log('Using local template info')
      return getRepoSkeletonDefault(this.language, this.viewEngine, this.monoapp)
    }

    private async clone (gitRepo): Promise<void> {
      const pathProject = path.join(process.cwd(), this.projectName)

      await exec(`git clone ${gitRepo} ${pathProject}`)

      fs.rmSync(path.join(pathProject, '.git'), { recursive: true })
    }

    private async installDependencies (): Promise<void> {
      const pathProject = path.join(process.cwd(), this.projectName)

      switch (this.packageManager) {
        case 'npm':
          await exec(`cd ${pathProject} && npm i && cd ..`)
          break
        case 'yarn':
          await exec(`cd ${pathProject} && yarn && cd ..`)
          break
        default:
      }
    }
}

export default {
  new: new NewCommand()
}
