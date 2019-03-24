var bg,temp;
var socket=io();

function change(rot){
    socket.emit('placeball',rot);
}

function placed(){
    socket.emit('placeball',false);
}
