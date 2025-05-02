import * as esbuild from "esbuild";
import fs from 'node:fs';
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');
fs.copyFileSync('index.html', 'dist/index.html');
let context = await esbuild.context(JSON.parse(fs.readFileSync('esbuild.json', 'utf8')));
let serve = await context.serve({ host: 'localhost', servedir: 'dist', port: 9090 });

let { hosts, port } = serve;
hosts.forEach(host => console.log(`http://${host}:${port}`));