const fs = require("fs");
const path = require("path");
const { green, cyan } = require("kleur");
const { getTwindleLibraryPath } = require("./env");
const libraryPath = getTwindleLibraryPath();

const getLibraryPath = (...extraPaths) => {
  const libPath = libraryPath
    ? libraryPath
    : path.join(process.cwd(), "TwindleLibrary");

  // if extra paths given, combine them with the library path
  if (extraPaths) {
    return path.join(libPath, ...extraPaths);
  }
  return libPath;
};
function createLibraryIfNotExists() {
  const exists = fs.existsSync(getLibraryPath());
  if (!exists) {
    console.log(`
No ${cyan("TwindleLibrary")}📚 found, creating a new TwindleLibrary to
${green(getLibraryPath())}

If you wish to set your own TwindleLibrary, set the TWINDLE_LIBRARY_PATH enviroment variable to your prefered location
`);
    fs.mkdirSync(getLibraryPath());
  }
}

module.exports = { createLibraryIfNotExists, getLibraryPath };
