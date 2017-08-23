/**
 * Created by user on 2017-08-23.
 */
const express = require('express');
const app = express();
const vidStreamer = require('vid-streamer'); //비디오 스트리밍
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendfile('/public/pages/login.html');
});

app.get('/monitoring', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/index.html'));
});

app.post('/login', function (req, res) {
    let user = {
        username: 'wisoft',
        password: 'wisoft123',
    };
    let username = req.body.username;
    let password = req.body.password;
    if(username === user.username && password === user.password) {
       res.redirect('/monitoring');
    } else {
        res.send('Who are you? <a href ="/">login</a>');
    }
    console.log(username + ", " + password);
});

app.get('/kiosk', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/kiosk.html'))
});

app.get('/map', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/map.html'))
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});