var socket= io();
var status=0;

document.getElementById('P1').innerHTML="Player 1 waiting";
document.getElementById('P2').innerHTML="Player 2 waiting";
document.getElementById('Ref').innerHTML="Reference waiting";

socket.on('getplayers',function(msg){
    if(msg.player0!=null && msg.player1!=null && msg.ref!=null){
        status=1;
        document.getElementById('P1').innerHTML="Player 1 ready";
        document.getElementById('P2').innerHTML="Player 2 ready";
        document.getElementById('Ref').innerHTML="Reference ready";
    }
    else{
        status=0;
        if(msg.player0==null){
            document.getElementById('P1').innerHTML="Player 1 waiting";
        }
        if(msg.player1==null){
            document.getElementById('P2').innerHTML="Player 2 waiting";
        }
        if(msg.ref==null){
            document.getElementById('Ref').innerHTML="Reference waiting";
        }
    }
    console.log(status)
})

function startGame(){
    if(status==1){
        window.location='http://localhost:3000/game';
    }
}