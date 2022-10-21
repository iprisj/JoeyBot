module.exports = {
    "Name": "ping",
    "Aliases": [],
    "Description": "Replies with Pong!",
    "Usage": ["%s"],
    "Function": function(Discord, Client, message, args){
        message.reply("Pong!")
    }
}