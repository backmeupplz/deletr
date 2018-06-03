// Get environment variables
require('dotenv').config({path: `${__dirname}/.env`})
// Dependencies
const Telegraf = require('telegraf')

// Setup the bot
const bot = new Telegraf(process.env.TOKEN)

// Setup help message
const help = 'Hi there! I\'m @deletr_bot and my sole purpose is to delete <code>Deleted Account</code> users from chats and channels. To unleash my full potential, add me to a channel or chat, make me an admin in that channel or chat and then simply write /delete there. That\'s it! No more filthy <code>Deleted Account</code> users. You are welcome.\n\n/help — This message\n/delete — delete all <code>Deleted Account</code> users from this group or chat'

// Custom middleware
bot.use((ctx, next) => {
  // If there is no message, just do next
  if (!ctx.message) return next()
  // Add to chat
  if (ctx.message.new_chat_member && ctx.message.new_chat_member.username === 'deletr_bot')
    return sendHelp(ctx)
  // Start and help commands
  const isCommand = ctx.message.entities &&
    ctx.message.entities.length &&
    ctx.message.entities.map(e => e.type).includes('bot_command')
  const regex_results = /\/([^@\s]{1,})(?:@deletr_bot|\s|$)/gm.exec(ctx.message.text)
  const command = !regex_results ? null : regex_results[1]
  if (command === 'delete')
    deleteUsers(ctx)
  else if (command === 'start' || command === 'help')
    sendHelp(ctx)
  // Continue execution
  return next()
})

// Send help function
function sendHelp(ctx) {
  ctx.replyWithHTML(help)
}

// Delete
async function deleteUsers(ctx) {
  // Check if this is a private chat
  if (ctx.chat.type === 'private') {
    ctx.reply('Sorry but I cannot delete any users in private chat.')
    return
  }
  // Check if admin
  const admins = await ctx.getChatAdministrators()
  const adminUsernames = admins.map(a => a.username)
  const isAdmin = adminUsernames.includes('deletr_bot') ||
    (ctx.chat.type === 'group') && ctx.chat.all_members_are_administrators
  if (!isAdmin) {
    ctx.replyWithMarkdown('Sorry but I should be an admin to delete the `Deleted Account` users.')
    return
  }
  // Notify users that delete operation has started
  ctx.replyWithMarkdown('Deleting all `Deleted Account` users...')
  // Get all users
  // TODO: implement when Telegram Bot Api allows us to fetch users list
}

// Start the bot
bot.startPolling()