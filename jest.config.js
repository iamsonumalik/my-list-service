module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.schema.ts',
  ],
  setupFilesAfterEnv: ['./test/setup.ts'], // If you need custom setup
};
