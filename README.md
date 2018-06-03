[![Voicybot](/design/github-header.png?raw=true)](http://voicybot.com/)

# [@deletr_bot](https://t.me/deletr_bot) main repository
This repository contains the code for another bot of mine called Deletr — the sole purpose of which is to delete `Deleted Account` users from chats and channels. Enjoy!

# Warning!
This version of the code currently doesn't work but will work as soon as Telegram allows to fetch users lists to the admin bots.

# Installation and local launch
1. Clone this repo: `git clone https://github.com/backmeupplz/deletr`
2. Create `.env` file with `TOKEN`
3. Run `yarn install` in the root folder
4. Run `yarn start`

# Environment variables in `.env` file
* `TOKEN` — Telegram bot token

# Continuous integration
Any commit pushed to master gets deployed to [@deletr_bot](https://t.me/deletr_bot) via [CI Ninja](https://github.com/backmeupplz/ci-ninja).

# License
MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!