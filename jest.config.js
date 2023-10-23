module.exports = {
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	testEnvironment: 'jsdom',
};
