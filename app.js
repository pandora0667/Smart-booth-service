/**
 * Created by user on 2017-08-23.
 */
const express = require('express');
const app = express();
const vidStreamer = require('vid-streamer'); //비디오 스트리밍
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendfile('/public/pages/login.html');
});

app.get('/monitoring', function (req, res) {
    res.sendFile((__dirname + '/public/pages/admin.html'));
});

let user2 = {
    username: '',
    password: '',
    email: '',
    tel: ''
};

app.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if(user2.username === user.username && user2.password === user.password) {
       res.redirect('/monitoring');
    } else {
        res.send('Who are you? <a href ="/">login</a>');
    }
    console.log(username + ", " + password);
});


app.post('/register', function (req, res) {
    let user2 = {
        username: '',
        password: '',
        email: '',
        tel: ''
    };

    user2.username = req.body.username;
    user2.password = req.body.password;
    user2.email = req.body.email;
    user2.tel = req.body.tel;

    console.log(user2.username + "," + user2.password + "," + user2.email + "," + user2.tel )
    res.redirect('/login');
});

// app.get('/kiosk', function (req, res) {
//     res.sendFile((__dirname + '/public/pages/kiosk.html'))
// });

app.get('/map', function (req, res) {
    res.sendFile((__dirname + '/public/pages/map.html'))
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});