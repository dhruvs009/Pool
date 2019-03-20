var temp;
var socket=io();
var data={id: null, orientation: null, accx: null, accy: null, accz: null}

window.addEventListener('devicemotion', function(event){
    document.getElementById("acc").innerHTML=event.acceleration.x+" "+event.acceleration.y+" "+event.acceleration.z;
    data.id=socket.id;
    data.orientation=data.orientation;
    data.accx=event.acceleration.x;
    data.accy=event.acceleration.y;
    data.accz=event.acceleration.z;
    socket.emit('sendplayers',data);
})
window.addEventListener('deviceorientation',function(event) {
    document.getElementById("orientation").innerHTML=event.alpha+" "+socket.id;
    data.id=socket.id;
    data.orientation=event.alpha;
    data.accx=data.accx;
    data.accy=data.accy;
    data.accz=data.accz;
    socket.emit('sendplayers',data);    
})
