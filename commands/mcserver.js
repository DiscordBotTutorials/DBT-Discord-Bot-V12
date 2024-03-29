const util = require('minecraft-server-util');

module.exports = {
    name: 'mcserver',
    aliases: ['mc', 'mccheck', 'minecraft'],
    permissions: [],
    cooldown: 120,
    description: 'get information about a minecraft server',
    execute(message,args, cmd, client, Discord) {


        if (cmd === 'mcserver') {
            if (!args[0]) return message.channel.send('Please enter a minecraft server ip');
            if (!args[1]) return message.channel.send('Please enter a minecraft server port');

            util.status(args[0], { port: parseInt(args[1]) }).then((response) => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#BFCDEB')
                    .setTitle('Mc server status')
                    .addFields(
                        { name: 'Server IP', value: response.host },
                        { name: 'Online Players', value: response.onlinePlayers },
                        { name: 'Max Players', value: response.maxPlayers },
                        { name: 'Version', value: response.version }
                    )
                    .setFooter('Mc server util by CodeLyon');

                message.channel.send(embed);
            })
                .catch((error) => {
                    message.channel.send('there was an error finding this server');
                    throw error;
                });
        }

        if (cmd === 'mc') {
            message.channel.send('THis is not an mc server');
        }
    
        if(cmd === 'minecraft') {
            message.channel.send('WE LOVE MINECRAFT');
        }
    }


}