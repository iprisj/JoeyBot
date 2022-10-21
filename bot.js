const fs = require("fs")
const Discord = require('discord.js');
const Client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES,  Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]});
Client.Config = require("./config.json");
Client.Commands = new Discord.Collection();

Client.Init = function(c){
    Client.Ready = false;
    if (!c){
        fs.readdirSync("./Commands").filter(file => file.endsWith(".js")).forEach(file => {
            var Command = require(`./Commands/${file}`)
            Command.fileName = file
            Client.Commands.set(Command.Name, Command)
            if(Command.Aliases){
                for (let i = 0; i < Command.Aliases.length; i++) {
                    Client.Commands.set(Command.Aliases[i], Command)
                }
            }
        });
    }
    Client.Ready = true;
}
Client.Init()

Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}!`)
});

Client.on("messageCreate", async (message) => {
    if (!Client.Ready || message.author.bot) return;
    if (message.content.indexOf(Client.Config.prefix) !== 0) return;
    const args = message.content.slice(Client.Config.prefix.length).trim().split(/ +/g);
    const Command = Client.Commands.get(args.shift().toLowerCase())
    if (!Command) return;
    Command.Function(Discord, Client, message, args)
})

Client.login(Client.Config.token)

process.on('uncaughtException', (err, origin) => {
    console.log(err);
});