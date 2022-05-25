var skyImg, sky;

var airplaneImg, airplane;
var cloudImg, cloudsGroup, cloud;
var tcloud, tcloudsGroup, tcloud;

var gameState = "play"
var score;

function preload(){
  skyImg = loadImage("sky.png");

  airplaneImg = loadImage("airplane.png");
  cloudImg = loadImage("cloud.png");
  tcloudImg = loadImage("thundercloud.png");

  airplaneSound = loadSound("airplane sound.mp3");
}

function setup() {
    createCanvas(600, 600);
    sky = createSprite(300,300);
    sky.addImage("sky",skyImg);
    sky.scale = 1.9;
    sky.velocityX = -1;

    airplane = createSprite(95,300,20,50);
    airplane.addAnimation("airplane", airplaneImg);
    airplane.scale = 0.1;

    score = 0;

    cloudsGroup=new Group()
    tcloudsGroup=new Group()
  
}


function draw() {
    background(200);
    text("Score: "+ score, 500,50);{
      stroke("black");
      fill("dark blue");
      textSize(50);
    }
    if (keyDown("right_arrow")){
      airplane.velocityX=2
      airplane.velocityX=airplane.velocityX+0.5
    }
    if(keyDown("up_arrow")){
      airplane.y=airplane.y-3
    }
    if(keyDown("down_arrow")){
      airplane.y=airplane.y+3
    }

    //create Cloud and Tcloud Groups
    spawnclouds()
    spawntclouds()
    drawSprites ()

    if (gameState==="play"){
      if(sky.x < 220){
        sky.x = 300
       }

       airplane.debug=true;
        if(airplane.x > 495){
          airplane.x = 95
          }
       if(airplane.y < 90){
          airplane.y = 90
          }
          if(airplane.y > 545){
            airplane.y = 545
            }
           
        }

     //tcloudsGroup.collide(airplane);
     if(tcloudsGroup.isTouching(airplane)){ 
        airplane.destroy();
        gameState = "end"
        }

    //cloudsGroup.collide(airplane);
     if(cloudsGroup.isTouching(airplane)){ 
        cloudsGroup.destroyEach()
        score = score + 1;
       } 

      if(gameState==="end"){
        sky.visible=false
        cloudsGroup.destroyEach()
        tcloudsGroup.destroyEach()
        stroke("black");
        fill("black");
        textSize(30);
        text("Game Over",200,300);
        text("Press retry to play again",120,350)
        }
 
}


function spawntclouds(){
  //create function to spawn tclouds
  if(frameCount%240===0){
   var tcloud=createSprite(460,10,50,40);

    tcloud.scale=0.04
  
   tcloud.x=Math.round(random(40,390))
   tcloud.y=Math.round(random(60,570))

   tcloud.addImage(tcloudImg);
   
   tcloud.velocityX=1;
   tcloud.lifetime=800;

   tcloudsGroup.add(tcloud);
   tcloud.debug=true;
  }
}


function spawnclouds(){
  //create function to spawn clouds
  if (frameCount%240===0){
    var cloud=createSprite(200,-50,50,10);

    cloud.scale=0.04

    cloud.x=Math.round(random(40,390));
    cloud.y=Math.round(random(60,570));

    cloud.addImage(cloudImg);

    cloud.velocityX=1;
    cloud.lifetime=800;

    cloudsGroup.add(cloud);
    cloud.debug=true;

    
  }

}