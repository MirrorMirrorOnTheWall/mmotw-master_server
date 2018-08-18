var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var dbConfig = require('./config');
// how do these blocks of code run? in sequential order or no. probably no
// JS is so weird
// How is this modularized - this is all spaghetti code

function getNumProvisionedDevices(){
    let numProvisionedDevices = 4;
    console.log('->>> Searching DB for all provisioned Devices...');
    console.log('<<<- Found '+numProvisionedDevices+' in DB')

    return numProvisionedDevices;
}

function addDeviceToDb(deviceType, numProvisionedDevices) {
    console.log('->>> Adding Device to DB...');
    console.log('     Device Type: '+deviceType)
    console.log('     Device ID: '+(numProvisionedDevices+1))
    console.log('<<<- Device Successfuly Added to DB...')
    return true;
}

function provisionNewDevice(deviceType) {
    console.log('->>> Provisioning a new '+deviceType+' device...');
    let numProvisionedDevices = getNumProvisionedDevices();
    if (addDeviceToDb(deviceType, numProvisionedDevices)) {
        console.log('<<<- Successfully Provisioned New Device...');
        return true;
    } else {
        console.log('<<<- Error: New Device Was Not Provisioned...');
        return false;
    }
}

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

// TODO: Find a way to abstract this code out to make it easier to interface with
//       Im not sure how to structure this type of procedure. look into Socket.IO ex.s

// Here we have some kind of socket routine seems to run indefinetly
// This handles all incoming socket connectections
io.on('connection', function(client) {
    // Logs and sends acknowledgement back to client
    console.log('->>> Client connected...');
    client.emit('connected');

    client.on('join', function(data) {
        console.log(data);
    });

    // When the client sends a 'provision_request' event, do some stuff
    // and send some kind of acknowledgement back
    client.on('provisionRequest', function(data) {
        let provisionRequest = JSON.parse(data)
        if (provisionNewDevice(provisionRequest.deviceType)) {
            client.emit('provisionResponse', 'Device Successfuly Provisioned');
        } else {
            client.emit('provisionResponse', 'Device Was Not Provisoined');
        };
    });

    client.on('deviceOnboardingRequest', function(data) {
        return
    })

    client.on('disconnected', function(client) {
        console.log('<<<- Client disconnected...');
    });
});

server.listen(4200);
