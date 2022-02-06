import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'
import Heroku from 'heroku-client'
import request from '../../lib/request'
import { MessageType } from '@adiwajshing/baileys'
// import { MessageType, Mimetype } from '@adiwajshing/baileys'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'restart',
            description: `test`,
            aliases: ['restart'],
            category: 'heroku',
            usage: `${client.config.prefix}restart`,
            modsOnly: true,
            baseXp: 50
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
if (!this.client.config.hapi) return void M.reply("No heroku API key set");
    if (!this.client.config.hname) return void M.reply("No heroku name set");
const heroku = new Heroku({
    token: `${this.client.config.hapi}`
});
const baseURI = '/apps/' + `${this.client.config.hname}`
    await M.reply(`Restarting.............`)
await heroku.delete(baseURI + '/dynos').catch(async (error: any) => {
        await M.reply("Error");
    });
}
}
