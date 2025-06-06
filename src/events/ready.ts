import { Event } from '../types/event';
import { Client } from 'discord.js';

export const event: Event<'ready'> = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};