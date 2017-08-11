process.stdout.write('\033c');
console.log("____________________________________")
const Discord = require('Discord.js')
const fs = require('fs')



const bot = new Discord.Client() 


bot.infopath = "./assets/BOTinf.json"
bot.infs = require(bot.infopath)
bot.testuser = bot.infs.crap.owner
bot.infos = bot.infs.infos
bot.Logintoken = bot.infos.token
bot.prefix = bot.infos.prefix
bot.version = bot.infos.version
bot.ALang = "";
console.log('Version:', bot.version)









bot.login(bot.Logintoken)



bot.on('ready', () => {
    console.log("I'M ready now, master")

    var testuser = bot.guilds.get("340168395058184202").members.get("137594857777659904")

    //Funktionen, die alle 500 millisekunden (5 Sekunden) ausgeführt werden sollen!
    bot.setInterval(() => {
        bot.infs = require(bot.infopath)
        
    }, 5000)
})




bot.on('message', message => {

    /*hier kommt der main Part hin, der ausgeführt wird, sobald eine Nachricht gesendet wird!*/



    let args = message.content.split(" ")
    let cmd = args[0].toLowerCase()

    let MAuthorName = message.author.name
    let MUserinfo = bot.infs.users[MAuthorName]

    /*Wenn true, dann ist der Kanal in der die Nachricht gesendet wurde ein Gilden Text kanal*/
    if(message.channel.type == "text") {

        let guildinf = bot.infs.guilds[message.guild.id]
        let MGuildId = message.guild.id

        console.log(MUserinfo);

        //Fügt die neue Guilde zur Liste hinzu, wenn sie noch nicht vorhanden ist.
        if(!message.author.bot) {
            if(!guildinf) {

                let tolog = bot.infs.guilds[message.guild.id] = {}
                tolog.name = message.guild.name
                tolog.id = message.guild.id

                message.guild.createChannel("Bot-channel", "text")

                .then(() => {
                    let botchannel1 = message.guild.channels.find('name', 'bot-channel')
                    
                    tolog.BotChannel = botchannel1.id



                    botchannel1.overwritePermissions(message.guild.defaultRole, {
                        SEND_MESSAGES: false
                    })



                    bot.channels.get(tolog.BotChannel).send("Hello @everyone! I'm the ``Rex o' Bots`` bot and I'm still Wip by my wonderful coder " +bot.owner +"! \nThis Channel was created by me, and is meant to show you the upgrade / patch nodes!")
                    bot.channels.get(tolog.BotChannel).send(`My version is: ${bot.version}.`)
                    bot.channels.get(tolog.BotChannel).send("You can configure the language by typing ``" +bot.prefix +"conf lang [ger/eng]`` in any channel!")
                    bot.channels.get(tolog.BotChannel).send("For more information just type ``" +bot.prefix +"help`` in dm.")

                    
                })
                .catch(console.error);


                tolog.language = "english"
                let search = message.guild.members.array()
                for(i in search) {

                    console.log(i)

                    if(!bot.infs.users[search[i].id]) {
                        bot.infs.users[search[i].id] = {}
                    }
                
                    let loguser = bot.infs.users[search[i].id]
                    loguser.id = search[i].id
                    loguser.name = search[i].username
                    loguser.language = "eng"

                    let userguilds = search[i].user.guilds.array()
                    let guildarr;

                    for(i in userguilds) {
                        guildarr[i] = userguilds[i].name 
                    }

                    loguser.guilds = guildarr

                }

                


                
                bot.logit()
            }


        }
        bot.infs = require(bot.infopath)










        if(commandIs(cmd, "delete")) Bcommanddelete(message, args);
    

    } else { /*Sonst ist es ein Direct message kanal*/

        if(commandIs(cmd, "help")) Bcommandhelp(message, args);  

    }



    if(!message.author.bot && !MUserinfo) {

        console.log('got no infos about: ' +message.author.username)

    }



    bot.ALang = "";
})






function jlog(file, data) {
        fs.writeFileSync(file, JSON.stringify(data, null, 4), (err) => {
            if(err){
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                console.log('something went wrong!');                
                throw err;
            } else {
                console.log('-----------------------------------------')
                console.log('updated files!')
            }
        })
}



function commandIs(cmd_uebergabe, command) {
    if(cmd_uebergabe.startsWith(bot.prefix + command)) {
        return true;
    } else {
        return false;
    }
}



function anyof(Array, ToCompare) {

    let arrlength = Array.length

    for(i = 0; i < arrlength; i++) {

        // console.log("Comparing " +Array[i] +"  to  " +ToCompare)
        if(Array[i] == ToCompare) {

            return true;
            
        }

    }

    return false;

}



bot.logit = function() {
    jlog(bot.infopath, bot.infs)
}



function Bcommanddelete(message, args) {

    if(args.length >=3){
        message.channel.send("Das waren zu viele Argumente! Tippe ``" +bot.prefix +"delete help")
    } else {
        var msg;
        if(args.length == 1){
            msg = parseInt(args[0]);
            msg++;
        } else{
            msg = 2;
        }
        let msg1 = msg -1;
        let output = `Deleted ${msg1} messages`;

        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
    }

}



function Bcommandhelp(message, args) {

    if(args.length == 1) {
        {
            bot.commands = bot.infos.commands
            bot.commandstring = "";

            for(i in bot.commands) {

                bot.commandstring = bot.commandstring.concat(bot.prefix +bot.commands[i])

                if(i != bot.commands.length) {
                    bot.commandstring = bot.commandstring.concat(", ")
                }   
            }
        }

        
        message.channel.send(`Hallo ${message.author} und danke, dass du mich benutzt!\nBitte gib den command an, für den du Hilfe haben möchtest: \n` +"``" +bot.commandstring +"``")
        


    } else if(args.length == 2) {

        if(args[1] == "delete") {

            message.channel.send("Der ``delete {Z}`` Befehl, löscht die letzten 'Z' nachrichten. Ohne eingabe wird automatisch eine Nachricht gelöscht")

        } else if(args[1] == "help") {
            
            message.channel.send("Der ``help`` Befehl, Zeigt die Hilfe liste an!")

        } else if(args[1] == "konf") {

            message.channel.send("der ``konf [Parameter]`` Befehl, lässt dich den Bot passent zu deinen Wünschen konfigurieren")
            message.channel.send("Die folgenden Parameter sind möglich: \n")

        }

    } else {

       if(bot.ALang == "ger"){
           message.channel.send("Das waren zu viele Argumente!")
        }

    }





}



function Bcommandkonf(message, args) {

    ;

}