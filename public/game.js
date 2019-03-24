var bg, cueball, cue;
var socket;
var r1,r2,r3,r4,r5,r6,r7,redballs;
var y1,y2,y3,y4,y5,y6,y7,yellowballs;
var b8,allballs;
var walls,topwall,topwall1,topwall2,bottomwall,bottomwall1,bottomwall2,leftwall,rightwall;
var rot=[0,0];
var balls=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
var temp=[...balls];
var control={id: 0, color:['n','n'], removed:[0,0]};
var potted=[0,0,0];
var moveDone=false;
var posFixed=[false,false,false];
var move=false;
var tempcueball; 
var placefree=null;
var placestat=false;
var count=0;

function check(){
    for(i=0; i<15; i++){
        if(balls[i]!=temp[i])
            return false;
    }
    return true;
}

function checkInHole(temp){
    if((temp.position.x<80 || temp.position.x>1365-80) && (temp.position.y<72 || temp.position.y>636-72))
        return true;
    if(temp.position.x>656 && temp.position.x<710 && (temp.position.y<60 || temp.position.y>636-60))
        return true;
    return false;
}

function changeBallStatus(){
    if(balls[0]==true && checkInHole(r1)==true){
        r1.remove();
        balls[0]=false;
    }
    if(balls[1]==true && checkInHole(r2)==true){
        r2.remove();
        balls[1]=false;
    }
    if(balls[2]==true && checkInHole(r3)==true){
        r3.remove();
        balls[2]=false;
    }
    if(balls[3]==true && checkInHole(r4)==true){
        r4.remove();
        balls[3]=false;
    }
    if(balls[4]==true && checkInHole(r5)==true){
        r5.remove();
        balls[4]=false;
    }
    if(balls[5]==true && checkInHole(r6)==true){
        r6.remove();
        balls[5]=false;
    }
    if(balls[6]==true && checkInHole(r7)==true){
        r7.remove();
        balls[6]=false;
    }
    if(balls[7]==true && checkInHole(b8)==true){
        b8.remove();
        balls[7]=false;
    }
    if(balls[8]==true && checkInHole(y1)==true){
        y1.remove();
        balls[8]=false;
    }
    if(balls[9]==true && checkInHole(y2)==true){
        y2.remove();
        balls[9]=false;
    }
    if(balls[10]==true && checkInHole(y3)==true){
        y3.remove();
        balls[10]=false;
    }
    if(balls[11]==true && checkInHole(y4)==true){
        y4.remove();
        balls[11]=false;
    }
    if(balls[12]==true && checkInHole(y5)==true){
        y5.remove();
        balls[12]=false;
    }
    if(balls[13]==true && checkInHole(y6)==true){
        y6.remove();
        balls[13]=false;
    }
    if(balls[14]==true && checkInHole(y7)==true){
        y7.remove();
        balls[14]=false;
    }
    if(balls[15]==true && checkInHole(cueball)==true){
        changeController();
        placefree=0;
        placestat=true;
        count=0;
        balls[15]=false;
        cueball.visible=false;
    }
}

function changeController(){
    if(control.id==0){
        control.id=1;
    }
    else{
        control.id=0;
    }
}

function endGame(x){
    textSize(40);
    textAlign(CENTER,CENTER);
    fill(0,0,0)
    text("Player "+x+" wins.",windowWidth/2,windowHeight/2);
    allballs.remove();
    noLoop();
}

