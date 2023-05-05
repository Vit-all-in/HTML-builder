const fs = require("fs");
const path = require("path");

const { stdin, stdout } = process;

stdout.write("Please enter text:\n");

fs.access(path.join(__dirname, 'text.txt') , (error) => {
  if (error) {
    fs.promises.writeFile(path.join(__dirname, 'text.txt'), "");
  }
});

stdin.on("data", (data) => {
  fs.appendFile(path.join(__dirname, 'text.txt'), data.toString(), (err) => {
    if (err) throw err;
  });
  if (data.toString().trim() === "exit") {
    process.exit();
  }
});

process.on("exit", () => {
  stdout.write("Good bye!\n");
}).on("SIGINT", () => {
  process.exit();
});
