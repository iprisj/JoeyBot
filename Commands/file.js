var FlagsJSON = require("../Dependencies/Countries.json")

function compareStringFlag(str, Flag){
    if(str==Flag.toLowerCase()) return true
    for(var i = 0; i < Object.keys(FlagsJSON[Flag].aliases).length; i++){
        if(str == FlagsJSON[Flag].aliases[i].toLowerCase()){
            return true
        }
    }
}

module.exports = {
    "Name": "guesstheflag",
    "Aliases": ["gtf"],
    "Description": "",
    "Function": async function(Discord, Client, message, args){
        var won = false
        var Flag = Object.keys(FlagsJSON)[Math.floor(Math.random() * Object.keys(FlagsJSON).length)];
        const Mess = await message.channel.send({embeds: [new Discord.MessageEmbed()
            .setTitle('Guess The Flag')
            .setColor('#9100f0')
            .addFields(
                { name: 'Status', value: 'On' },
                { name: 'Flag', value: '???' },
            )
            .setFooter({ text: `Started By: @${message.author.tag}`})
            .setImage(`https://mobyhuge.org/src/Flags/${FlagsJSON[Flag].code.toLowerCase()}.png`)]})
        message.channel.awaitMessages({ filter: (m) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
            if (compareStringFlag(collected.first().content.toLowerCase(), Flag)) {
                Mess.edit({embeds: [new Discord.MessageEmbed()
                    .setTitle('Guess The Flag')
                    .setColor('#9100f0')
                    .addFields(
                        { name: 'Status', value: 'Won! 👑' },
                        { name: 'Flag', value: Flag },
                    )
                    .setFooter({ text: `Started By: @${message.author.tag}`})
                    .setImage(`https://mobyhuge.org/src/Flags/${FlagsJSON[Flag].code.toLowerCase()}.png`)]
                })
            }
            else{
                Mess.edit({embeds: [new Discord.MessageEmbed()
                    .setTitle('Guess The Flag')
                    .setColor('#9100f0')
                    .addFields(
                        { name: 'Status', value: 'Guessed wrong!' },
                        { name: 'Flag', value: Flag },
                    )
                    .setFooter({ text: `Started By: @${message.author.tag}`})
                    .setImage(`https://mobyhuge.org/src/Flags/${FlagsJSON[Flag].code.toLowerCase()}.png`)]
                })
            }
        }).catch(collected => {
            Mess.edit({embeds: [new Discord.MessageEmbed()
                .setTitle('Guess The Flag')
                .setColor('#9100f0')
                .addFields(
                    { name: 'Status', value: "Ran out of time!" },
                    { name: 'Flag', value: Flag },
                )
                .setFooter({ text: `Started By: @${message.author.tag}`})
                .setImage(`https://mobyhuge.org/src/Flags/${FlagsJSON[Flag].code.toLowerCase()}.png`)]
            })
        });
    }
}