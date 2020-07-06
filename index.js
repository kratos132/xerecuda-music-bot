const {Client, Attachment} = require('discord.js');
const ytdl = require('ytdl-core');
const bot = new Client();

const token = process.env.TOKEN;
const PREFIX = '*';

var queue_info = [];

bot.on('ready', () => console.log("o bot foi iniciado"))

bot.on('message',async msg => {

let args = msg.content.substring(PREFIX.length).split(" ");

switch(args[0]){

    case 'play':

        if(!msg.member.voice.channel){
        
            msg.channel.send("Você precisa estar em um canal de voz para usar o bot");

        }else{

        let connection = await msg.member.voice.channel.join();
        let validade = await ytdl.validateURL(args[1]);
        let video_info = await ytdl.getInfo(args[1]);
        var queue = {titulo: video_info.title, link: args[1]};
        queue_info.push(queue);
        let dispatcher = await connection.play(ytdl(args[1], {filter: "audioonly"}));

        msg.channel.send("Tocando: "+video_info.title);

        
        }

        break;


    case 'leave':

        msg.member.voice.channel.leave();
        return;

    break;

    case 'queue':

        

    for(var i = 0; i< queue_info.length; i++){

        console.log(queue_info[i].titulo);
        return;

    }

    break;

    case 'stop':

        let connection = await msg.member.voice.channel.join();
        let dispatcher = connection.dispatcher.end();

    break;

}

})

bot.login(token);

