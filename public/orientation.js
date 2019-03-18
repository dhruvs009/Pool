window.addEventListener('deviceorientation',function(event) {
    document.getElementById('reading').innerHTML=event.alpha;
})

var socket=io();
socket.emit('recieve',document.getElementById('reading').innerHTML);
