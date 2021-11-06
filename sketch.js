var path,boy,cash,diamonds,jwellery,sword,gameOver, deathBoyimg;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var gameState= "PLAY";

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  deathBoyimg = loadAnimation("dead man-02 (1).png")
}

function setup(){
  
  createCanvas(400,600);
// Mover fondo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear sprite de boy (niño) corriendo
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("collided",deathBoyimg)
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
boy.debug = true;
boy.setCollider("Circle",0,0,600)

}

function draw() {
 
  if(gameState=="PLAY"){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //incrementar treasureCollection por 50
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            //incrementar treasureCollection por 100
            treasureCollection=treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            //incrementar treasureCollection por 150
            treasureCollection=treasureCollection+50;
          }
    else if(swordGroup.isTouching(boy)) {
      //destruir todos los grupos
      jwelleryG.destroyEach();
      diamondsG.destroyEach();
      cashG.destroyEach();
      swordGroup.destroyEach();
      //setvelocityEach como 0 para todos los grupos
      jwelleryG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      cashG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
      //Cambiar gameState a End
      gameState ="END"

    }

  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesoros: "+ treasureCollection,150,30);
  
  }
  
  console.log(gameState);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 180;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 180;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 180;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 180;
  swordGroup.add(sword);
  }
}
