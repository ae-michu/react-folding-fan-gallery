import { addons } from 'storybook/manager-api';

const mode = process.env.STORYBOOK_MODE;

addons.setConfig({
	layoutCustomisations: {
		showSidebar() {
			// hide side bar
			return mode === 'docs' ? false : true;
		},
		showToolbar() {
			// hide toolbar
			return mode === 'docs' ? false : true;
		},
	},
	panelPosition: 'right',
	initialActive: 'canvas',
});
