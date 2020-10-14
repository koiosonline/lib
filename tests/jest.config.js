module.exports = {
  preset: 'jest-puppeteer',
  verbose: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$",
  // transform: {
  //   "^.+\\.jsx?$": "babel-jest",
  //   "^.+\\.mjs$": "babel-jest",
  // },
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "mjs", "node"]
  // preset: "jest",
  //   testEnvironment: "node",
  //   transform: {
  //     "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  //   },
  //   transformIgnorePatterns: [
  //     "node_modules/(?!variables/.*)"
  //   ]
}