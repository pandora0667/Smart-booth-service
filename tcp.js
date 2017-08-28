'use strict';

const net = require('net');

exports.socket = async (send) => {
    await getConnection(send);
    return await receive();
};
let client;
const getConnection = (send) => {
    client = net.connect({port: 5001, host: '203.230.100.177'}, function () {

        console.log('Connected ');
        console.log('   local = %s:%s', this.localAddress, this.localPort);
        console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
        this.setEncoding('utf8');
        register(client);

        // sendData(client, send);
    });
};

client.on('data', function (data) {
    receive(data)
});

function receive() {
    return new Promise(resolve => {
        let re = /\0/g;
        let str = data.toString().replace(re, '');
        let msg = JSON.parse(str);
        console.log('result : ' + msg.status);
        resolve(msg.status);
    });
}


function register(socket) {
    let serviceRegister = {code: 'register', service: 'service'};
    socket.write(JSON.stringify(serviceRegister));
}


function sendData(socket, data) {
    socket.write(JSON.stringify(data));
}
