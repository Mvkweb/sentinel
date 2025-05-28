import { DiscordBot } from './bot';
import * as fs from 'fs';
import * as yaml from 'yaml';

async function main() {
    const configPath = './config.yml';
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.parse(configContent);

    const bot = new DiscordBot();
    bot.start(config.token);
}

main().catch(console.error);