var socket= io();
socket.on('getplayers',function(msg){
    if(msg.player0!=null)
        document.getElementById("P1").innerHTML=msg.player0.id +" "+msg.player0.orientation+" "+msg.player0.accx+" "+msg.player0.accy+" "+msg.player0.accz;
    else
        document.getElementById("P1").innerHTML="No player";
    if(msg.player1!=null)
        document.getElementById("P2").innerHTML=msg.player1.id +" "+msg.player1.orientation+" "+msg.player1.accx+" "+msg.player1.accy+" "+msg.player1.accz;
    else
        document.getElementById("P2").innerHTML="No player";
    if(msg.ref!=null)
        document.getElementById("ref").innerHTML=msg.ref.id +" "+msg.ref.orientation;
    else
        document.getElementById("ref").innerHTML="No reference";
})