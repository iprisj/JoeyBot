const yiff = require("yiff")

module.exports = {
    "Name": "e926",
    "Aliases": ["e9"],
    "Description": "Send a post from e926.net",
    "Usage": ["%s [tags]"],
    "Function": function(Discord, Client, message, args){
        Client.Yiff = Client.Yiff || new yiff({
            "useragent": `Fuwwy Bot`
        });
        var Embed = new Discord.MessageEmbed().setColor('#ff00fa')
        Client.Yiff.e926("order:random " + args.join(" "), 1).then((r) => {
            if(!r[0]){
                Embed.setDescription("No posts with these tags :cry:")
                return message.reply({ embeds: [Embed] })
            }
            Embed.setTitle(`https://e926.net/posts/${r[0].id.toString()}`)
            Embed.setDescription(`Search: ${args.join(" ")}`)
            Embed.addFields(
                { name: 'Post Id', value: r[0].id.toString()},
                { name: 'Artist', value: r[0].tags.artist.join(", ")},
                { name: 'Score', value: r[0].score.total.toString(), inline: true },
                { name: 'Favorites', value: r[0].fav_count.toString(), inline: true },
            )
            Embed.setImage(r[0].file.url)
            Embed.setFooter({ text: 'https://e926.net/', iconURL: 'https://e926.net/favicon.ico' });
            message.reply({ embeds: [Embed] });
        })
    }
}