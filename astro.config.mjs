import { existsSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const nodeModulesPath = resolve(projectRoot, 'node_modules');
const nodeModulesRealPath = existsSync(nodeModulesPath)
    ? realpathSync(nodeModulesPath)
    : nodeModulesPath;

export default defineConfig({
    site: 'https://kalivoda.design',
    integrations: [sitemap()],
    i18n: {
        defaultLocale: 'cs',
        locales: ['cs', 'en'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    vite: {
        server: {
            fs: {
                allow: [projectRoot, nodeModulesRealPath],
            },
        },
    },
});
