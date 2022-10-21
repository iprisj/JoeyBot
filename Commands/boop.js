const yiff = require("yiff")
const util = require('util');

const Messages = [
    "%s gives %s a little boop!",
    "%s boops %s's nose",
]

module.exports = {
    "Name": "boop",
    "Aliases": [],
    "Description": "Boop someone",
    "Usage": ["%s [user]"],
    "Function": function(Discord, Client, message, args){
        Client.Yiff = Client.Yiff || new yiff({
            "useragent": `Fuwwy Bot`
        });
        Client.Yiff.e926("boop duo score:>30", 1).then((r) => {
            if(!r[0]){
                message.reply("No boop today (blame e9) :cry:")
                return
            }
            var Embed = new Discord.MessageEmbed()
            .setColor('#ff00fa')
            .setDescription(util.format(Messages[Math.floor((Math.random()*Messages.length))], `<@${message.author.id}>`, `${message.mentions.users.first() || "themselves"}`))
            .setImage(r[0].file.url)
            
            message.reply({ embeds: [Embed] });
        })
    }
}