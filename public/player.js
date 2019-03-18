var temp;
var socket=io();
window.addEventListener('deviceorientation',function(event) {
    document.getElementById("reading").innerHTML=event.alpha+" "+socket.id;
    socket.emit('sendplayers',{id:socket.id , orientation : event.alpha});
})