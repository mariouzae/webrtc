'use strict';

document.querySelector('#btn_start').addEventListener('click', () => {
    console.log("gathering local devices...");
    getMediaDevices();
});

document.querySelector('#btn_call').addEventListener('click', () => {
    f_localPeerConnection();
});

const localVideo = document.querySelector('#localVideo');
var localMediaStream = null;
var localPeerConnection = null;
const server = null;

function getMediaDevices() {
    var constraints = {
        video: false,
        audio: true
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then(gotLocalMediaStream)
        .catch();
}

function gotLocalMediaStream(mediaStream) {
    localVideo.srcObject = mediaStream;
    localMediaStream = mediaStream;
    listLocalDevice(localMediaStream);
}

function listLocalDevice(mediaDevice) {
    if (mediaDevice.getTracks().length > 0) {
        mediaDevice.getTracks().forEach(element => {
            console.log("kind: ", element.kind);
            console.log("device: ", element.label);
        });
    } else {
        console.log("No device found...");
    }
}

function f_localPeerConnection() {
    localPeerConnection = new RTCPeerConnection(server);
    localPeerConnection.addTrack(localMediaStream.getTracks()[0]);
    localPeerConnection.addEventListener('onicecandidate', handleConnection);
    //localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);
}

function handleConnection()
{
    console.log("lala");
}