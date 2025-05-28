import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from './types/command';
import { Event } from './types/event';
import * as fs from 'fs';
import * as path from 'path';

export class DiscordBot {
    public client: Client;
    public commands: Collection<string, Command>;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildBans,
            ],
        });
        this.commands = new Collection();
    }

    private async loadCommands() {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const { command } = await import(filePath);
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    private async loadEvents() {
        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const { event } = await import(filePath);
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }

    public async start(token: string) {
        await this.loadCommands();
        await this.loadEvents();
        this.client.login(token);
    }
}