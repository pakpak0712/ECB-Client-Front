module.exports = {
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: [/*'react-refresh',*/ '@typescript-eslint', 'react-hooks', 'prettier'],
	rules: {
		// 'react-refresh/only-export-components': 'warn',
		'@typescript-eslint/no-extra-semi': 'off',
		'no-undef': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'@typescript-eslint/no-this-alias': 'warn',
		'prettier/prettier': 'error',
	},
};
