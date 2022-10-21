const yiff = require("yiff")

module.exports = {
    "Name": "e621",
    "Aliases": ["e6", "yiff"],
    "Description": "Send a post from e621.net (NSFW)",
    "Usage": ["%s [tags]"],
    "Function": function(Discord, Client, message, args){
        Client.Yiff = Client.Yiff || new yiff({
            "useragent": `Fuwwy Bot`
        });
        if(!message.channel.nsfw) return message.reply("This channel is not marked as nsfw! Try again in a nsfw channel.")
        Client.Yiff.e621("-cub -young -gore -cbt " + args.join(" "), 1).then((r) => {
            if(!r[0]){
                message.reply("No yiff with these tags :cry:")
                return
            }
            var Embed = new Discord.MessageEmbed()
            .setColor('#ff00fa')
            .setTitle(`https://e621.net/posts/${r[0].id.toString()}`)
            .addFields(
                { name: 'Post Id', value: r[0].id.toString()},
                { name: 'Artist', value: r[0].tags.artist.join(", ")},
                { name: 'Score', value: r[0].score.total.toString(), inline: true },
                { name: 'Favorites', value: r[0].fav_count.toString(), inline: true },
            )
            .setImage(r[0].file.url)
            .setFooter({ text: 'https://e621.net/', iconURL: 'https://e621.net/favicon.ico' });

            message.reply({ embeds: [Embed] });
        })
    }
}