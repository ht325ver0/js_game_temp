var canvas, g;
var player, enemy;
var score;
var scene;
var frameCount;
var particles;
var newEnemy;
var amo;
document.addEventListener('keydown', keydown);

class Sprite{
	image = null;
	posx = 0;
	posy = 0;
	speed = 0;
	acceleration = 0;
	r = 0;
	
	draw(g){
		g.drawImage(
			this.image,
			this.posx - this.image.width / 2,
			this.posy - this.image.height / 2
		);
	}
}

class Particle extends Sprite{
	speedy = 0;
	speedx = 0;
	
	constructor(x, y){
		super();
		this.posx = x;
		this.posy = y;
		this.size = Math.random() * 5 + 1;
		this.speed = 5 + Math.random() * 20;
		this.angle = Math.random() * Math.PI * 2;
		this.speedx = this.speed * Math.cos(this.angle);
		this.speedy = this.speed * Math.sin(this.angle);
		this.r = 2;
	}
	
	update(){
		
		this.posx += this.speedx;
		this.posy += this.speedy;
		
		if (this.size > 0.2){
			this.size -= 0.1;
			}
	}
	
	
	draw(g){
		g.fillStyle = "rgb(225,100,0)";
		g.fillRect(this.posx - this.r, this.posy - this.r, this.size, this.size);
	}
}

class Enemy extends Sprite{
	constructor(posx, posy, r, imageUrl, speed, acceleration){
		super();
		this.posx = posx;
		this.posy = posy;
		this.r = r;
		this.image = new Image();
		this.image.src = imageUrl;
		this.speed = speed;
		this.acceleration = acceleration;
	 }
	 
	update(){
		this.posy += this.speed;
	}
}

class Amo extends Sprite{
	constructor(x,y){
		super();
		this.posx = x;
		this.posy = y;
		this.r = 5;
		this.image = new Image();
		this.image.src = "amo.png";
		this.speed = 20;
	}
	
	update(){
		this.posy -= this.speed;
		
	}
	
	
}

const Scenes = {
	GameMain: "GameMain",
	GameOver: "GameOver",
};

onload = function(){
	canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	init();
	setInterval(gameloop,16);
};

function init(){
	
	player = new Sprite();
	player.posx = 250;
	player.posy = 450;
	player.r = 16;
	player.speed = 0;
	player.acceleration =0;
	player.image = new Image();
	player.image.src = "./roket.png";
	

	enemy = [];
	next = 10;
	
	score = 0;
	frameCount = 0;
	scene = Scenes.GameMain;
	
	particles = [];
	
	amo = [];
}

function keydown(e){
	if (e.key === ' '){
		
		firing(player.posx ,player.posy);
	};
	
	if(e.key === 'a'){

		player.speed = 10;
		player.posx -= player.speed;
	};
	
	if(e.key === "d"){
		player.speed = 10;
		player.posx += player.speed;
	}
}

function gameloop(){
	update();
	draw();
	
	for(let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(g);

        if(particles[i].size <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function update(){
	frameCount++;
	score++
	player.speed = player.speed + player.acceleration;
	player.posy = player.posy + player.speed;
	if(player.posy > 400){
		player.posy = 400;
		player.speed = 0;
		player.acceleration = 0;
	}
	
	if(player.posx < 10){
		player.posx = 10;
		player.speed = 0;
	}
	
	if(player.posx  > 460){
		player.posx = 460;
		player.speed = 0;
	}
		  
	if(frameCount === next){
			generateNextEnemy();
	}
	
	amo.forEach((e) => {
		
		e.update();
		
	})
	
	enemy.forEach((e) => {
		
		e.update();
			
	var diffX = player.posx - e.posx;
	var diffY =  player.posy - e.posy;
	var distance = Math.sqrt(diffX * diffX + diffY * diffY);
	
	enemy = enemy.filter((e) => e.posy >= -100);
		
	if (distance < player.r + e.r){
		
		for(var i = 0; i < 100; i++){
			particles.push(new Particle(player.posx, player.posy))
		}
			
		scene = Scenes.GameOver;
		frameCount = 0;
		
		}
	});
	
	 amo = amo.filter((a) => {
        a.update();
        return a.posy > 0;
    });
    
}

function firing(x,y){
	
	var newamo = new Amo(x,y);
	amo.push(newamo);
	 
}

function generateNextEnemy(){
      　newEnemy = new Enemy(
		400 - (Math.random() * 401),
	    0,
		16,
		"./star01.png",
		4 + 5 * Math.random(),
		0
	);
	
	enemy.push(newEnemy);
	next = Math.floor(frameCount + 30 + 80 * Math.random());
}

function draw(){
	if(scene == Scenes.GameMain){
		g.fillStyle = "rgb(0,0,0)";
		g.fillRect(0,0,480,480);
		
		player.draw(g);
		
		enemy.forEach((e) => {
            e.draw(g);
        });
        
        amo.forEach((e) => {
			e.draw(g)
		});
		
			
		g.fillStyle = "rgb(255,255,255)";
		g.font = "16pt Arial";
		var scoreLabel = "SCORE : " + score;
		var scoreLabelWidth = g.measureText(scoreLabel).width;
		g.fillText(scoreLabel, 460 - scoreLabelWidth, 40);
	}else if(scene == Scenes.GameOver){
		
		g.fillStyle = "rgb(255,255,255)";
		g.font = "48pt Arial";
		var scoreLabel = "Game Over";
		var scoreLabelWidth = g.measureText(scoreLabel).width;
		g.fillText(scoreLabel, 240 - scoreLabelWidth / 2, 240);
		

		  for(let i = 0; i < particles.length; i++) {
			    particles[i].update();
			    particles[i].draw(g);
			
			    if(particles[i].size <= 0.2) {
				      particles.splice(i, 1);
				      i--;
				    }
         }
	
	}
}
