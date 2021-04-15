import AbstractCommand from "./AbstractCommand";
import CommandList from './CommandList'

export default class CommandFactory {
    public static get(commandName): AbstractCommand {
        return CommandList[commandName]
    }
}