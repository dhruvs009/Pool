var socket=io();
var toemit=null;
window.addEventListener('deviceorientation',function(event){
    socket.emit('sendref',{id: socket.id, orientation: event.alpha});
})

function placed(){
    socket.emit('freeball',null);
}

function change(val){
    //console.log(status);
    socket.emit('freeball',val);
}