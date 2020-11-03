const Discord = require('discord.js');
const bot = new Discord.Client();
const { MessageEmbed, MessageAttachment } = require('discord.js');
const PREFIX = "!";

bot.on('ready', () => {
    (async () => {/* ... */})()
      .catch(console.log);
  });

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    // FUNCTIONS
    switch(args[0]) {
        
        case 'help':
            
            const helpEmbed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Rich Homie God - HELP")
            .setDescription("!poll - Simple Reaction Poll");
            message.reply(helpEmbed);

        break;

        case 'poll':
            
            const pollEmbed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Create a Poll")
            .setDescription("Multi-reaction poll type: !poll {title} [option 1] [option 2] [option 3] ... \n ***NOTE*** Supports up to 8 options; PLEASE ADHERE TO FORMAT");

            // Lacks args - Send Embed
            if(!args[1]){
                message.channel.send(pollEmbed);
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

        case 'secretsanta':
            const santaEmbed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Secret Santa!")
            .setDescription("Participate in the exchanging of gifts between Rich Homies. !secretsanta Y to join ");

            // Lacks args - Send Embed
            if(!args[1]){
                message.channel.send(santaEmbed);
                break;
            }
        
            message.author.send("Thanks for joining the Rich Homies Secret Santa Tradition. Expect to see your match messaged here once the registration closes!")

            /*
                Notes; I will announce registration and keep it open for several weeks. The bot will continuously keep a list of all the participants (with duplicate restrictions)
                Once registration ends, I will call a master secret santa command that will pair all participants and private message them accordingly. The secret-santa channel will 
                also have a pinned spreadsheet for general info on all participants (shirt sizes, interests, etc). 
            */
        
        break;
    }

});

bot.login(process.env.BOT_TOKEN);