function switchControl(){
    if(control.color[control.id]=='n'){
        if(potted[1]==0){
            if(potted[0]==potted[2] && potted[0]==0){
                changeController();
            }
            else if(potted[0]>=potted[2]){
                control.color[control.id]='r';
                control.removed[control.id]+=potted[0];
                changeController();
                control.color[control.id]='y';
                control.removed[control.id]+=potted[2];
                changeController();
            }
            else if(potted[0]<potted[2]){
                control.color[control.id]='y';
                control.removed[control.id]+=potted[2];
                changeController();
                control.color[control.id]='r';
                control.removed[control.id]+=potted[0];
                changeController();
            }
        }
        else{
            changeController();
            endGame(control.id+1);
        }
    }
    else{
        if(potted[1]==0){
            if(potted[0]==potted[2] && potted[0]==0){
                changeController();
            }
            else if(control.color[control.id]=='r'){
                control.removed[control.id]+=potted[0];
                changeController();
                control.removed[control.id]+=potted[2];
                changeController();
                if(potted[2]!=0){
                    changeController();
                    placefree=0;
                    count=0;
                    placestat=true;
                    cueball.visible=false;
                }
            }
            else if(control.color[control.id]=='y'){
                control.removed[control.id]+=potted[2];
                changeController();
                control.removed[control.id]+=potted[0];
                changeController();
                if(potted[0]!=0){
                    changeController();
                    placefree=0;
                    count=0;
                    placestat=true;
                    cueball.visible=false;
                }
            }
        }
        else{
            if(control.removed[control.id]<7){
                changeController();
            }
            endGame(control.id+1);
        }
    }
}

function hitBall(val){
    cue.attractionPoint(6,cueball.position.x-1000*Math.cos(cue.rotation*Math.PI/180),cueball.position.y-1000*Math.sin(cue.rotation*Math.PI/180));
        setTimeout(function(){
            cue.attractionPoint(20,cueball.position.x-500*Math.cos(cue.rotation*Math.PI/180),cueball.position.y-500*Math.sin(cue.rotation*Math.PI/180));            
            setTimeout(function(){
                cueball.addSpeed(val,cue.rotation);
                setTimeout(function(){
                    cue.position.x=0;
                    cue.position.y=0;
                    cue.addSpeed(-cue.getSpeed(),cue.rotation);
                    cue.rotation=0;
                    setTimeout(function(){
                        cue.position.x=cueball.position.x-500*Math.cos(cue.rotation*Math.PI/180);
                        cue.position.y=cueball.position.y-500*Math.sin(cue.rotation*Math.PI/180)
                    },10000)
                },250)
            },180)
        },1000)
}

