let ptouchX=0;
let ptouchY=0;


let canvas={w:0,h:0};
let fingerPos;//現在位置
let d={x:0,y:0};//加速方向
let speed=0.1; //指の速度

let size={x:200,y:200}
let correct={x:0.61,y:0.12};
let alpha=0;
let pressTime=0;
let pRatio=1;
let th=100;

let posHist={x:0,y:0};



const debug=true;
const mode = "pc";
// const mode = "phone";

let widthCM=0;



function preload() {
    img = loadImage('yubi.png');
}


function setup() { 
  if(debug){
    canvas.w=windowWidth;
    canvas.h=windowHeight;
  }else{
    canvas.w=displayWidth;
    canvas.h=displayHeight;
  }
  createCanvas(canvas.w,canvas.h);
  //初期化
  fingerPos={x:width*0.25,y:height*0.25};
  background(0);
  pRatio=window.devicePixelRatio;
  if(!pRatio){pRatio=1;}
  size={x:size.x*pRatio,y:size.y*pRatio};
  console.log(screen.width)
  th=width/10;
  console.log("th : "+th);
  
  //画面サイズ推定
var pixPer1CM = $('#meter').width();
var CMPerPix = 1 / pixPer1CM;
    widthCM = windowWidth * CMPerPix;
    console.log("pixPer1CM : "+pixPer1CM)
    console.log("widthCM : "+widthCM);
}



function draw() {
  background(0, 12);
  
  if(debug){
    fill(255,255,255);
    textSize(30);
    noStroke();
    text("w:"+width+", h"+height,0,0,200,200);
    text("X:"+mouseX+"Y:"+mouseY,0,40,400,300)
    text("devicePixelRatio : "+pRatio,0,80,400,300);
    text("画面物理サイズw : "+Math.round(widthCM*100)/100,0,120,500,300);
  }
  
  if(mouseIsPressed){
      pressTime++;  
      drawFinger(pressTime);
     
      if(dist(mouseX,mouseY,fingerPos.x+correct.x*size.x,fingerPos.y+correct.y*size.y)<th){
          drawLine(pressTime);
      }
    
  }else{
    alpha=0;
    pressTime=0;    
  }
  //image(img,0,0,width,width);
  //circle(width*0.61,width*0.12,10)
}





function drawFinger(time){
      //easing
      if(alpha<=255){alpha=255*(time/120)^4;}
      //console.log("mouseIsPressed")
    
      let distanceX = mouseX-fingerPos.x-correct.x*size.x;
      d.x=distanceX*speed*deltaTime/60;
    
      let distanceY = mouseY-fingerPos.y-correct.y*size.y;
      d.y=distanceY*speed*deltaTime/60;
    
      //速度が低すぎる場合  
      let norm = normalize(d.x,d.y);
      if(norm.z<th/5){
        console.log("norm.z:"+norm.z+" th/5:"+th/10)
        d.x=norm.x*th/10;
        d.y=norm.y*th/10;
        console.log("slow")
      }
  
      fingerPos.x+=d.x;
      fingerPos.y+=d.y;
      tint(255, alpha);
      image(img,fingerPos.x,fingerPos.y,size.x,size.y);
}

function drawLine(time){
    stroke(255*mouseX/canvas.w, 255*mouseY/canvas.h, 150);
    strokeWeight(20);
    let d=dist(mouseX,mouseY,posHist.x,posHist.y);
    if(d<th*2){line(mouseX,mouseY,posHist.x,posHist.y)}
    posHist={x:mouseX,y:mouseY};
}
//debug

// if(mode=="phone"){
// function touchStarted() {            
//   ptouchX = touches[0].x;
//   ptouchY = touches[0].y;
//   // prevent default
//   return false;
// }

// function touchMoved() {
//   ptouchX = touches[0].x;
//   ptouchY = touches[0].y;
//   // prevent default
//   return false;
// }

// function touchEnded(){
//   ptouchX = touches[0].x;
//   ptouchY = touches[0].y;
//   // prevent default
//   return false;
// }
// }

function normalize(vx,vy){
  let vz=Math.sqrt(vx^2+vy^2);
  if(vz===0){
    return {x:0,y:0,z:0};
  }
  return {x:vx/vz,y:vy/vz,z:vz};
}