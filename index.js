// Get environment variables
require('dotenv').config({path: `${__dirname}/.env`})
// Dependencies
const Telegraf = require('telegraf')

// Setup the bot
const bot = new Telegraf(process.env.TOKEN, {username: 'deletr_bot'})
// Setup help message
const help = 'Hello there! I\'m @deletr_bot and my sole purpose is to delete <code>Deleted Account</code> users from chats and channels. To unleash my full potential, add me to a channel or chat, make me an admin in that channel or chat and then simply write /delete there. That\'s it! No more filthy <code>Deleted Account</code> users. You are welcome.\n\n/help — This message\n/delete — delete all <code>Deleted Account</code> users from this group or chat'
// Added to the chat
bot.on('new_chat_members', (ctx) => {
  if (ctx.message.new_chat_members.map(m => m.username || '').includes('deletr_bot'))
    sendHelp(ctx)
})
// Start and help commands
bot.command(['start', 'help'], (ctx) => {
  sendHelp(ctx)
})
// Delete command
bot.command('delete', (ctx) => {
  deleteUsers(ctx)
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
  ctx.replyWithMarkdown('Deleting all `Deleted Account` users... (tbh, not working yet)')
  // Get all users
  // TODO: implement when Telegram Bot Api allows us to fetch users list
}
// Start the bot
bot.startPolling()