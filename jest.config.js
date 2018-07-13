module.exports = {
  "roots": [
	  "./tests"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!lit-html)/",
    "node_modules/(?!@polymer)/lit-element/"
  ]
}
