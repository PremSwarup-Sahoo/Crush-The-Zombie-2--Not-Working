const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint,jointLink;
var breakButton;
var zombie,zombie1,zombie2,zombie3,zombie4;

var stones = [];

function preload(){
    zombie1 = loadImage("./assets/zombie1.png");
    zombie2 = loadImage("./assets/zombie2.png");
  
    zombie3 = loadImage("./assets/zombie3.png");
    zombie4 = loadImage("./assets/zombie4.png");
  
    backgroundImage = loadImage("./assets/background.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, rgb(121,85,72), true);
  leftWall = new Base(150, height / 2 + 50, 300, 100,rgb(141,110,99), true);
  rightWall = new Base(width-165, height / 2 + 50, 300, 100, rgb(141,110,99), true);

  bridge = new Bridge(15, { x: width / 2 - 700, y: height / 2 });
  jointPoint = new Base(width - 300, height / 2 , 40, 20, 'green', true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 300, width / 2 + 300);
    var y = random(-10, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
   }

   zombie = createSprite(width / 2, height - 110);
   zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
   zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
   zombie.scale = 0.1;
   zombie.velocityX = 10;
 
   breakButton = createButton("CUT");
   breakButton.position(width -200, height / 2 - 50);
   breakButton.class("breakbutton");
   breakButton.mousePressed(handleButtonPress);

}

function draw() {
  background(backgroundImage);
  Engine.update(engine);
  
  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var i = 0; i <= 8; i++) {
    stones[i].show()
  }
 
if (zombie)

  drawSprites()

}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
