const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(8000, function() {
  console.log("listening on port 8000");
})