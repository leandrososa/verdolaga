const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#F0FFF4',
					100: '#C6F6D5',
					200: '#9AE6B4',
					300: '#68D391',
					400: '#48BB78',
					500: '#38A169',
					600: '#2F855A',
					700: '#276749',
					800: '#22543D',
					900: '#1C4532'
				},
				secondary: {
					500: '#A14884'
				}
			}
		}
	}
};

module.exports = config;
