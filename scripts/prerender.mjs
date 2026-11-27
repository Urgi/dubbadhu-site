/**
 * Puts the server-rendered homepage into dist/index.html after `vite build`.
 * Search crawlers then see the real page text and store links without running JavaScript.
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlPath = `${root}dist/index.html`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const { render } = await import(serverEntry);
const html = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("prerender: #root marker not found in dist/index.html");

await writeFile(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log("prerender: homepage HTML written to dist/index.html");
