export default abstract class AbstractCommand {
    public abstract execute(args: {}): Promise<void>
}
