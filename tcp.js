'use strict';
const net = require('net');
let server;

exports.getConnection = () => {
    server = net.connect({port: 5001, host: '203.230.100.177'}, function () {
        console.log('Connected ');
        console.log('   local = %s:%s', this.localAddress, this.localPort);
        console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
        this.setEncoding('utf8');
        register(server);
    })
};

function register() {
    let serviceRegister = {code: 'register', service: 'service'};
    server.write(JSON.stringify(serviceRegister));
}

exports.send = async (msg) => {
    await writeData(msg);
    return await receive();
};

const writeData = (msg) => {
    console.log('Data send');
    server.write(JSON.stringify(msg));
};

const receive = () => {
    console.log('Data receive');
    return new Promise(resolve => {
        server.on('data', function (data) {
            let re = /\0/g;
            let str = data.toString().replace(re, '');
            let msg = JSON.parse(str);
            if (msg.status !== undefined) {
                resolve(msg.status);
            }
        });
    })
};


