import { existsSync, mkdirSync } from "fs";
import { cyan, green } from "kleur";
import { join } from "path";

const getLibraryPath = (...extraPaths) => {
  const libPath = process.env.TWINDLE_LIBRARY_PATH
    ? process.env.TWINDLE_LIBRARY_PATH
    : join(process.cwd(), "TwindleLibrary");

  // if extra paths given, combine them with the library path
  if (extraPaths) {
    return join(libPath, ...extraPaths);
  }
  return libPath;
};
function createLibraryIfNotExists() {
  const exists = existsSync(getLibraryPath());
  if (!exists) {
    console.log(`
No ${cyan("TwindleLibrary")}📚 found, creating a new TwindleLibrary to
${green(getLibraryPath())}

If you wish to set your own TwindleLibrary, set the TWINDLE_LIBRARY_PATH enviroment variable to your prefered location
`);
    mkdirSync(getLibraryPath());
  }
}

export { createLibraryIfNotExists, getLibraryPath };
