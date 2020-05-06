const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzA0OTIwNjgyNzIyNDkyNDI4.XqkLtw.mgwE8gAHxKFu7YAAgL4oRBPF3Eo';

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
            .setDescription("Multi-reaction poll type: !poll {title} [option 1] [option 2] [option 3] ...");

            // Lacks args - Send Embed
            if(!args[1]){
                message.channel.send(Embed);
                break;
            }

            let pollOpts = args.slice(1).join(" ");
            let pollTitle = args[1].slice(1, args[1].length - 1);
            // Logic - arg[1] is title, then for every arg after title, send a message with its name + emoji, then send all reaction emojis
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
