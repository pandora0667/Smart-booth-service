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

    if (req.body.email === undefined) {
        let login = {code: 'login', username: req.body.username, password: req.body.password};
        let test = await tcp.send(login);
        console.log('return :' + test);

        res.redirect('/monitoring');
    } else {
        let sign = {code: 'sign', username: req.body.username, password: req.body.password, email: req.body.email, tel: req.body.tel};
        // await tcp.socket(sign);
    }
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