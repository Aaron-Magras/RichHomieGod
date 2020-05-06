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
            .setDescription("Multi-reaction poll type: !poll {title} [option 1] [option 2] [option 3] ... \n ***NOTE*** Supports up to 8 options");

            // Lacks args - Send Embed
            if(!args[1]){
                message.channel.send(Embed);
                break;
            }

            let pollOpts = args.slice(1).join(" ");
            let pollTitle = " ";
            let emojis = ["👺","💀","👽","🤡","🍆","🍙","🥡","🍑"];
            let options = [];
            var i = 0;
            
            // Getting around options w/ spaces?? args[1], if contains '[' then scan each charAt, if we haven't found ']' but we find a ' ', join!
            // If the arguments starts with { then there is a title and we need to grab it
            if(pollOpts.charAt(0) == "{"){
                pollTitle = pollOpts.slice(1, pollOpts.indexOf("}"));
            } else {
                pollTitle = "UNTITLED POLL";
            }

            // SEND POLL TITLE
            message.channel.send(pollTitle);

            // Slice Title from Opts
            pollOpts = pollOpts.slice(pollOpts.indexOf("["));
            
            // while true, more options keep grabbing and slicing *CHOP CHOP* and appending to options!!
            while(pollOpts.charAt(0) == "[") {
                
                // Error message, too many options
                if(i == 7){
                    message.channel.send("I DON'T SUPPORT MORE THAN 8 CHOICES");
                    break;
                }

                options[i] = pollOpts.slice(1, pollOpts.indexOf("]"));
                
                // Check to see if we're at the last option
                if(pollOpts.indexOf("]") == pollOpts.length - 1) {
                    console.log("LAST OPTION BREAK");
                    break;
                } else {
                    pollOpts = pollOpts.substring(pollOpts.indexOf("]") + 2);
                    console.log("SLICE");
                }

                i += 1;

            }

            // send all options, emojis, and reactions
            var j;
            for(j = 0; j < options.length; j++) {
                message.channel.send(options[j] + " " + emojis[j]);
                if(j == (options.length - 1)) {
                    message.channel.send("VOTE BELOW").then(messageReaction => {
                        var z;
                        for(z = 0; z < j; z++) {
                            messageReaction.react(emojis[z]);
                        }
                    });
                }
            }

        break;
        
        // how to send attachments
        case 'meme':
            const attachment = new MessageAttachment('./memes/tuesdayagain.jpg', 'tuesdayagain.png');
            message.channel.send(message.author, attachment);
        break;
        
    }

})

bot.login(token);
