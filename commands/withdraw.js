const profileModel = require("../models/profileSchema");
module.exports = {
  name: "withdraw",
  aliases: ["wd"],
  permissions: [],
  description: "withdraw coins from your bank",
  async execute(message, args, cmd, client, discord, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");

    try {
      if (amount > profileData.bank) return message.channel.send(`You don't have that amount of coins to deposit`);

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return message.channel.send(`You withdrew ${amount} of coins into your wallet`);
    } catch (err) {
      console.log(err);
    }
  },
};
