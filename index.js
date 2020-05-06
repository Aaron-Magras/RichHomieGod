const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'lmao';

const { MessageEmbed, MessageAttachment } = require('discord.js');

const PREFIX = "!";

bot.on('ready', () => {

    console.log('ONLINE');

})

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    // FUNCTIONS
    switch(args[0]) {
        
        case 'help':
            message.channel.send('GOD GIVEN ASSISTANCE')
        break;

        case 'poll':
            const Embed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Create a Poll")
            .setDescription("Multi-reaction poll type: !poll {title} [option 1] [option 2] [option 3] ... \n ***NOTE*** I'm ass at programming so the options cannot contain blank spaces i.e. The Lighthouse < Lighthouse");

            // Lacks args - Send Embed
            if(!args[1]){
                message.channel.send(Embed);
                break;
            }

            let pollOpts = args.slice(1).join(" ");
            let pollTitle = args[1].slice(1, args[1].length - 1);
            // Getting around options w/ spaces?? args[1], if contains '[' then scan each charAt, if we haven't found ']' but we find a ' ', join!
            message.channel.send(pollTitle);
            message.channel.send(pollOpts).then(messageReaction => {
                messageReaction.react("👺");
                messageReaction.react("💀");
            });

        break;
        
        // how to send attachments
        case 'send':
            const attachment = new MessageAttachment('./memes/tuesdayagain.jpg', 'tuesdayagain.png');
            message.channel.send(message.author, attachment);
        break;
        
    }

})

bot.login(token);
