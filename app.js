/**
 * Created by user on 2017-08-23.
 */
'use strict';
const express = require('express');
const app = express();
const vidStreamer = require('vid-streamer'); //비디오 스트리밍
const bodyParser = require('body-parser');
const tcp = require('./tcp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/public'));
tcp.getConnection();

app.get('/', function (req, res) {
    res.sendfile('/public/pages/login.html');
});

app.get('/monitoring', function (req, res) {
    res.sendFile((__dirname + '/public/pages/admin.html'));
});

app.post('/login', async (req, res) => {
    let login = {code: 'login', username: req.body.username, password: req.body.password};
    if (await tcp.send(login) === 'true')
        res.redirect('/monitoring');
    else
        res.sendFile('/public/pages/login_fail.html');
});

app.post('/register', async (req, res) => {
    let sign = {
        code: 'sign',
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tel: req.body.tel
    };

    if (await tcp.send(sign) !== 'false')
        res.send('회원가입에 성공했습니다. ')
});


app.get('/kiosk', function (req, res) {
    res.sendFile((__dirname + '/public/pages/kiosk.html'))
});

app.get('/map', function (req, res) {
    res.sendFile((__dirname + '/public/pages/map.html'))
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});