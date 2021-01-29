const childProcess = require("child_process");

const openFile = function (outputFilePath) {
  const result = childProcess.exec(command() + " " + `${outputFilePath}`);

  return result;
};

function command() {
  switch (process.platform) {
    case "darwin":
      return "open";
    case "win64":
      return "start";
    default:
      return "xdg-open";
  }
}

module.exports = { openFile };
