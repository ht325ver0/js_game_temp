var canvas, g;
var player, enemy;
var score;
var scene;
var frameCount;
var particles;

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
	baseLine = 0;
	acceleration = 0;
	speedy = 0;
	speedx = 0;
	
	constructor(x, y){
		super();
		this.posx = x;
		this.posy = y;
		this.baseLine = 400;
		this.acceleration = 0.5;
		var angle = Math.PI * 2 * Math.random();
		this.speed = 5 + Math.random() * 20;
		this.speedx = this.speed + Math.cos(angle);
		this.speedy = this.speed + Math.sin(angle);
		this.r = 2;
	}
	
	update(){
		this.speedx *= 0.97;
		this.speedy += this.acceleration;
		this.posx += this.speedx;
		this.posy += this.speedy;
	}
	
	draw(g){
		g.fillStyle = "rgb(225,50,50)";
		g.fillRect(this.posx - this.r, this.posy - this.r, this.r, this.r);
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
	document.onkeydown = keydown;
	setInterval("gameloop()",16);
};

function init(){
	
	player = new Sprite();
	player.posx = 250;
	player.posy = 200;
	player.r = 16;
	player.speed = 0;
	player.acceleration =0;
	player.image = new Image();
	player.image.src = "./roket.png";
	
	enemy = new Sprite();
	enemy.posx = 300;
	enemy.posy = 400;
	enemy.r = 16;
	enemy.image = new Image();
	enemy.image.src = "./star01.png";
	enemy.speed = 5;
	enemy.acceleration = 0;
	
	score = 0;
	frameCount = 0;
	scene = Scenes.GameMain;
	
	particles = [];
}

function keydown(e){
	player.speed = -20;
	player.acceleration = 1.5;
}

function gameloop(){
	update();
	draw();
}

function update(){
	frameCount++;
	player.speed = player.speed + player.acceleration;
	player.posy = player.posy + player.speed;
	if(player.posy > 400){
		player.posy = 400;
		player.speed = 0;
		player.acceleration = 0;
	}
		  
	enemy.posx -= enemy.speed;
		
	if (enemy.posx < -100){
		enemy.posx = 500;
		score += 100;
	}	
		
	var diffX = player.posx - enemy.posx;
	var diffY =  player.posy - enemy.posy 
	var distance = Math.sqrt(diffX * diffX + diffY * diffY);
		
	if (distance < player.r + enemy.r){
			
		scene = Scenes.GameOver;
		frameCount = 0;
		
		for(var i = 0; i < 300; i++){
			particles.push(new Particle(player.posx, player.posy))
		}
	}
}

function draw(){
	if(scene == Scenes.GameMain){
	g.fillStyle = "rgb(0,0,0)";
	g.fillRect(0,0,480,480);
	
	player.draw(g);
	
	enemy.draw(g);
		
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
	
	particles.forEach((p) => {
		p.draw(g);
	});
	
	}
}