#!/usr/bin/env node
import { Command } from 'commander'
import CommandFactory from '../commands/CommandFactory'
import { showLogo } from '../screen/ui'
const program = new Command()

class Bootstrap {
  public async start () {
    showLogo()

    program
      .version('0.1.0')
      .name('jsagon')
      .usage('<command> [name]').arguments('<command> [name]').description('JSagon CLI', {
        command: 'Command to be executed',
        name: 'Project name folder'
      })
      .action((command, name) => {
        this.process(command, name)
      }).parse()
  }

  public async process (commandName, name) {
    const command = CommandFactory.get(commandName)
    if (!command) {
      return console.log('Invalid command')
    }

    await command.execute({ name })
  }
}

const boot = new Bootstrap()
boot.start()
