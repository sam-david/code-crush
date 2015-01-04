var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');
var explosions;
var bullets;

var mainState = {
	preload: function() {
		this.load.image('space', 'gamefiles/assets/space.png');
		this.load.image('skyline', 'gamefiles/assets/city-dusk.png');
		this.load.image('comet', 'gamefiles/assets/rocks.png');
		this.load.image('laser','gamefiles/assets/lazgun.png');
		this.load.image('city', 'gamefiles/assets/code-city.png');
		this.load.image('fire1', 'gamefiles/assets/fire1.png');
    this.load.image('fire2', 'gamefiles/assets/fire2.png');
    this.load.image('fire3', 'gamefiles/assets/fire3.png');
    this.load.image('smoke', 'gamefiles/assets/smoke-puff.png');
    this.load.image('bullet', 'gamefiles/assets/bullet.png');
		this.load.image('playerParticle', 'gamefiles/assets/player-particle.png');
		this.load.spritesheet('explosion', 'gamefiles/assets/explode-animation.png', 128, 128);
		this.load.audio('explosion', 'gamefiles/assets/audio/explosion.ogg');

	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//add background and city
		this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		// this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'skyline');

		this.game.score = 0;
		this.game.perfectCounter = 0;
		this.game.multiplier = 1;
		this.game.cityHealth = 5;


		codeText = game.add.text(370, 10, "var thing = 'thing'", { font: '34px Arial', fill: '#fff' });
		cityHealthText = game.add.text(840,480, "Health: 5", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});
		gameScoreText = game.add.text(10,10, "Score: 0", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});
		multiplierText = game.add.text(830,10, "Multiplier: 1x", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});

		//Keyboard input for code...save for later
		// this.game.input.keyboard.onDownCallback = function(e) {
		// 	if (e.keyCode === 32) {
		// 		// this.destroyComet;
		// 	}
		// }

		this.laserKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.laserKey.onDown.add(this.destroyComet, this);

		this.city = this.game.add.sprite(0,512, 'city');
		this.laser = this.game.add.sprite(500,505, 'laser');
		// this.laser.scale.setTo(.5);

		//enable city physics for collision
		// this.game.physics.arcade.enable(this.city);
		this.game.physics.enable(this.city, Phaser.Physics.ARCADE);
		this.city.body.immovable = true;
		// this.city.enableBody = true;

		// add single comet to test

		this.comets = this.game.add.group();
		this.comets.physicsBodyType = Phaser.Physics.ARCADE;
		this.comets.enableBody = true;

		// Our explosions group
		explosions = game.add.group();
		for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'explosion', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('explosion');
    }

    //  Our bullets group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    //test for later
		// this.explosions.createMultiple(30, 'explosion');
		// this.explosions.getAt(0).animations.add('explode');
		// this.explosions.getAt
		// console.log(this.explosions)

		// this.explosion = this.game.add.sprite(1000,4000,'explosion')
		// this.explosion.animations.add('explode');

		this.timer = game.time.events.loop(1800, this.dropComet, this);
	},
	update: function() {
		this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);
		if (this.game.cityHealth === 0) {
			gameOver = game.add.text(500, 200, "Game Over", { font: '34px Arial', fill: '#fff' });
		}
		if (this.game.perfectCounter === 5) {
			this.game.multiplier = 2;
		} else if (this.game.perfectCounter === 10) {
			this.game.multiplier = 3;
		} else if (this.game.perfectCounter === 15) {
			this.game.multiplier = 4;
		} else if (this.game.perfectCounter === 20) {
			this.game.multiplier = 5;
		}
		gameScoreText.setText("Score: " + this.game.score);
		cityHealthText.setText("City Health: " + this.game.cityHealth);
		multiplierText.setText("Multiplier: " + this.game.multiplier + "x");
	},
	dropComet: function() {
		// makes an emitter for the comets
		// this.emitter = game.add.emitter(0, -50, 10);
		// this.emitter.makeParticles('fire1');
		// this.emitter.gravity = -100;
		// this.explosion = this.game.add.sprite(1000,4000,'explosion')
		// this.explosion.animations.add('explode');
		//enable physics of comets
		var comet;
		this.comet = this.comets.create(this.game.world.randomX, 0, 'comet');
		this.comet.enableBody = true;
		// this.comet.addChild(this.emitter);
		// this.game.physics.enable(this.comet, Phaser.Physics.ARCADE);

		// game.physics.arcade.enable(this.comet);
		this.comet.scale.setTo(1);

		// this.comet.animations.add('explosion');

		//set downward velocity
		this.comet.body.velocity.y = 50;
		// this.comet.body.velocity.x = this.game.rnd.integerInRange(-50, 50)
		// comet.body.immovable = true;
		this.comet.body.collideWorldBounds = true;

		// this.emitter.start(false, 100000000, 10, 30);
	},
	destroyComet: function() {
		console.log("destroy!");

		var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(this.comets.getAt(0).body.x + 11, this.comets.getAt(0).body.y + 4);
    explosionAnimation.play('explosion', 30, false, true);
    this.fireBullet(this.comets.getAt(0));
		this.comets.getAt(0).destroy();

		this.game.score += (100 * this.game.multiplier);
		this.game.perfectCounter += 1;
	},
	fireBullet: function(comet) {
		console.log('bullet fired');
		console.log(comet);
		var bullet = bullets.getFirstExists(false);
		bullet.reset(this.laser.x + 24, this.laser.y - 5);
    bullet.body.velocity.y = comet.y - this.laser.y;
    bullet.body.velocity.x = comet.x - this.laser.x;
    console.log(this);
    bullet.rotation = Phaser.Math.angleBetween(this.laser.x , this.laser.y, comet.x, comet.y);
    console.log(Phaser.Math.angleBetween(this.laser.x , this.laser.y, comet.x, comet.y));
    console.log(bullet.body.velocity);
    // bullet.body.velocity = 200;
    // bullet.rotation = (-90)*(Math.PI/180);
    // bullet.rotation = Math.atan2(this.laser.y- comet.y, this.laser.x - comet.x) * (180/Math.PI);;

	},
	hitCity: function() {
		var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(this.comets.getAt(0).body.x + 11, this.comets.getAt(0).body.y + 4);
    explosionAnimation.play('explosion', 30, false, true);
		this.comets.getAt(0).destroy();
		this.game.cityHealth -= 1;
		this.game.perfectCounter = 0;
		console.log(this.game.cityHealth);

		// console.log(oldestComet);
		// oldestComet += 1;
		// console.log(oldestComet);

		// this.comet.animations.play('explosion', 30, false, true);
		// var emitter = this.game.add.emitter(this.comets.children[this.oldestIndex - 1].x, this.comets.children[this.oldestIndex - 1].y, 100);
  //   emitter.makeParticles('playerParticle');
  //   emitter.minParticleSpeed.setTo(-100, -100);
  //   emitter.maxParticleSpeed.setTo(100, 100);
  //   emitter.gravity = 0;
  //   emitter.start(true, 500, null, 100);
  //   this.comets.children[this.oldestIndex - 1].play('kaboom', 30, false, true);
		// this.comets.children[this.oldestIndex - 1].kill();
		// this.oldestIndex++;
	},
};

game.state.add('main', mainState);
game.state.start('main');
