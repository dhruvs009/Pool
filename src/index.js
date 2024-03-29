var express=require('express');
const app=express();
var http= require('http').Server(app);
var io=require('socket.io')(http);
var freeCalled=false;


app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.redirect('/pc')
})

app.get('/player',(req,res)=>{
    res.sendFile(__dirname+'/player.html')
})

app.get('/pc',(req,res) => {
    res.sendFile(__dirname+'/pc.html')
})

app.get('/ref',(req,res)=> {
    res.sendFile(__dirname+'/ref.html')
})

app.get('/game',(req,res) => {
    res.sendFile(__dirname+'/game.html')
})

var players={player0: null, player1: null, ref: null};


io.on('connection',function(socket){
    function refresh(){
        io.emit('getplayers',players);
        console.log(players);
    }
    socket.on('disconnect',function(){
        if(players.player0!=null && players.player0.id==socket.id){
            players.player0=players.player1;
            players.player1=null;
        }
        if(players.player1!=null && players.player1.id==socket.id){
            players.player1=null;
        }
        if(players.ref!=null && players.ref.id==socket.id){
            players.ref=null;
        }
        refresh();
    })
    socket.on('sendref',function(msg){
        if(players.ref==null){
            players.ref=msg;
        }
        else{
            if(players.ref.id==msg.id){
                players.ref=msg;
            }  
        }
        refresh();
    })
    socket.on('sendplayers',function(msg){
        if(players.player0==null){
            players.player0=msg;
        }
        else{
            if(players.player0.id==msg.id){
                players.player0=msg;
            }   
            else{
                if(players.player1==null){
                    players.player1=msg;
                }
                else{
                    if(players.player1.id=msg.id){
                        players.player1=msg;    
                    }
                }
            }
        }
        refresh();
    })
    socket.on('freeball',function(msg){
        //console.log(msg);
        io.emit('placeball',msg);
    })
})

http.listen(process.env.PORT || 3000,() => {
    console.log('listening on *:3000')
});