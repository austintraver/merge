module.exports = {

  // /* Global options: */
  // verbose: true,
  artifactsDir: "firefox",
  ignoreFiles: [
      "build.sh",
  ],
  /* Command options: */
  build: {
    overwriteDest: true,
  },
  run: {
    // browserConsole: true
  },
  lint: {
    output: "text",
    warningsAsErrors: true
  }
}
