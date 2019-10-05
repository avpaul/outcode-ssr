const fs = require('fs');

const value =
  "default-src self; script-src 'self' https://www.google-analytics.com; style-src 'self'; style-src-elem 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self' *.cloudinary.com https://www.google-analytics.com; manifest-src 'self'; connect-src https://outcode.herokuapp.com;";
const oldValue =
  "default-src self; script-src 'self' https://www.google-analytics.com; style-src *; style-src-attr 'self'; style-src-elem 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; manifest-src 'self'; media-src 'self'; img-src 'self' *.cloudinary.com https://www.google-analytics.com; connect-src 'self' http://localhost:8000;";

(function() {
  let file;
  let lines;
  let attributeLine;

  try {
    file = fs.readFileSync('./public/index.html', { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
  }

  lines = file.split(/\r?\n/);
  lines.forEach(function(line, i) {
    if (line.match(/(Content-Security-Policy)/)) {
      attributeLine = i;
    }
  });

  if (lines[attributeLine + 1].match(/(content)/)) {
    const line = lines[attributeLine + 1];
    lines[attributeLine + 1] = line.replace(
      /content="(\w|\s|-|;|\.|\*|'|:|\/){0,}"/,
      `content="${value}"`
    );
    try {
      fs.writeFileSync('./public/index.html', lines.join('\r'));
    } catch (error) {
      throw error;
    }
    console.log('file updated successfully');
  }
})();
