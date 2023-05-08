const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'template.html'));
let str = '';

fs.mkdir(path.join(__dirname, 'project-dist'), {
   recursive: true
}, (err) => {
   if (err) throw err;
});

stream.on('data', (data) => {
   str += data;
}).on('error', (err) => {
   if (err) throw err;
});

stream.on('end', () => {
   fs.readdir(path.join(__dirname, 'components'), {
      withFileTypes: true
   }, (err, data) => {
      if (err) throw err;
      data.forEach((file) => {
         fs.createReadStream(path.join(__dirname, 'components', file.name)).on('data', (chunk) => {
            str = str.replace(new RegExp(`{{${file.name.split('.')[0]}}}`), chunk);
            fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(str);
         });
         fs.createReadStream(path.join(__dirname, 'components', file.name)).on('error', (error) => console.log(error.message));
      });
   });
});

fs.readdir(path.join(__dirname, 'styles'), {
   withFileTypes: true
}, (err, data) => {
   if (err) throw err;
   fs.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true
   }, (err) => {
      if (err) throw err;
   });
   data.forEach((file) => {
      fs.createReadStream(path.join(__dirname, 'styles', file.name)).on('data', (data) => fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css')).write(data)).on('error', (err) => {
         if (err) throw err;
      });
   });
});

const assets = path.join(__dirname, 'assets');
const distAssets = path.join(__dirname, 'project-dist', 'assets');

function copyDirectory(assets, distAssets) {
   fs.mkdir(distAssets, {
      recursive: true
   }, (err) => {
      if (err) throw err;
   });

   fs.readdir(assets, (err, data) => {
      data.forEach((file) => {
         if (err) {
            throw err;;
         }
         fs.stat(path.join(assets, file), (err, stats) => {
            if (err) {
               throw err;
            }
            if (stats.isDirectory()) {
               copyDirectory(path.join(assets, file), path.join(distAssets, file));
               return;
            }
            fs.copyFile(path.join(assets, file), path.join(distAssets, file),
               (err) => {
                  if (err) {
                     throw err;
                  }
               }
            );
         });
      });
   });
};

copyDirectory(assets, distAssets);