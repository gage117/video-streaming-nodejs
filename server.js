const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires Range header');
  }

  const videoPath = "hello-there.mp4";
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  }
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
})

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
})