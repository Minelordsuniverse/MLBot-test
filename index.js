const discord = require("discord.js")
const client = new discord.Client()

client.once('ready', () => {
	console.log('Ready!');
});

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const { CommandoClient } = require("discord.js-commando");
const { Structures } = require("discord.js");
const path = require("path");
const Keyv = require("keyv");
const Canvas = require("canvas");
const chalk = require("chalk");
const { MessageEmbed } = require("discord.js");
Structures.extend("Guild", Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        songDispatcher: null
      };
    }
  }
  return MusicGuild;
});

const commandoClient = new CommandoClient({
  commandPrefix: "?",
  unknownCommandResponse: false,
  disableEveryone: false,
  invite: "https://discord.gg/F2PfNVgnff",
  owner: process.env.OWNERID
});

client.on('guildCreate',guild=>{
  //  console.log(server)
  let link=''
    guild.owner.send('Thanks for having me !')
    var found = false;
    guild.channels.forEach(function(channel, id) {
        // If a channel is already found, nothing more needs to be done
        if(found == true || channel.type != "text") {
          return;
        }
        // If the channel isn't found and the bot has permission to 
        // send and read messages in the channel, send a welcome message there
        if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
          found = true;
          return channel.send("Glad to meet you all , use ? for all my commands , use https://discord.com/api/oauth2/authorize?client_id=771083554515714090&permissions=8&scope=bot to invite me to your server")
        }
    })
  });

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content === "") return;
  let embed = new MessageEmbed()
    .addField("User", message.author)
    .addField("Role", message.member.roles.first().name)
    .addField("Message", message.content)
    .addField("Channel", "#" + message.channel.name)
    .setFooter("Message ID | " + message.id)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .setColor(message.member.roles.first().hexColor);
  let channel = client.guilds.get("636371108576100356").channels.find(
    channel =>
      channel.name ===
      message.guild.name
        .split(" ")
        .join("-")
        .toLowerCase()
  );
  channel.send(embed);
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["arcade", "Fun Commands"],
    ["moderation", "Moderation Commands"],
    ["music", "Music Commands"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("guildCreate", async guild => {
  let logchannelfix = guild.name
    .split(" ")
    .join("-")
    .toLowerCase();
  if (
    client.guilds.get("636371108576100356").channels.find(
      channel =>
        channel.name ===
        guild.name
          .split(" ")
          .join("-")
          .toLowerCase()
    ) === undefined
  ) {
    client.guilds
      .get("636371108576100356")
      .channels.create(`${logchannelfix}`)
      .then(channel => {
        channelz
          .setParent("637403861073657887")
          .then(ch => {
            ch.lockPermissions();
          })
          .catch(err => {});
      });
  }
});
client.on("ready", () => {
  client.guilds.forEach(g => {
    let logchannelfix = g.name
      .split(" ")
      .join("-")
      .toLowerCase();
    if (
      client.guilds.get("636371108576100356").channels.find(
        channel =>
          channel.name ===
          g.name
            .split(" ")
            .join("-")
            .toLowerCase()
      ) === undefined
    ) {
      client.guilds
        .get("636371108576100356")
        .channels.create(`${logchannelfix}`)
        .then(channel => {
          channel
            .setParent("637403861073657887")
            .then(ch => {
              ch.lockPermissions();
            })
            .catch(err => {});
        });
    }
  });
  console.log(chalk.greenBright("[Status]"), "Bot Online");
  client.user.setActivity("Command Prefix is ?");
});

const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
  warnThreshold: 5,
  kickThreshold: 7,
  banThreshhold: 8,
  maxInternal: 2000,
  warnMessage: '{@user}, Please stop spamming.',
  kickMessage: '**{user_tag}** has been kicked for spamming.',
  banMessage: '**{user_tag}** has been banned for spamming.',
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: [ 'ADMINISTRATOR'],
  ignoreBots: true,
  verbalose: true,
  ignoredUsers: [],
    ignoredRoles: ["743528012921831596"]
});

process.on("uncaughtException", error =>
  console.log(chalk.redBright("[Uncaught Exception]"), error)
);

const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
 
   let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg" })
 
    const attachment = new discord.MessageAttachment(
      data,
      "welcome-image.png"
    );
 
    channel.send(
      `Welcome to the server, ${member.user.username}!`,
      attachment
    );   
   });
 

client.login(process.env.TOKEN)
