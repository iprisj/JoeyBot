const util = require('util');

module.exports = {
    "Name": "help",
    "Aliases": ["commands", "cmds"],
    "Description": "Lists the commands",
    "Usage": ["%s", "%s [cmd]"],
    "Function": function(Discord, Client, message, args){
        const Embed = new Discord.MessageEmbed()
        .setColor('#ff00fa')
        if(args[0]){
            const Command = Client.Commands.get(args.shift().toLowerCase())
            if (!Command){
                Embed.setTitle("Command provided does not exist!")
                return
            }
            Embed.setTitle(`Help for ${Command.Name} command`)
            Embed.setDescription(Command.Description)
            if(Command.Aliases.length > 0){
                Embed.addField("Aliases", "\u200B")
                Embed.addField("\u200B", "\u200B", true)
                for(var i = 0; i < Command.Aliases.length; i++){
                    Embed.addField(Command.Aliases[i], "\u200B", true)
                }
            }
            if(Command.Usage && Command.Usage.length > 0){
                Embed.addField("Usage", "\u200B")
                Embed.addField("\u200B", "\u200B", true)
                for(var i = 0; i < Command.Usage.length; i++){
                    Embed.addField(util.format(Command.Usage[i], Client.Config.prefix + Command.Name), "\u200B", true)
                }
            }
        }
        else{
            Embed.setTitle('Commands List')
            var cmds = Array.from(Client.Commands)
            for(var i = 0; i < cmds.length; i++){
                if(!cmds[i][1].Hidden && cmds[i][0] == cmds[i][1].Name){
                    Embed.addField(cmds[i][0].toString(), cmds[i][1].Description.toString(), true)
                }
            }
        }
        message.reply({ embeds: [Embed] });
    }
}