let ptouchX=0;
let ptouchY=0;


let canvas={w:0,h:0};
let position;//現在位置
let d={x:0,y:0};//加速方向
let speed=0.1;
let correct={x:0.61,y:0.12};
let alpha=0;
let easeTime=0;
let pRatio=1;

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
  position={x:width*0.25,y:height*0.25};
  background(0);
  pRatio=window.devicePixelRatio;
  if(!pRatio){pRatio=1;}
  console.log(screen.width)
  
  //画面サイズ
var pixPer1CM = $('#meter').width();
var CMPerPix = 1 / pixPer1CM;
    widthCM = windowWidth * CMPerPix;
    console.log(pixPer1CM)
    console.log(widthCM);
}



function draw() {
  background(0, 12);
  
  if(debug){
    fill(255,255,255);
    textSize(30);
    text("w:"+width+", h"+height,0,0,200,200);
    text("X:"+mouseX+"Y:"+mouseY,0,40,400,300)
    text("devicePixelRatio : "+pRatio,0,80,400,300);
    text("画面物理サイズw : "+widthCM,0,120,500,300);
  }
  
  if(mouseIsPressed){
      easeTime++;
      if(alpha<=255){alpha=255*(easeTime/120)^4;}
      //console.log("mouseIsPressed")
    
      d.x = mouseX-position.x-correct.x*350*pRatio;
      d.x=d.x*speed*deltaTime/60;
    
      d.y = mouseY-position.y-correct.y*350*pRatio;
      d.y=d.y*speed*deltaTime/60;
    
      //d = normalize(d.x,d.y);
      position.x+=d.x;
      position.y+=d.y;
      tint(255, alpha);
      image(img,position.x,position.y,350*pRatio,350*pRatio);

      //console.log(alpha);
  }else{
    alpha=0;
    easeTime=0;    
  }
  //image(img,0,0,width,width);
  //circle(width*0.61,width*0.12,10)
}



function normalize(vx,vy){
  let z=Math.sqrt(vx^2+vy^2);
  if(z==0){
    return {x:0,y:0};
  }
  return {x:vx/z,y:vy/z};
}



//debug

// if(mode=="pc")
// function mouseClicked() {
//   ptouchX = mouseX;
//   ptouchY = mouseY;
//   console.log("clicked");
// }
// function mouseDragged(){
//   console.log("dragged");
//   ptouchX = mouseX;
//   ptouchY = mouseY;
// }
// function mouseReleased(){

//   console.log("released");
// }

if(mode=="phone"){
function touchStarted() {            
  ptouchX = touches[0].x;
  ptouchY = touches[0].y;
  // prevent default
  return false;
}

function touchMoved() {
  ptouchX = touches[0].x;
  ptouchY = touches[0].y;
  // prevent default
  return false;
}

function touchEnded(){
  ptouchX = touches[0].x;
  ptouchY = touches[0].y;
  // prevent default
  return false;
}
}