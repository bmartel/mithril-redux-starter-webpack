module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
	},
	env: {
		browser: true,
	},
	extends: [
		'plugin:prettier/recommended',
	],
	// required to lint *.vue files
	plugins: [
		'prettier',
	],
	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// enable prettier
		'prettier/prettier': 'error',
	},
	globals: {
		'requestAnimationFrame': true,
		'cancelAnimationFrame': true,
		'Promise': true,
	},
};

