process.stdout.write('\033c');
console.log("____________________________________")
const Discord = require('Discord.js')
const fs = require('fs')



const bot = new Discord.Client() 


bot.infopath = "./assets/BOTinf.json"
bot.infs = require(bot.infopath)
bot.infos = bot.infs.infos

bot.LoggingfilePath = bot.infos.loggingfile
bot.logs = require(bot.LoggingfilePath)


bot.Logintoken = bot.infos.token
bot.prefix = bot.infos.defaultprefix
bot.version = bot.infos.version


bot.ALang = "";
console.log('Version:', bot.version)









bot.login(bot.Logintoken)



bot.on('ready', () => {
    
console.log("------------------------------------")
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

    let MAuthorName = message.author.username
    let MUserinfo = bot.infs.users[MAuthorName]

    /*Wenn true, dann ist der Kanal in der die Nachricht gesendet wurde ein Gilden Text kanal*/
    if(message.channel.type == "text") {

        let AChannelType = "text"

        let guildinf = bot.infs.guilds[message.guild.id]
        let MGuildId = message.guild.id

        //Fügt die neue Guilde zur Liste hinzu, wenn sie noch nicht vorhanden ist.
        // if(!message.author.bot) {
        //     if(!guildinf) {

        //         let tolog = bot.infs.guilds[message.guild.id] = {}
        //         tolog.name = message.guild.name //notiert den gilden namen
        //         tolog.id = message.guild.id     //notiert die Gilden id

        //         message.guild.createChannel("Bot-channel", "text")
        //         .then(() => { /*Legt den Botchannel der Gilde fest*/ 
        //             let botchannel1 = message.guild.channels.find('name', 'bot-channel')
                    
        //             tolog.BotChannel = botchannel1.id



        //             botchannel1.overwritePermissions(message.guild.defaultRole, {
        //                 SEND_MESSAGES: false
        //             })



        //             bot.channels.get(tolog.BotChannel).send("Hello @everyone! I'm the ``Rex o' Bots`` bot and I'm still Wip by my wonderful coder " +bot.owner +"! \nThis Channel was created by me, and is meant to show you the upgrade / patch nodes!")
        //             bot.channels.get(tolog.BotChannel).send(`My version is: ${bot.version}.`)
        //             bot.channels.get(tolog.BotChannel).send("You can configure the language by typing ``" +bot.prefix +"conf lang [ger/eng]`` in any channel!")
        //             bot.channels.get(tolog.BotChannel).send("For more information just type ``" +bot.prefix +"help`` in dm.")

                    
        //         })
        //         .catch(console.error);



        //         tolog.konfig = {}
        //         tolog.konfig.language = "english"
        //         tolog.konfig.version = bot.version



        //         // let search = message.guild.members.array()
        //         // for(i in search) {

        //         //     console.log(i)

        //         //     if(!bot.infs.users[search[i].id]) {
        //         //         bot.infs.users[search[i].id] = {}
        //         //     }
                
        //         //     let loguser = bot.infs.users[search[i].id]
        //         //     loguser.id = search[i].id
        //         //     loguser.name = search[i].username
        //         //     loguser.language = "eng"

        //         //     let userguilds = search[i].user.guilds.array()
        //         //     let guildarr;

        //         //     for(i in userguilds) {
        //         //         guildarr[i] = userguilds[i].name 
        //         //     }

        //         //     loguser.guilds = guildarr

        //         // }

                


                
        //         bot.logit()
        //     }


        // }
        bot.infs = require(bot.infopath)










        if(commandIs(cmd, "delete")) Bcommanddelete(message, args);
        if(commandIs(cmd, "help")) {
            
            if(bot.infs.users[message.author.id].lang == "ger"){
                message.author.send("Dieser befehl ist nur per direkt nachricht verfügbar!")
            } else {
                message.author.send("This command must be send in a dm channel!")
            }
        }

    } else { /*Sonst ist es ein Direct message kanal*/

        let AChannelType = "dm"
        if(commandIs(cmd, "help")) Bcommandhelp(message, args);  

    }



    if(!message.author.bot && !MUserinfo) {

        console.log('Getting infos about user: ' +message.author.username)

        let tolog = bot.infs.users[message.author.id] = {}
        tolog.name = MAuthorName
        tolog.id = message.author.id
        tolog.fullname = MAuthorName +"#" +message.author.discriminator
        console.log(bot.infs.users)


        // bot.logit()
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



bot.txtlog = function(logdata) {

    let Day = new Date().getDate()
    let Month = new Date().getMonth()
    let myDate = `${Day}.${Month}`
    let Hour = new Date().getHours()
    let Minute = new Date().getMinutes()
    let Secs = new Date().getSeconds()
    let myTime = `[${Hour}:${Minute} - ${Secs}]`


    
    if(!bot.logs[Month]) {
        bot.logs[Month] = {}
    }
    let logthis = bot.logs[Month]

    if(!logthis[myDate]) {
        logthis[myDate] = []
    }
    logthis = logthis[myDate]

    
    logthis[logthis.length] = myTime + " " +logdata



    jlog(bot.LoggingfilePath, bot.logs)

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

        if(bot.ALang == "ger") {
            message.channel.send(`Hallo ${message.author} und danke, dass du mich benutzt!\nBitte gib den command an, für den du Hilfe haben möchtest: \n` +"``" +bot.commandstring +"``")
        } else {
            message.channel.send(`Hello ${message.author} thans for using me!\nPlease tell me, for wich command you need help: \n` +"``" +bot.commandstring +"``")
        }


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
        } else {
            message.channel.send("Too many arguments!")
        }

    }





}



function Bcommandkonf(message, args) {

    ;

}