function setup(){
    socket=io.connect();
    socket.on('getplayers',function(msg){
        if(msg.player0.y==0 || msg.player0.y>windowHeight/2){
            rot[0]=-msg.player0.orientation;
            posFixed[0]=false;
        }
        else{
            posFixed[0]=true;
        }
        if(msg.player1.y==0 || msg.player1.y>windowHeight/2){
            rot[1]=-msg.player1.orientation;
            posFixed[1]=false;
        }
        else{
            posFixed[1]=true;
        }
        if(control.id==0 && posFixed[0]==true){
            move=msg.player0.acc;
        }
        if(control.id==1 && posFixed[1]==true){
            move=msg.player1.acc;
        }
    })
    socket.on('placeball',function(msg){
        placefree=msg;
        if(placefree==null){
            placestat=false;
        }
        count=0;
    })
    potted=[0,0,0];
    redballs=new Group();
    yellowballs=new Group();
    allballs=new Group();
    topwall=new Group();
    bottomwall=new Group();
    walls=new Group();
    bballimg=loadImage('blackball.png')
    rballimg=loadImage('redball.png')
    yballimg=loadImage('yellowball.png')
    bg=loadImage('board.png')
    createCanvas(windowWidth, windowHeight);
    topwall1=createSprite(windowWidth/3.64,windowHeight/14.45,550,100);
    topwall1.setCollider('rectangle',0,0,550,2);
    topwall1.immovable=true;
    topwall1.shapeColor=255;
    topwall2=createSprite(windowWidth*(1-1/3.64),windowHeight/14.45,550,100);
    topwall2.setCollider('rectangle',0,0,550,2);
    topwall2.immovable=true;
    topwall2.shapeColor=255;
    leftwall=createSprite(windowWidth/26.25,windowHeight/2,100,windowHeight*(1-2/7.4));
    leftwall.setCollider('rectangle',0,0,12,windowHeight*(1-2/7.4));
    leftwall.immovable=true;
    leftwall.shapeColor=255;
    rightwall=createSprite(windowWidth*(1-1/26.25),windowHeight/2,100,windowHeight*(1-2/7.4));
    rightwall.setCollider('rectangle',0,0,5,windowHeight*(1-2/7.4));
    rightwall.immovable=true;
    rightwall.shapeColor=255;
    bottomwall1=createSprite(windowWidth/3.64,windowHeight*(1-1/14.45),550,100);
    bottomwall1.setCollider('rectangle',0,0,550,2);
    bottomwall1.immovable=true;
    bottomwall1.shapeColor=255;
    bottomwall2=createSprite(windowWidth*(1-1/3.64),windowHeight*(1-1/14.45),550,100);
    bottomwall2.setCollider('rectangle',0,0,550,2);
    bottomwall2.immovable=true;
    bottomwall2.shapeColor=255;
    cueball=createSprite(windowWidth/3.64, windowHeight/2, 10, 10);
    cueball.addImage(loadImage('cueball.png'))
    cueball.friction=0.03;
    cueball.setCollider('circle',10,10,18.5);
    tempcueball=createSprite(0, 0, 10, 10);
    tempcueball.addImage(loadImage('cueball.png'))
    tempcueball.friction=0.03;
    tempcueball.setCollider('circle',10,10,18.5);
    b8=createSprite(2.905*windowWidth/4,windowHeight/2,10,10);
    b8.addImage(bballimg);
    b8.friction=0.03;
    b8.setCollider('circle',10,10,18.5);
    r1=createSprite(2.905*windowWidth/4+32.5,windowHeight/2+18.5,10,10);
    r1.addImage(rballimg);
    r1.friction=0.03;
    r1.setCollider('circle',10,10,18.5);
    r2=createSprite(2.905*windowWidth/4-32.5,windowHeight/2-18.5,10,10);
    r2.addImage(rballimg);
    r2.friction=0.03;
    r2.setCollider('circle',10,10,18.5);
    r3=createSprite(2.905*windowWidth/4-65.5,windowHeight/2,10,10);
    r3.addImage(rballimg);
    r3.friction=0.03;
    r3.setCollider('circle',10,10,18.5);
    r4=createSprite(2.905*windowWidth/4+65.5,windowHeight/2,10,10);
    r4.addImage(rballimg);
    r4.friction=0.03;
    r4.setCollider('circle',10,10,18.5);
    r5=createSprite(2.905*windowWidth/4,windowHeight/2+37,10,10);
    r5.addImage(rballimg);
    r5.friction=0.03;
    r5.setCollider('circle',10,10,18.5);
    r6=createSprite(2.905*windowWidth/4+32.5,windowHeight/2-18.5-37,10,10);
    r6.addImage(rballimg);
    r6.friction=0.03;
    r6.setCollider('circle',10,10,18.5);
    r7=createSprite(2.905*windowWidth/4+65.5,windowHeight/2+37+37,10,10);
    r7.addImage(rballimg);
    r7.friction=0.03;
    r7.setCollider('circle',10,10,18.5);
    y1=createSprite(2.905*windowWidth/4-32.5,windowHeight/2+18.5,10,10);
    y1.addImage(yballimg);
    y1.friction=0.03;
    y1.setCollider('circle',10,10,18.5);
    y2=createSprite(2.905*windowWidth/4,windowHeight/2-37,10,10);
    y2.addImage(yballimg);
    y2.friction=0.03;
    y2.setCollider('circle',10,10,18.5);
    y3=createSprite(2.905*windowWidth/4+32.5,windowHeight/2-18.5,10,10);
    y3.addImage(yballimg);
    y3.friction=0.03;
    y3.setCollider('circle',10,10,18.5);
    y4=createSprite(2.905*windowWidth/4+32.5,windowHeight/2+18.5+37,10,10);
    y4.addImage(yballimg);
    y4.friction=0.03;
    y4.setCollider('circle',10,10,18.5);
    y5=createSprite(2.905*windowWidth/4+65.5,windowHeight/2-37,10,10);
    y5.addImage(yballimg);
    y5.friction=0.03;
    y5.setCollider('circle',10,10,18.5);
    y6=createSprite(2.905*windowWidth/4+65.5,windowHeight/2+37,10,10);
    y6.addImage(yballimg);
    y6.friction=0.03;
    y6.setCollider('circle',10,10,18.5);
    y7=createSprite(2.905*windowWidth/4+65.5,windowHeight/2-37-37,10,10);
    y7.addImage(yballimg);
    y7.friction=0.03;
    y7.setCollider('circle',10,10,18.5);
    cue=createSprite(windowWidth/3.64-500, windowHeight/2,2,2)
    cue.addImage(loadImage('cue.png'))
    cue.friction=0.03;
    redballs.add(r1);
    redballs.add(r2);
    redballs.add(r3);
    redballs.add(r4);
    redballs.add(r5);
    redballs.add(r6);
    redballs.add(r7);
    yellowballs.add(y1);
    yellowballs.add(y2);
    yellowballs.add(y3);
    yellowballs.add(y4);
    yellowballs.add(y5);
    yellowballs.add(y6);
    yellowballs.add(y7);
    allballs.add(r1);
    allballs.add(r2);
    allballs.add(r3);
    allballs.add(r4);
    allballs.add(r5);
    allballs.add(r6);
    allballs.add(r7);
    allballs.add(y1);
    allballs.add(y2);
    allballs.add(y3);
    allballs.add(y4);
    allballs.add(y5);
    allballs.add(y6);
    allballs.add(y7);
    allballs.add(b8);
    topwall.add(topwall1);
    topwall.add(topwall2);
    bottomwall.add(bottomwall1);
    bottomwall.add(bottomwall2);
    walls.add(topwall1);
    walls.add(topwall2);
    walls.add(bottomwall1);
    walls.add(bottomwall2);
    walls.add(leftwall);
    walls.add(rightwall);
    leftwall.visible=false;
    rightwall.visible=false;
    topwall1.visible=false;
    topwall2.visible=false;
    bottomwall1.visible=false;
    bottomwall2.visible=false;
}


