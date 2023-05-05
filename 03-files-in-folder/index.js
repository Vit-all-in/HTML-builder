const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "secret-folder"), {
   withFileTypes: true
}, (err, data) => {
   if (err) throw err;
   data.forEach(file => {
      if (file.isFile()) {
         fs.stat(path.join(__dirname, "secret-folder", file.name), (err, stats) => {
            if (err) throw err;
            const index = file.name.lastIndexOf('.');
            console.log(file.name + ' - ' + (file.name).slice(index) + ' - ' + stats.size + ' bytes');
         })
      }
   })
});