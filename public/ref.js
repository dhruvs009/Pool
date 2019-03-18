var socket=io();
window.addEventListener('deviceorientation',function(event){
    document.getElementById("ref").innerHTML=socket.id+" "+event.alpha;
    socket.emit('sendref',{id: socket.id, orientation: event.alpha});
})