const express = require('express');
const path = require('path');
const app = express();
const ws = require('ws');

app.use(express.static('css'));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})
app.get('/rfid', function(req,res){
    res.sendFile(path.join(__dirname, '/views/rfid.html'))
})
app.get('/network', function(req,res){
    res.sendFile(path.join(__dirname, '/views/network.html'))
})
app.get('/chargingpoint', function(req,res){
    res.sendFile(path.join(__dirname, '/views/chargingpoint.html'))
})
app.get('/chargconnector', function(req,res){
    res.sendFile(path.join(__dirname, '/views/chargconnector.html'))
})

const http = require('http');
const server = http.createServer(app);

const port = 3000;
// process.env.PORT for production
server.listen(port, () => console.log('server started on ' + port));

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
    console.log("new client connected");

  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {

      //log the received message and send it back to the client
     console.log('received: %s', message);
      ws.send(`${message}`);
  });
})
// app.post('/rfid', function(req,res){
//     var tag1 = req.body.tag1;
//     var tag2 = req.body.tag2;
//     var tag3 = req.body.tag3;
//     var tag4 = req.body.tag4;
//     var tag5 = req.body.tag5;
//     var f = { tag1: tag1, tag2: tag2, tag3: tag3, tag4: tag4, tag5: tag5};
//     console.log("post", f);
// });

// app.post('/network', function(req,res){
//     var i_type    = req.body.i_type;
//     var ssid = req.body.ssid;
//     var pwd = req.body.pwd;
//     var security = req.body.security;
//     var apn = req.body.apn;
//     var gsm_pass = req.body.gsm_pass;
//     var gsm_type = req.body.gsm_type;
//     var f = { 
//         i_type: i_type, 
//         ssid: ssid,
//         pwd: pwd,
//         security: security,
//         apn: apn,
//         gsm_pass: gsm_pass, 
//         gsm_type: gsm_type
//     }
//     console.log("post", f);
// })


