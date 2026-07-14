import type { StorybookConfig } from '@storybook/react-vite';

const mode = process.env.STORYBOOK_MODE;

const config: StorybookConfig = {
	framework: '@storybook/react-vite',
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs', '@github-ui/storybook-addon-performance-panel'],
	core: {
		disableTelemetry: true,
	},
	docs: {
		defaultName: 'Docs',
		docsMode: mode === 'docs',
	},
	async viteFinal(config) {
		return {
			...config,
			base: '/react-folding-fan-gallery/',
		};
	},
};
export default config;
