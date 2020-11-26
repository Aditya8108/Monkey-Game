var PLAY=1;
var END=0;
var gameState=1;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,355);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(200,350,400,10)
  ground.velocityX=-4;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0);
}

function draw() {
  background("Black");
  
  console.log(Math.round(frameCount));
  
  if(ground.x>0){
      ground.x=ground.width/2;
    }
  
  if(gameState===PLAY){
    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setVelocityXEach(0);
      FoodGroup.setLifetimeEach(-1);
    }
    
    if(keyDown("Space")){
      monkey.velocityY=-12;
    }
    
    monkey.velocityY=monkey.velocityY+0.8;
    
    spawnObstacles();
    spawnFood();
    
    stroke("White");
    textSize(20);
    fill("White");
    score=Math.round(frameCount/frameRate());
    text("Survival Time: " + score,120,30);
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    
  } else if(gameState===END){
    
  }
  
  monkey.collide(ground);  
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle=createSprite(450,310,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.19;
    obstacle.velocityX=-10;
    obstacle.lifetime=50;
   
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnFood(){
  if(frameCount % 80 === 0){
    banana=createSprite(400,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-8;
    banana.lifetime=50;
    
    FoodGroup.add(banana);
  }
}