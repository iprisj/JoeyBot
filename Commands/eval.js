module.exports = {
    "Name": "eval",
    "Aliases": [],
    "Description": "Eval code",
    "Function": function(Discord, Client, message, args){
        if (message.author.id == "937190649726378054"){
            message.react(`✅`)
            try {
                eval(args.join(" "))
            }
            catch (err) {
                Client.users.fetch("937190649726378054").then(user => {
                    user.send(`Eval Error:\n${err}`)
                })
            }
        }
    },
    "Hidden": true
}