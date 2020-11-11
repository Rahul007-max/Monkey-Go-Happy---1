// all parts of game or main branch of game the STORAGE space of game

var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

var score,survivaltime

var ground;

var restart,restartImage;

var gameOver,gameOverImage;


//there u can upload png(portable network graphics)with sprite

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  restartImage = loadImage("restart.png");
  
  gameOverImage = loadImage("gameover.png");
 
}


// setup of the game
function setup() {
  
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  restart = createSprite(300,225,20,20);
  restart.addImage("button",restartImage);
  restart.visible = false;
  restart.scale = 0.8;
  
  gameOver = createSprite(300,135,20,20);
  gameOver.addImage("over",gameOverImage);
  gameOver.visible = false;
  
  
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivaltime = 0;
}

//u can do anything in this draw function
function draw() {
  
  //background of the game blue
  background("blue");
  
  
  //score text
  fill("")
  textSize(24)
  text("score : " + score,500,50);
  
  //survival text
  textSize(24)
  text("Survival Time : "  + survivaltime,250,50);
  
  //gamestate take play
  if(gameState === PLAY){
  
    survivaltime = survivaltime +      Math.round(getFrameRate()/60);

   // challenge begin players
   ground.velocityX = -(4 + 3* survivaltime/100)
  
  // move the ground
  if(ground.x < 150){
    
    ground.x = ground.width/2;
    
  }
  
  // monkey was jumping great!!!!
  if(keyDown("space") && monkey.y > 310){
    
    
    monkey.velocityY = -12;
    
    
  }
  
     //give downward velocity to monkey bcoz he go up
     monkey.velocityY = monkey.velocityY + 0.4;
  
  
     console.log(monkey.y);
    
    // if banana group touch the monkey then banana will destroy and score will increase with+1                                                      
    
  if(bananaGroup.isTouching(monkey)){
    
     bananaGroup.destroyEach();
     score = score+1
    
    
  }  
  
  // if obstacle touch monkey then gamestate change will end
    
  if(obstacleGroup.isTouching(monkey)){
    
     gameState = END;
    
    
  }
    
      
    food();
    obstacles();
  
    // this is gameState === end
  } else if(gameState === END){
    
    restart.visible = true;
    gameOver.visible = true;
     
    monkey.velocityX = 0;
    ground.velocityX = 0;
     
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
     
    if(mousePressedOver(restart)){
      
       reset();
       
      
    } 
     

    
  }
  
     monkey.collide(ground);
  

    drawSprites();
}

//my reset function
function reset(){
  
  gameState = PLAY;
  
  gameOver.visible = false;
  restart .visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  score = 0;
  survivaltime = 0;
    
  
}


//I make food user defined function for banana
function food() {
  
  if(frameCount % 80 === 0){
    
     banana = createSprite(600,300,20,20);
     banana.addAnimation("vegetable",bananaImage);
     banana.velocityX = -5;
     banana.scale = 0.1;
     
     banana.y = Math.round(random(120,200));
    
     banana.lifetime = 300;
    
     bananaGroup.add(banana)
    
    
  }
  
  
}

//obstacles user defined function for obstacle
function obstacles() {
  
  if(frameCount % 300 === 0){
    
    obstacle = createSprite(600,325,20,20);
    obstacle.addAnimation("stone",obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    
    obstacleGroup.add(obstacle);
    
  }


}


