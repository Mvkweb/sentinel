# Sentinel Discord Bot

This project provides a scalable and maintainable Discord bot structure built with Bun.js and TypeScript, designed for moderation purposes. It focuses on a clean architecture, modular organization, and best practices for future command implementation and feature expansion.

## Project Structure

The project follows a modular approach with the following key directories and files:

```
.
├── config.yml
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── bot.ts
│   ├── commands/
│   │   └── ping.ts
│   ├── events/
│   │   └── ready.ts
│   └── types/
│       ├── command.ts
│       └── event.ts
└── build.js (for platform-specific compilation, if desired)
```

*   **`config.yml`**: Stores essential bot configuration, such as the Discord bot token and command prefix.
*   **`src/index.ts`**: The main entry point of the application, responsible for loading configuration and initializing the bot.
*   **`src/bot.ts`**: Contains the core bot logic, including Discord client initialization, command loading, and event handling.
*   **`src/commands/`**: Houses individual command modules. Each command is defined with its data (name, description) and execution logic.
*   **`src/events/`**: Contains event handler modules. Each module listens for specific Discord events (e.g., `ready`, `messageCreate`) and defines the actions to be taken.
*   **`src/types/`**: Stores TypeScript interface definitions for commands and events, ensuring type safety and consistency across the project.
*   **`tsconfig.json`**: TypeScript configuration file.
*   **`package.json`**: Manages project dependencies and defines scripts for building and running the bot.
*   **`build.js`**: A utility script to facilitate platform-specific compilation using Bun's `--compile` feature.

## Setup and Installation

To get started with the Sentinel Discord Bot, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sentinel-bot.git
    cd sentinel-bot
    ```

2.  **Install dependencies:**
    This project uses [Bun](https://bun.sh/) as the package manager and runtime.
    ```bash
    bun install
    ```

3.  **Configure the bot:**
    Open `config.yml` and replace `YOUR_BOT_TOKEN_HERE` with your actual Discord bot token. You can obtain a bot token from the [Discord Developer Portal](https://discord.com/developers/applications).
    ```yaml
    token: YOUR_BOT_TOKEN_HERE
    prefix: !
    ```
    Ensure that the necessary [Privileged Gateway Intents](https://discord.com/developers/docs/topics/gateway#privileged-intents) (Guilds, Guild Members, Guild Bans, Guild Messages, Message Content) are enabled for your bot in the Discord Developer Portal.

## Running the Bot

To run the bot in development mode:

```bash
bun run start
```

This command will execute the `src/index.ts` file directly using Bun.

## Building the Bot (Optional)

If you wish to create a standalone executable for your specific operating system, you can use the `build` script.

To build for Windows:
```bash
SET PLATFORM=windows && bun run build
```

To build for Linux:
```bash
export PLATFORM=linux && bun run build
```

To build for macOS:
```bash
export PLATFORM=macos && bun run build
```

The compiled executable will be generated in the project root (e.g., `bot.exe` for Windows, `bot` for Linux/macOS).

## Extending the Bot

### Adding New Commands

To add a new command:

1.  Create a new TypeScript file in the `src/commands/` directory (e.g., `src/commands/myCommand.ts`).
2.  Define your command using the `Command` interface from `src/types/command.ts`.

    ```typescript
    import { SlashCommandBuilder } from 'discord.js';
    import { Command } from '../types/command';

    export const command: Command = {
        data: new SlashCommandBuilder()
            .setName('mycommand')
            .setDescription('This is my new command!'),
        async execute(interaction) {
            await interaction.reply('Hello from my new command!');
        },
    };
    ```

### Adding New Event Handlers

To add a new event handler:

1.  Create a new TypeScript file in the `src/events/` directory (e.g., `src/events/guildMemberAdd.ts`).
2.  Define your event handler using the `Event` interface from `src/types/event.ts`.

    ```typescript
    import { Event } from '../types/event';
    import { GuildMember } from 'discord.js';

    export const event: Event<'guildMemberAdd'> = {
        name: 'guildMemberAdd',
        execute(member: GuildMember) {
            console.log(`New member joined: ${member.user.tag}`);
            // Add your logic here, e.g., send a welcome message
        },
    };
