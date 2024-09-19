const socket = io();

socket.on('dataUpdate', (data) => {
    document.getElementById('temperature').innerText = data.temperature;
    document.getElementById('humidity').innerText = data.humidity;
});