import * as esbuild from "esbuild";
import fs from 'node:fs';
let context = await esbuild.context(JSON.parse(fs.readFileSync('esbuild.json', 'utf8')));
let serve = await context.serve({ host: 'localhost', servedir: 'dist', port: 9090 });

let { hosts, port } = serve;
hosts.forEach(host => console.log(`http://${host}:${port}`));