var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkey_collided
var jungle, invisibleGround, jungleImage;
var vines, vineImage;
var trap,trap1,trap2,trap3;
var score;
var newImage;


function preload(){
  monkey_running = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png","p9.png");
monkey_collided = loadAnimation("p7.png")
  jungleImage = loadImage("jungle.png");
  

  trap1 = loadImage("t1.png");
  trap2 = loadImage("t2.png");
  trap3 = loadImage("t3.png");

  vineImage = loadImage("vine.png");
}

function setup() {
  createCanvas(1150, 600);

  jungle = createSprite(600,300,20,20);
  jungle.addImage("jungle",jungleImage);
  jungle.velocityX = -4;
  jungle.scale = 0.3;


  monkey = createSprite(150,490,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.7;
  
  invisibleGround = createSprite(600,600,1200,20);
  invisibleGround.visible = false;
 invisibleGround.depth = jungle.depth;
 invisibleGround.depth = invisibleGround.depth +1

 trapsGroup = new Group();

 monkey.setCollider("rectangle",0,0,monkey.width-125,monkey.height-12);
 //monkey.debug = true;
 
 //vine.setCollider("rectangle",0,0,vine.width,vine.height);
 //vine.debug = true
score = 0;
}

function spawnTraps()
{
  if(frameCount % 120 === 0) {
    var trap = createSprite(1200,570,10,40);
   
    trap.velocityX = -(6 + 3*score/100);
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: trap.addImage(trap1);
              trap.scale = 0.5
              trap.y = trap.y + 15
              break;
      case 2: trap.addImage(trap2);
              trap.scale = 0.2
              trap.y = trap.y -10
              break;
      case 3: trap.addImage(trap3);
              trap.scale = 0.2
              trap.y = trap.y -200
              break;
      default: break;
    }
    
    trap.lifetime = 120;
    trapsGroup.add(trap);



}
}

function spawnVines()
{
  if(frameCount % 160 === 0) {
    var vines = createSprite(1200,200,10,40);
    vines.velocityX = -(6 + 3*score/100);
    vines.addImage(vineImage);
    vines.lifetime = 120;
  vines.depth = jungle.depth
  vines.depth = vines.depth + 1
  monkey.depth = vines.depth
  monkey.depth  = monkey.depth + 1
}
//if(vine.isTouching(monkey)){
  //console.log("touched")
    //  }
}


function draw(){

  background(180);

   if(gameState === PLAY)
  {
    jungle.velocityX = -(4 + 1.5* score/100)
    score = score + Math.round(getFrameRate()/20);

    spawnTraps();
    spawnVines();

    if(trapsGroup.isTouching(monkey)){
      gameState = END}

    if(keyDown("space")&& monkey.y >= 520) {
    monkey.velocityY = -25;
  }

  monkey.velocityY = monkey.velocityY + 1.2
  
  if(jungle.x < -50 ){
    jungle.x = width/2;
  }


  }

  if(gameState===END)
  {
  jungle.velocityX = 0;
  monkey.velocityY = 2;
  trapsGroup.setVelocityXEach(0);
  monkey.changeAnimation("collided",monkey_collided)
  }


  monkey.collide(invisibleGround);
  //console.log(gameState);
  
  drawSprites();
}


