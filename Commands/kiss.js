const yiff = require("yiff")
const util = require('util');

const kissMessages = [
    "%s gives %s a big smooch!",
    "%s gives %s a little kiss"
]

module.exports = {
    "Name": "kiss",
    "Aliases": [],
    "Description": "Gives someone a kiss",
    "Usage": ["%s [user]"],
    "Function": function(Discord, Client, message, args){
        Client.Yiff = Client.Yiff || new yiff({
            "useragent": `Fuwwy Bot`
        });
        Client.Yiff.e926("kissing duo -female -intersex score:>50", 1).then((r) => {
            if(!r[0]){
                message.reply("No kiss today (blame e9) :cry:")
                return
            }
            if (message.author.id !== "937190649726378054" && message.mentions.users.first() && message.mentions.users.first().id == 549646559457968139){
                message.reply("Damn, turns out that is reserved for <@937190649726378054>. Sorry!") // When someone uses riley
                return
            }
            if (message.author.id !== "549646559457968139" && message.mentions.users.first() && message.mentions.users.first().id == 937190649726378054){
                message.reply("Damn, turns out that is reserved for <@549646559457968139>. Sorry!") // When someone uses prisj
                return
            }
            var Embed = new Discord.MessageEmbed()
            .setColor('#ff00fa')
            .setDescription(util.format(kissMessages[Math.floor((Math.random()*kissMessages.length))], `<@${message.author.id}>`, `${message.mentions.users.first() || "themselves"}`))
            .setImage(r[0].file.url)
            
            message.reply({ embeds: [Embed] });
        })
    }
}