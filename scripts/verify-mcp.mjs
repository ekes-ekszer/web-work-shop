import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const configPath = resolve('.vscode/mcp.json');
const expectedUrl = 'https://mcp.figma.com/mcp';

let config;

try {
  config = JSON.parse(await readFile(configPath, 'utf8'));
} catch (error) {
  console.error(`Unable to read ${configPath}: ${error.message}`);
  process.exit(1);
}

const figmaServer = config?.servers?.figma;
const figmaTokenServer = config?.servers?.['figma-token'];
const tokenHeader = figmaTokenServer?.headers?.Authorization;

if (figmaServer?.type !== 'http' || figmaServer.url !== expectedUrl) {
  console.error(
    `The Figma MCP server must be an HTTP server configured with ${expectedUrl}.`,
  );
  process.exit(1);
}

if (
  figmaTokenServer?.type !== 'http' ||
  figmaTokenServer.url !== expectedUrl ||
  tokenHeader !== 'Bearer ${input:figma_access_token}'
) {
  console.error(
    'The figma-token MCP server must use the configured Figma access-token input.',
  );
  process.exit(1);
}

console.log(`Figma MCP configuration is valid: ${configPath}`);
