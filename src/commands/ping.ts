import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/command';

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};