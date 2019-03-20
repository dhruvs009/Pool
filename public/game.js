var bg, cueball, cue;

var r1,r2,r3,r4,r5,r6,r7,redballs;
var y1,y2,y3,y4,y5,y6,y7,yellowballs;
var b8,allballs;

function cSprite(temp,x,y,img){
    temp=createSprite(x,y,10,10);
    temp.addImage(img);
    temp.friction=0.03;
    temp.setCollider('circle',10,10,18.5); 
}

function setup(){
    redballs=new Group();
    yellowballs=new Group();
    allballs=new Group();
    bballimg=loadImage('blackball.png')
    rballimg=loadImage('redball.png')
    yballimg=loadImage('yellowball.png')
    bg=loadImage('board.png')
    createCanvas(windowWidth, windowHeight);
    cueball=createSprite(windowWidth/3.64, windowHeight/2, 10, 10);
    cueball.addImage(loadImage('cueball.png'))
    cueball.friction=0.03;
    cueball.setCollider('circle',10,10,18.5);
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
}

function draw(){
    background(0,0,0);
    image(bg,0,0,windowWidth,windowHeight);
    drawSprites();
    allballs.bounce(allballs);
    allballs.bounce(cueball);
    cueball.bounce(allballs);
    
}