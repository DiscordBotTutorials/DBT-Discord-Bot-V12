module.exports = {
	name: 'clear',
	aliases: ['cl', 'delete'],
	permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES", "MANAGE_GUILD"],
	description: 'Clears messages!',
	async execute(message, args) {
		if(!args[0]) return message.reply("please enter the amount of messages that you want to clear!");
        if(isNaN(args[0])) return message.reply("please enter a real number!");

        if(args[0] > 100) return message.reply("You canno't delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete atleast one message!");

		await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
			message.channel.bulkDelete(messages);
		});
	},
};