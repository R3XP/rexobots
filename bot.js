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

bot.chatlogPath = './assets/chatlog.json'

bot.Logintoken = bot.infos.token
bot.prefix = bot.infos.defaultprefix
bot.version = bot.infos.version



bot.ALang = "";
bot.logallmessages = true;
bot.cmds = true;
console.log('Version:', bot.version)









bot.login(bot.Logintoken)






bot.on('ready', () => {
    
    console.log("------------------------------------")
    console.log("I'M ready now, master")


    var testuser = bot.guilds.get("340168395058184202").members.get("137594857777659904")
    bot.commands = bot.infos.commands
    bot.commandstring = "";
    
    for(i in bot.commands) {
        let array = bot.commands[i]
        
        for(i in array) {

            
            if(i == 0) {
                bot.commandstring = bot.commandstring.concat(array[i] +": ")    
            } else {
                bot.commandstring = bot.commandstring.concat(array[i] +"; ")   
            }

        }

        bot.commandstring = bot.commandstring.concat("\n")

    }

    // bot.logit()
})



bot.on('message', message => {

    /*hier kommt der main Part hin, der ausgeführt wird, sobald eine Nachricht gesendet wird!*/

    let args = message.content.split(" ")
    let cmd = args[0].toLowerCase()

    let MAuthorName = message.author.username
    let MAuthorID = message.author.id

    let MUserinfo = bot.infs.users[MAuthorID]

    /*Wenn true, dann ist der Kanal in der die Nachricht gesendet wurde ein Gilden Text kanal*/
    if(message.channel.type == "text") {

        bot.AChannelType = "text"



        let guildinf = bot.infs.guilds[message.guild.id]
        let MGuildId = message.guild.id



        //Fügt die neue Guilde zur Liste hinzu, wenn sie noch nicht vorhanden ist.
        if(!message.author.bot) {
            if(!guildinf) {
                newGuild(message)
            }
        }

        bot.infs = require(bot.infopath)

        if(guildinf) {
            bot.ALang = guildinf.konfig.language
        } else {
            bot.ALang = "eng"
        }

    } else { /*Sonst ist es ein Direct message kanal*/

        bot.AChannelType = "dm"
        
        if(MUserinfo) {
            bot.ALang = MUserinfo.konfig.language
        } else {
            bot.ALang = "eng"
        }
    }



    if(!MUserinfo && !message.author.bot) {

        bot.txtlog('Getting and noting infos about user: ' +message.author.username)

        let tolog = bot.infs.users[message.author.id] = {}
        tolog.name = MAuthorName
        tolog.id = message.author.id
        tolog.fullname = MAuthorName +"#" +message.author.discriminator
        tolog.helpblocked = false;

        tolog.info = {}
        tolog.info.user = "default"

        tolog.konfig = {}
        tolog.konfig.language = "eng"

        //[WORKING HERE] - infos einfügen

        message.author.send("I've just made an info sheet about you, to collect your informations!\nIf you want to change you language, please use the following Command: ``°konf language [eng/ger]`` \nfor further information, use the ``°help`` command! \n_(keep in mind, that this only works in our dm channel!)_")

        bot.logit()
        bot.txtlog('Succesfully got information about ' +message.author.username)
    }



    if(bot.cmds) {
        
        if(commandIs(cmd, "delete")) {
            Bcommanddelete(message, args);
        }
              
        else if(commandIs(cmd, "help")) {
            
            if(bot.AChannelType == "dm") {
        
            if(commandIs(cmd, "help")) Bcommandhelp(message, args);  

            } else {
                if(bot.infs.users[message.author.id].lang == "ger"){
                    message.author.send("Dieser befehl ist nur per direkt nachricht verfügbar!")
                } else {
                    message.author.send("This command must be send in a dm channel!")
                }
            }

        }

        else if(commandIs(cmd, "conf")) {

            if(bot.AChannelType == "dm") { 
                Bcommandkonf(message, args, true); 
            } else { 
                Bcommandkonf(message, args, false); 
            }

            

        }
    }



    logeverything(message)



    bot.ALang = "";
    bot.AChannelType = null;
    bot.infs = require(bot.infopath)
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
    
    bot.infs = require(bot.infopath)
}



bot.txtlog = function(logdata) {

    let Day = new Date().getDate()
    let Month = new Date().getMonth()
    let myDate = `${Day}.${Month}`
    let Hour = new Date().getHours()
    let Minute = new Date().getMinutes()
    let Secs = new Date().getSeconds()
    let myTime = `[${Hour}:${Minute}-${Secs}]`


    
    if(!bot.logs[Month]) {
        bot.logs[Month] = {}
    }
    let logthis = bot.logs[Month]

    if(!logthis[myDate]) {
        logthis[myDate] = []
    }
    logthis = logthis[myDate]

    
    logthis[logthis.length] = myTime + " " +logdata

    logthis[logthis.length] = "---------------------------------------------------------"

    jlog(bot.LoggingfilePath, bot.logs)


    bot.logs = require(bot.LoggingfilePath)

}






function Bcommanddelete(message, args) {

    if(args.length >=3){
        message.channel.send("Das waren zu viele Argumente! Tippe ``" +bot.prefix +"delete help")
    } else {
        var msg;
        if(args.length == 2){
            msg = parseInt(args[1]);
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

        if(bot.ALang == "ger") {
            message.channel.send(`Hallo ${message.author} und danke, dass du mich benutzt! Falls du mich zu **deinem** Server hinzufügen willst, nutze einfach folgenden link: ${bot.infos.InviteLink}\nBitte gib den command an, für den du Hilfe haben möchtest: \n` +"``" +bot.commandstring +"``")
        } else {
            message.channel.send(`Hello ${message.author} thans for using me! If you'd like to add me to **Your** Server, simply use this link: ${bot.infos.InviteLink}\nPlease tell me, for wich command you need help: \n` +"``" +bot.commandstring +"``")
        }


    } else if(args.length == 2) {

        if(args[1] == "delete") {

            if(bot.ALang == "ger") {
                message.channel.send("Der ``delete {Z}`` Befehl, löscht die letzten 'Z' nachrichten. Ohne eingabe wird automatisch eine Nachricht gelöscht")
            } else {
                message.channel.send("The ``delete {Z}`` command deletes the last 'Z' Messages. Without arguments, it deletes only one message.")
            }

        } else if(args[1] == "help") {
            
            if(bot.ALang == "ger") {
                message.channel.send("Der ``help`` Befehl, Zeigt die Hilfe liste an!")
            } else {
                message.channel.send("The ``help`` command, shows the help list!")
            }

        } else if(args[1] == "conf") {

            if(bot.ALang == "ger") {
                message.channel.send("Der ``conf [Parameter]`` Befehl, lässt dich den Bot passend zu deinen Wünschen konfigurieren")
                message.channel.send("Die folgenden Parameter sind möglich:\nlang [ger/eng]; ")
            } else {
                message.channel.send("The ``conf [parameter]`` command, let's you configure the Bot to your wishes")
                message.channel.send("The following parameters are possible:\nlan [ger/eng]; ")
            }

        }

    } else {

       if(bot.ALang == "ger"){
           message.channel.send("Das waren zu viele Argumente!")
       } else {
            message.channel.send("Too many arguments!")
       }

    }





}



function Bcommandkonf(message, args, dm_channel) {

    /*Dinge die bie gilden und Usern konfiguriert werden können:
     language
     

    */

    if(args[1] == "lang") {
        if(args[2] == "ger") {
            
            if(dm_channel == true) {
                bot.infs.users[message.author.id].konfig.language = "ger"
            } else {
                bot.infs.guilds[message.guild.id].konfig.language = "ger"
            }
            
            
            message.channel.send("Die Sprache wurde zu ``Deutsch`` geändert!")
        } else if(args[2] == "eng") {
            if(dm_channel == true) {
                bot.infs.users[message.author.id].konfig.language = "eng"
            } else {
                bot.infs.guilds[message.guild.id].konfig.language = "eng"
            }
            message.channel.send("Succesfully changed language to ``english``!")
        } else {
            message.channel.send("wrong parameter!")
            return;
        }

    }




    bot.logit()
}



function Bcommandinfo(message, args) {

    //[WORKING HERE] - Derzeit in Planung


}



//Der schrott, den ich aus platz gründen ausräumen wollte :D
function newGuild(message) {

    bot.txtlog("logging Information about new guild: " +message.guild.name)

    let tolog = bot.infs.guilds[message.guild.id] = {}
    tolog.name = message.guild.name //notiert den gilden namen
    tolog.id = message.guild.id     //notiert die Gilden id

    message.guild.createChannel("Bot-channel", "text")
    .then(() => { /*Legt den Botchannel der Gilde fest*/ 
        let botchannel1 = message.guild.channels.find('name', 'bot-channel')
        
        tolog.BotChannel = botchannel1.id
        botchannel1.setPosition(0)
        botchannel1.overwritePermissions(message.guild.defaultRole, {
            SEND_MESSAGES: false
        })



        bot.channels.get(tolog.BotChannel).send("Hello @everyone! I'm the ``Rex o' Bots`` bot and I'm still Wip by my wonderful coder " +bot.owner +"! \nThis Channel was created by me, and is meant to show you the upgrade / patch nodes!")
        bot.channels.get(tolog.BotChannel).send(`My version is: ${bot.version}.`)
        bot.channels.get(tolog.BotChannel).send("You can configure the language by typing ``" +bot.prefix +"conf lang [ger/eng]`` in any channel!")
        bot.channels.get(tolog.BotChannel).send("For more information, or ifyou want to have me on **your** server too, just type ``" +bot.prefix +"help`` in dm.")

        
    })
    .catch(console.error);



    tolog.konfig = {}
    tolog.konfig.language = "english"
    tolog.konfig.version = bot.version


    
    bot.logit()
}


function logeverything(message) {
        if(bot.logallmessages == true) {

        bot.chatlog = require(bot.chatlogPath)



        let Day = new Date().getDate()
        let Month = new Date().getMonth()
        let myDate = `${Day}.${Month}`
        let Hour = new Date().getHours()
        let Minute = new Date().getMinutes()
        let Secs = new Date().getSeconds()
        let myTime = `[${Hour}:${Minute}-${Secs}]`

        let logthis = bot.chatlog

        if(message.guild) {
            if(!logthis[message.guild.name]) {
                logthis[message.guild.name] = {}
            }
            logthis = logthis[message.guild.name]
        } else {
            logthis = logthis.DMs
            if(!logthis[message.author.username]) {
                logthis[message.author.username] = {}
            }
            logthis = logthis[message.author.username]
        }


        if(!logthis[myDate]) {
            logthis[myDate] = []
        }
        logthis = logthis[myDate]

        
        logthis[logthis.length] = "{" +myTime +" " +message.author.username +" in " +message.channel.name +"}: " +message.content

        jlog(bot.chatlogPath, bot.chatlog)


        bot.logs = require(bot.chatlogPath)
    }
}