function draw(){
    potted=[0,0,0];
    background(0,0,0);
    image(bg,0,0,windowWidth,windowHeight);
    if(placestat==false && posFixed[control.id]==false){
        cue.rotation=rot[control.id];
        cue.position.x=cueball.position.x-500*Math.cos(cue.rotation*Math.PI/180);
        cue.position.y=cueball.position.y-500*Math.sin(cue.rotation*Math.PI/180);
    }
    //console.log(control.id);
    if(placestat==false &&  moveDone==false && move!=false && posFixed[control.id]==true){
        hitBall(move);
        moveDone=true;
    }
    temp=[...balls];
    changeBallStatus();
    var Status=false;
    for(i=0; i<15; i++){
        if(balls[i]!=temp[i]){
            if(i<7){
                potted[0]+=1;
            }
            else if(i==7){
                potted[1]=1;
            }
            else{
                potted[2]+=1;
            }
            Status=true;
        }
    }
    if(placestat==false && move==false && (moveDone==true || Status==true)){
        switchControl();
        Status=false;
        moveDone=false;
    }
    drawSprites();
    if(placestat==true){
        if(tempcueball.visible==false){
            tempcueball.visible=true;
            tempcueball.position.y=windowHeight/2;
            tempcueball.position.x=windowWidth/2;
        }
        if(count==0){
            tempcueball.addSpeed(1,placefree);
            count+=1;
        }
    }
    else{
        if(cueball.visible==false){
            cueball.visible=true;
            cueball.position.x=tempcueball.position.x;
            cueball.position.y=tempcueball.position.y;
        }
        tempcueball.attractionPoint(100,0,0);
        tempcueball.visible=false;
    }
    allballs.bounce(allballs);
    allballs.bounce(cueball);
    cueball.bounce(allballs);
    cueball.bounce(walls);
    allballs.bounce(walls);
}