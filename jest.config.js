module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/*.test.ts'],
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
        'src/**/*.{ts,js}',
        '!src/port/gprc/gen/**'
    ], // Specify the files for coverage
    coverageDirectory: 'coverage', // Directory where coverage reports will be output
    coverageReporters: ['text', 'html'], // Output text in terminal and HTML file
};
