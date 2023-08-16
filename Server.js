const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const wpfAppPort = 8080; // Порт WPF приложения

app.post('/startTimer', (req, res) => {
  const totalSeconds = req.body.totalSeconds;
  
  const options = {
    hostname: 'localhost',
    port: wpfAppPort,
    path: '/startTimer',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  const wpfReq = http.request(options, wpfRes => {
    let data = '';
    wpfRes.on('data', chunk => {
      data += chunk;
    });

    wpfRes.on('end', () => {
      res.status(200).send(data);
    });
  });

  wpfReq.on('error', error => {
    console.error(error);
    res.status(500).send('Error communicating with WPF app.');
  });

  wpfReq.write(`totalSeconds=${totalSeconds}`);
  wpfReq.end();
});

const server = app.listen(3000, () => {
  console.log('Node.js server is running on port 3000');
});
