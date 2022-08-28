const fs = require("fs")
const Discord = require('discord.js');
const Client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGES,  Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]});

Client.Config = require("./config.json");
Client.Ready = false;
Client.Commands = new Discord.Collection();

Client.Init = function(certain){
    Client.Ready = false;
    if (!certain){
        fs.readdirSync("./Commands").filter(file => file.endsWith(".js")).forEach(file => {
            var Command = require(`./Commands/${file}`)
            Command.fileName = file
            Client.Commands.set(Command.Name, Command)
            for (let i = 0; i < Command.Aliases.length; i++) {
                Client.Commands.set(Command.Aliases[i], Command)
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
    message.guild = message.guild || {id: 0}
    if (message.channel.id == "1013231258807050260" & !message.attachments[0]  & message.content !== "https://cdn.discordapp.com/attachments/1013231258807050260/1013231748764680202/when_you_post_a_meme_in_a_chat_but_remeber_that_thats_where_you_stole_it_from.png"){
        await message.delete()
    }
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
