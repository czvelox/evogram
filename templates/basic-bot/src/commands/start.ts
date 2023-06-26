import { Command, CommandHandler, UserMessageContext } from "evogram";

@CommandHandler("start")
class StartCommand extends Command {
    public async execute(message: UserMessageContext){
        message.send(`${message.user.fullname}, this bot was developed using [Evogram](https://npmjs.com/evogram/)\\!`, { parse_mode: "MarkdownV2" });
    }
}