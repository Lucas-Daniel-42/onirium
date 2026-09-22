import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');

if (dirname(output) !== root || basename(output) !== 'dist') {
  throw new Error('Refusing to build outside the project dist directory.');
}

if (existsSync(output)) rmSync(output, { recursive: true, force: true });
mkdirSync(resolve(output, 'assets'), { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js']) {
  copyFileSync(resolve(root, file), resolve(output, file));
}

for (const file of readdirSync(resolve(root, 'assets')).filter(name => /\.(svg|png|jpe?g|webp|avif|woff2)$/i.test(name))) {
  copyFileSync(resolve(root, 'assets', file), resolve(output, 'assets', file));
}

console.log('Static prototype built in dist/.');
