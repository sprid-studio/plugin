import { createRequire } from 'node:module';
import { resolve } from 'node:path';

export function loadResearchBrowser(cwd = process.cwd()) {
  // The documented install runs in the customer's repo, while this plugin may
  // live in a separate, versioned agent cache.
  const require = createRequire(resolve(cwd, 'package.json'));
  try { return require('playwright-core').chromium; }
  catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    throw new Error('Research needs playwright-core in this app repo. Run npm install -D playwright-core here, then retry. Google Chrome must also be installed.');
  }
}
