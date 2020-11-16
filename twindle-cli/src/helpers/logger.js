function devLog(...args) {
  if (process.env.DEV === "true") {
    console.log(...args);
  }
}

// this adds a new function to console which only prints the input
// when environment variable DEV=true
console.devLog = devLog;
