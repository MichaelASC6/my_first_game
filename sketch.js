let myPosX = 25;
let myPosY = 475;
let mySpeed = 8;

let posXRay = 100;

let myWidth =  50;
let myHeigth = 50;

let rayArray = [];
let ray, rayRight, rayLeft, rayDown, rayUp;

let enemyarray = [], enemypositionX, enemypositionY, enemywidth, enemyheight ,square, left, right, up, down, enemyleft, enemyright, enemyup, enemydown;
let damage = 0;
let squarearray = [];
let points = 0;
let health = 20;
let tieFighter, hanSolo, theBackground;

function setup() {
    createCanvas(1200, 500);
    background(0);
    textSize(15);
    noStroke();
    rectMode(CENTER); 
    imageMode(CENTER);
    hanSolo = loadImage("hanSolo.png");
    tieFighter = loadImage("tieFighter.png");
    theBackground = loadImage("background.jpg");
}

function draw() {
    
    background(0);

    image(theBackground, 600, 250, 1200, 500)
    fill (0, 0, 255);
    image(hanSolo, myPosX, myPosY, 125, 125);// player rectangle 
    
    if (keyIsDown(LEFT_ARROW)) {
        myPosX -= mySpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        myPosX += mySpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        myPosY -= mySpeed;
    }

    if (keyIsDown(DOWN_ARROW)) {
        myPosY += mySpeed;
    }
    //restriction of player within the canvas
    if (myPosX <= 25) {
        myPosX = 25;
    }

    if (myPosX >= 1175) {
        myPosX = 1175;
    } 
    if (myPosY <= 25) {
        myPosY = 25;
    }
    if (myPosY >= 475) {
        myPosY = 475;
    } 
   for (let i = 0; i < enemyarray.length; i++) {

    fill(255, 0, 0);
    image(tieFighter, enemyarray[i].x, enemyarray[i].y, enemyarray[i].width, enemyarray[i].height);
    // make it move forward
    enemyarray[i].x -= 5;
    enemyarray[i].y += 0;                                           
    
    // enemy hit box
    enemyleft = enemyarray[i].x - 25;
    enemyright = enemyarray[i].x + 25;
    enemyup = enemyarray[i].y - 25;
    enemydown = enemyarray[i].y + 25;

    if (points >= 10) {

        enemyarray[i].x -= 7;
        
    }

    if (points >= 20) {

        enemyarray[i].x -= 14;
    }

    if(enemyarray[i].x <= 25) {
        enemyarray.splice(i, 1);
        health -= 1;
    }

    for (let e = 0; e < rayArray.length; e++) {

        rayRight =  rayArray[e].x + 20;
        rayLeft =  rayArray[e].x -20 ;
        rayTop = rayArray[e].y - 2;
        rayBottom = rayArray[e].y + 2;

        console.log(enemyarray.length, rayArray.length);
        

        if (rayRight < enemyleft || rayTop > enemydown || rayBottom < enemyup || rayLeft > enemyright) {  // collision between the ray and the enemy
            // do nothing
            console.log("collision!");
        }

        else {

            console.log("Collision has occur");
            enemyarray.splice(i, 1);
            rayArray.splice(e, 1);
            points ++;
        }
    }
}

for (let f = 0; f < rayArray.length; f++) {
    console.log(rayArray.length);
    fill(rayArray[f].r, rayArray[f].g, rayArray[f].b);
    rect(rayArray[f].x, rayArray[f].y, rayArray[f].width, rayArray[f].height); // creates the ray

    rayArray[f].x += 20;

    if(rayArray[f].x >= 1180) {
        
        rayArray.splice(f, 1);
    }
}

fill(255, 255, 255);
text("Points: " + points, 10, 25);

fill(255, 255, 255);
text("HEALTH: "+ health, 1100, 28);

if (health == 0) {
    background(0);
    fill(random(255), random(255), random(255));
    text("GAME OVER, You achieved" + points, "points", 500, 250);
    noLoop();
}

}

function keyTyped() {
    if (key == ' ') {
        ray = new Ray(myPosX + 50, myPosY, 0, 0, 255, 40, 4);
        rayArray.push(ray);
        console.log("created ray!");
    }
}

function keyPressed () {

    if (keyCode == ENTER) {
        square = new Square(random(1125, 1175), random(25, 475),75,75);
        enemyarray.push(square);
    }
}
 
 class Square {
     constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height  = height;
    }
 }
 
 class Ray { 
     constructor(x, y, r, g, b, width, height) {
         // assign properties to the object
         this.x = x;
         this.y = y;
         this.r = r;
         this.g = g;
         this.b = b;
         this.width = width;
         this.height = height;
         }
 }