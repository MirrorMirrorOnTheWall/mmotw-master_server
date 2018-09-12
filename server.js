var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var config = require('./config');
// how do these blocks of code run? in sequential order or no. probably no
// what even is javascript
// How is this modularized - this is all spaghetti code ~~~~~
// Where do semi colons go? apparently you only need them after some statements??

function getNumProvisionedDevices(){
    // Return a unique device id somehow, this is basic
    // This function should only be run synchronously, what if tweo devices try
    // to provision at the same time?
    let numProvisionedDevices = '4';
    console.log('Searching DB for all provisioned Devices...');
    console.log('Found '+numProvisionedDevices+' in DB')

    return numProvisionedDevices;
}

function addDeviceToDb(deviceDetails) {
    // Do something
    console.log('Adding Device: '+JSON.stringify(deviceDetails))
}

function provisionNewDevice(deviceDetails) {

    console.log('Provisioning a new device...');
    let uniqueDeviceId  = getNumProvisionedDevices();
    try {
        deviceDetails.deviceId = uniqueDeviceId;
        addDeviceToDb(deviceDetails);
        console.log('New Device was added to the db');
        return deviceDetails
    }
    catch(e) {
        console.log('An error has occured in adding device to db: \n'+e);
        throw('BBAGH')
    }
}

// TODO: Find a way to abstract this code out to make it easier to interface with
//       Im not sure how to structure this type of procedure. look into Socket.IO ex.s

// Here we have some kind of socket routine SEEMS to run indefinetly
// This handles all incoming socket connectections
io.on('connection', function(client) {
    // Logs and sends acknowledgement back to client
    console.log('->>> Client connected...');
    client.emit('connected');


    // ClientMirror(camera) and ClientDisplay
    client.on('join', function(data) {
        console.log('Client Requesting to join: '+data);
        client.join(data);
    });

    // When the client sends a 'provision_request' event, do some stuff
    // and send some kind of acknowledgement back
    client.on('provisionRequest', function(data) {
        let deviceDetails = JSON.parse(data);
        console.log('Recieved a Request to Provision a New Device');
        try {
          newDeviceHeader = provisionNewDevice(deviceDetails);
          client.emit('provisionResponse', newDeviceHeader);
          console.log('Provisoned a New Device: '+JSON.stringify(newDeviceHeader));
        }
        catch(e) {
          console.log('Could Not Provision this device');
          console.log('Bad Device Details: '+data);
          client.emit('provisionResponse', 'Device Was Not Provisoined');
        }
    });

    client.on('onboardingRequest', function(data) {
        console.log('Device is Requesting to be onboarded')
    })

    client.on('disconnected', function(data) {
        console.log('<<<- Client disconnected...\n');
    });

    client.on('screenConnected', function(data) {
        console.log('Screen Connected!!!');
        client.emit('screenConnectedReponse', 'Hello New Device')
    });

});

server.listen(config.clientDevicePort);
