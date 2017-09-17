/**
 * Created by user on 2017-08-23.
 */
'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tcp = require('./tcp');
const dialog = require('dialog');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/public'));
tcp.getConnection();

app.get('/', function (req, res) {
    res.sendfile((__dirname + '/public/pages/login.html'));
});

app.get('/monitoring', function (req, res) {
    res.sendFile((__dirname + '/public/pages/admin.html'));
});

app.post('/login', async (req, res) => {
    let login = {code: 'login', username: req.body.username, password: req.body.password};
    if (await tcp.send(login) === 'true')
        res.redirect('/monitoring');
    else {
        dialog.info('입력하신 정보가 잘못 되었습니다. \n로그인을 다시 시도해주십시오.', 'login_fail', function (exitcode) {
        });
        res.redirect('/'); //
    }
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

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});