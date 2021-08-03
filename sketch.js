var score = 0;
var gameState = 1;
function preload(){
  playerImg = loadImage("image-removebg-preview (5).png")
  bgImg = loadImage("bg.jpeg")
  bullet1 = loadImage("bullet1-removebg-preview.png")
  enemY = loadImage("enemy1.png")
  eneMy = loadImage("enemy2.png")
  enEmy = loadImage("enemy3.png")
}

function setup() {
createCanvas(windowWidth, windowHeight);
player = createSprite(width/2, height-100, 30,30)
player.addImage(playerImg)
player.scale = 0.5
e1 = createGroup()
e2 = createGroup()
e3 = createGroup()
b = createGroup()
}
function draw() {
  background(bgImg); 
  if (gameState === 1){
   player.velocityX = 0;
if (keyDown("left")){
 player.velocityX = -5
}
if (keyDown("right")){
player.velocityX =5
}
if (keyDown("space") && frameCount%20 === 0){
  bullet = createSprite(player.x,player.y)
  bullet.addImage(bullet1)
  bullet.velocityY = -10
  bullet.scale = 0.1
  b.add(bullet)
}
  enemies();
  e1.map(j=>{
    for (var i = 0; i<b.length; i++){
      if(b.get(i).isTouching(j)){
        j.destroy()
        b.get(i).destroy()
        score = score +1
      }
    }
  })
 
  e2.map(j=>{
for (var i = 0; i<b.length; i++){
  if(b.get(i).isTouching(j)){
    j.destroy()
    b.get(i).destroy()
    score = score +2
  }
}
})

e3.map(j=>{
for (var i = 0; i<b.length; i++){
  if(b.get(i).isTouching(j)){
    j.destroy()
    b.get(i).destroy()
    score = score +3
  }
}
})
if (player.isTouching(e1)||player.isTouching(e2)||player.isTouching(e3)){
  gameState = 0
}
  }
  drawSprites();
if (gameState === 0){
  score = 0;
  e1.setVelocityYEach(0)
  e2.setVelocityYEach(0)
  e3.setVelocityYEach(0)
  e1.setLifetimeEach(-1)
  e2.setLifetimeEach(-1)
  e3.setLifetimeEach(-1)
  b.destroyEach()
  player.velocityX = 0

  if(keyDown("r")){
    location.reload()
  }
  fill("white")
  textSize(60)
  
  strokeWeight(10)
  stroke("black")
  text("Game Over", width/2-180, height/2)
  
  textSize(25)
  text("Press R to Restart", width/2-130, height/2+40)
}

  player.setCollider("rectangle", 0,0,350,400)
  fill("white")
  textSize(20)
  stroke("black")
  strokeWeight(10)
  text("Score: "+score, 30, 50)
}

function enemies(){
  if (frameCount%50 === 0){
    var enemy = createSprite(random(100,width-100), 10)
    switch(Math.round(random(1,3))){
      case 1: enemy.addImage(enemY)
      enemy.scale = 0.5
      enemy.velocityY = 5+score/4
      enemy.setCollider("rectangle",0,0,275,250)
      e1.add(enemy)
      break
      case 2: enemy.addImage(eneMy)
      enemy.scale = 0.8
      enemy.velocityY = 10+score/4
      e2.add(enemy)
      break
      case 3: enemy.addImage(enEmy)
      enemy.scale = 0.1
      enemy.velocityY = 15+score/4
      enemy.setCollider("rectangle",0,0,1000,1000)
      e3.add(enemy)
      break
    }
    enemy.lifetime = 200
    
  }
}


 
