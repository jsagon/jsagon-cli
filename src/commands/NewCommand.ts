import inquirer from 'inquirer'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Steps from 'cli-step'
import AbstractCommand from './AbstractCommand'
import chalk from 'chalk'
import { urlServer, dataFramework } from '../config/repo'
import { showSuccessInstall } from '../screen/ui'

const exec = require('util').promisify(require('child_process').exec)

class NewCommand extends AbstractCommand {
    protected projectName: string
    protected language: string
    protected viewEngine: string
    protected packageManager: string
    protected monoapp: boolean = false
    protected steps: any
    protected dataFramework: any = {}

    public async execute (args: any = {}): Promise<void> {
      this.projectName = args.name

      this.dataFramework = await this.requestFrameworkInfo()

      this.showIntroText()
      await this.askProjectName()
      await this.askLanguage()
      await this.askViewEngine()

      const totalNumberOfSteps = 3
      this.steps = new Steps(totalNumberOfSteps)

      await this.process()
    }

    /**
     * Asks for Project Name
     *
     * @returns
     */
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

    /**
     * Asks for language template to use
     */
    private async askLanguage (): Promise<void> {
      const { language } = await inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'language',
            message: 'Which language to use?',
            default: 'ts',
            choices: this.dataFramework.languages
          }
        ])

      this.language = language
    }

    /**
     * Asks for View Engine to use
     */
    private async askViewEngine (): Promise<void> {
      const { viewEngine } = await inquirer
        .prompt([
          {
            type: 'rawlist',
            name: 'viewEngine',
            message: 'Which View Engine to use?',
            default: 'hbs',
            choices: this.dataFramework.viewEngines
          }
        ])

      this.viewEngine = viewEngine
    }

    /**
     * Asks for Package Manager to use
     *
     */
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

    /**
     *
     * @returns
     */
    private async process (): Promise<void> {
      const step1 = this.steps.advance('Preparing template', '').start()
      const infoProject: any = this.getRepoSkeletonDefault(this.language, this.viewEngine, this.monoapp)

      if (!infoProject) return step1.error('Template not found based on criterias', 'x')
      if (!infoProject.gitRepo) return step1.error('Git repository not availabled', 'x')

      step1.success('Template prepared', 'white_check_mark')

      const step2 = this.steps.advance('Cloning template', '').start()
      const successCloned = await this.clone(infoProject.gitRepo)
      if (!successCloned) {
        step2.error('Problem cloning Github repository with Git :(', 'x')
        console.log(`\n  If you can't fix the previous error, you can also download the project skeleton at ${chalk.yellow(infoProject.urlRepo)}`)
        return
      }
      step2.success('Template cloned', 'white_check_mark')

      await this.askPackageManager()
      const step3 = this.steps.advance('Installing dependencies', '').start()
      await this.installDependencies()
      step3.success('Application successfully created', 'white_check_mark')
      this.showSuccessInstalation()
    }

    private getRepoSkeletonDefault (language: string, viewEngine: string, mono: Boolean): {}|null {
      return dataFramework.repos.find(item => item.language === language && item.viewEngine === viewEngine && item.mono === mono)
    }

    /**
     * Request framework informations
     *
     * @returns
     */
    private async requestFrameworkInfo (): Promise<{}|null> {
      try {
        const result = await axios.get(urlServer, { params: { version: dataFramework.version } })

        const response = result.data
        if (response.repos) return response
        // else console.log('Git repository not found on server template info')
      } catch (e) {
        // console.log(`Unabled to connect to the server to download the template ${urlServer}`)
      }

      return dataFramework
    }

    private async clone (gitRepo): Promise<boolean> {
      const pathProject = path.join(process.cwd(), this.projectName)

      try {
        await exec(`git clone ${gitRepo} ${pathProject}`)

        fs.rmdirSync(path.join(pathProject, '.git'), { recursive: true })
        return true
      } catch (e) {
        console.log('\n')
        console.log(chalk.redBright('  Error: ') + e.message)
      }

      return false
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

    private showIntroText (): void {
      console.log('  Welcome! I\'m here to help you build a beautiful and great project! \n')
    }

    private showSuccessInstalation (): void {
      console.log('')
      switch (this.packageManager) {
        case 'man':
          console.log('  Now, go to your project folder, install the dependencies, execute "(npm or yarn) run dev" and open your browser and navigate to http://localhost:3000')
          break
        default:
          console.log(`  Now, go to your project folder, execute "${this.packageManager} run dev" and open your browser and navigate to http://localhost:3000`)
          break
      }

      showSuccessInstall()
    }
}

export default {
  new: new NewCommand()
}
