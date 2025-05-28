import { exec } from 'child_process';
import { readFileSync } from 'fs';

const platform = process.env.PLATFORM || 'windows'; // Default to windows
const scriptName = 'build:' + platform;

try {
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
  if (packageJson.scripts && packageJson.scripts[scriptName]) {
    console.log('Running script: ' + scriptName);
    exec('bun run ' + scriptName, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing script: ' + error);
        return;
      }
      console.log('stdout: ' + stdout);
      console.error('stderr: ' + stderr);
    });
  } else {
    console.error('Script "' + scriptName + '" not found in package.json');
  }
} catch (error) {
  console.error('Failed to read package.json: ' + error);
}