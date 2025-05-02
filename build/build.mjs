import * as esbuild from "esbuild";
import fs from 'node:fs';

const result = esbuild.buildSync(JSON.parse(fs.readFileSync('esbuild.json', 'utf8')));
if(result.errors.length !== 0) {
    result.errors.forEach(msg => console.error(JSON.stringify(msg)));
    throw Error('build fail');
}

if(result.warnings.length !== 0)
    result.warnings.forEach(msg => console.warn(JSON.stringify(msg)));

fs.copyFileSync('index.html', 'dist/index.html');