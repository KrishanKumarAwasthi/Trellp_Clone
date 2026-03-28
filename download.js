const fs = require('fs');
const path = require('path');
const https = require('https');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzdmODNjY2Q3M2JkYzQxZDBhMDc3ZDIzOWU0YTIwYTA5EgsSBxDU0JDT_xgYAZIBIgoKcHJvamVjdF9pZBIUQhI0NzM5NjU3MTM0OTAxMjExOTA&filename=&opi=89354086";

if (!fs.existsSync('frontend')) {
  fs.mkdirSync('frontend');
}

https.get(url, (res) => {
  const filePath = path.join(__dirname, 'frontend', 'index.html');
  const file = fs.createWriteStream(filePath);
  res.pipe(file);
  file.on('finish', () => {
    console.log('✅ HTML UI downloaded securely inside frontend/index.html');
    file.close();
  });
}).on('error', (err) => {
  console.error('❌ Error downloading:', err.message);
});
