module.exports = {
    "Name": "reloadcmd",
    "Aliases": [],
    "Description": "Reloads the chosen command or all",
    "Function": function(Discord, Client, message, args){
        if (message.author.id == "937190649726378054"){
            if (!args[0]){
                Client.Commands.forEach(async value => {
                    console.log(value)
                    await delete require.cache[require.resolve(`./${value.fileName}`)];
                    await Client.Commands.delete(value.Name);
                    await Client.Init()
                })
            }
            else{
                const Cmd = Client.Commands.get(args.shift().toLowerCase())
                delete require.cache[require.resolve(`./${Cmd.fileName}`)];
                Client.Commands.delete(Cmd.Name);
                Client.Init()
            }
            message.react(`✅`)
        }
    },
    "Hidden": true
}