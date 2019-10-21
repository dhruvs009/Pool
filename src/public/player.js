var temp;
var socket=io();
var data={id: null, orientation: null, acc: false, x: 0, y: 0};
var player;
var currTime=new Date().getTime();
var freeCall=false;

window.addEventListener('devicemotion', function(event){
    // document.getElementById("acc").innerHTML=event.acceleration.x+" "+event.acceleration.y+" "+event.acceleration.z;
    data.id=socket.id;
    data.orientation=data.orientation;
    var t=new Date();
    if(data.acc!=false && t.getTime()-currTime>10000){
        data.acc=false;
        currTime=t.getTime();
    }
    if(data.acc==false && Math.sqrt(Math.pow(event.acceleration.x,2)+Math.pow(event.acceleration.y,2)+Math.pow(event.acceleration.z,2))>7){
        if(Math.sqrt(Math.pow(event.acceleration.x,2)+Math.pow(event.acceleration.y,2)+Math.pow(event.acceleration.z,2))>15){
            if(Math.sqrt(Math.pow(event.acceleration.x,2)+Math.pow(event.acceleration.y,2)+Math.pow(event.acceleration.z,2))>30){
                data.acc=35;
            }
            else{
                data.acc=20;
            }
        }
        else{
            data.acc=10;
        }
    }
    data.x=data.x;
    data.y=data.y;
    socket.emit('sendplayers',data);
})

window.addEventListener('deviceorientation',function(event) {
    // document.getElementById("orientation").innerHTML=event.alpha+" "+socket.id;
    data.id=socket.id;
    data.orientation=event.alpha;
    data.acc=data.acc;
    data.x=data.x;
    data.y=data.y;
    socket.emit('sendplayers',data);    
})

document.addEventListener('mousemove',function(event){
    //document.getElementById('mouse').innerHTML=event.screenX+" "+event.screenY;
    data.id=socket.id;
    data.orientation=data.orientation;
    data.acc=data.acc;
    data.x=event.screenX;
    data.y=event.screenY;
    socket.emit('sendplayers',data);
})

function setup() {
    createCanvas(windowWidth, windowHeight);
    // background(0, 0, 0);
    socket.on('getplayers',function(msg){
        if(msg.player0!=null && msg.player0.id==socket.id){
            player=1;
        }
        if(msg.player1!=null && msg.player1.id==socket.id){
            player=2;
        }
    })
}

function draw() {
    background(0,0,0);
    fill(200, 0, 0);
    rect(0, 0, width, height/2);
    fill(0, 200, 0);
    rect(0, height/2, width, height/2);
    fill(255,255,255);
    textAlign(CENTER,CENTER);
    textSize(80);
    text("P"+player,windowWidth/2,80);
    text("Touch to HOLD",windowWidth/2,windowHeight/4);
    text("Touch to MOVE",windowWidth/2,3*windowHeight/4);
}