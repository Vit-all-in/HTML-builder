const fs = require('fs');
const path = require('path');

fs.createWriteStream(path.join(__dirname, "/project-dist/bundle.css"));

fs.readdir(path.join(__dirname, "styles"), {
   withFileTypes: true
}, (err, data) => {
   if (err) throw err;
   data.forEach(file => {
      if (file.isFile()) {
         if (path.extname(path.join(__dirname, 'styles', file.name)) === '.css') {
            fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (err, data) => {
               if (err) throw err;
               fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
                  if (err) throw err;
               })
            });
         }
      }
   })
});