var game = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv');

// declaring these out here so they can be easily used across functions. This was how they did it on the official phaser site.
var explosions;
var bullets;
var emitter;
var fireTrailPool = [];

var keyIndex = {
	'0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  ' ': 32,
  ';': 186,
  ':': 186,
  '=': 187,
  ',': 188,
  '.': 190,
  '/': 191,
  '[': 219,
  ']': 221,
  '{': 219,
  '}': 221,
  "'": 222,
  "|": 220,
  "+": 187,
  "-": 189,
  '%': 53,
  '*': 56,
  '$': 52,
  '_': 189,
  '?': 191,
  "(": 57,
 	")": 48,
  'Backslash': 220
};

var levelOneLines = [
"def sqr(x)",
"return x*x",
"end",
"(rand(4) + 2).times {",
"a = rand(300)",
"def boom",
"print 'Boom!'",
"end",
"boom",
"boom",
"print",
"line(8)",
"line(5,'*')",
"line(11,'+','=')",
"def incr(n)",
"n = n + 1",
"end",
"a = 5",
"incr(a)",
"print a"
]

// new debug rectangle object
var rect = new Phaser.Rectangle( 350, 5, 300, 100 );

var mainState = {
	preload: function() {
		// load all the sprites and audio
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
    this.load.image('terminal', 'gamefiles/assets/codecrush-terminal-png.png');
		this.load.image('playerParticle', 'gamefiles/assets/player-particle.png');
		this.load.spritesheet('explosion', 'gamefiles/assets/explode-animation.png', 128, 128);
		this.load.spritesheet('explosion2', 'gamefiles/assets/explosion.png',128,128);
		this.load.audio('explosion', 'gamefiles/assets/audio/explosion1.wav');
		this.load.audio('explosion2', 'gamefiles/assets/audio/explosion2.wav');
		this.load.audio('laserAudio', 'gamefiles/assets/audio/laser3.wav');
		this.load.audio('multiUp', 'gamefiles/assets/audio/powerup2.wav');
	},
	create: function() {
		// start game physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//add background, city, and laser
		this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
		// this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'skyline');
		this.city = this.game.add.sprite(0,552, 'city');
		this.laser = this.game.add.sprite(480,545, 'laser');
		this.terminal = this.game.add.sprite(175,10, 'terminal');
		this.terminal.scale.setTo(.8);
		this.terminal.bringToTop();
		console.log(this.terminal);

		//enable city physics for collision
		this.game.physics.enable(this.city, Phaser.Physics.ARCADE);
		this.city.body.immovable = true;

		// test rectangle (kinda sucks)
		// game.debug.geom( rect, 'rgba(255,255,255,1)' ) ;

		// set game variables
		this.game.score = 0;
		this.game.perfectCounter = 0;
		this.game.multiplier = 1;
		this.game.cityHealth = 5;
		this.currentFireTrail = 0;
		stringIndex = 0;
		codeLineIndex = 0;

		// set game audio
		this.explosionSound = this.add.audio('explosion2');
		this.laserSound = this.add.audio('laserAudio');
		this.multiSound = this.add.audio('multiUp');

		// create game text objects (health, code text, and multiplier)
		codeText = game.add.text(250, 35, levelOneLines[codeLineIndex], { font: '34px Arial', fill: '#fff' });

		cityHealthText = game.add.text(810,520, "Health: 5", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});
		gameScoreText = game.add.text(10,10, "Score: 0", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});
		multiplierText = game.add.text(810,10, "Multiplier: 1x", {
			font: "24px Arial",
			fill: '#ff0044',
			align: 'center'
		});

		//Keyboard input for code...save for later
		var that = this;
		this.game.input.keyboard.onDownCallback = function(input) {

			if (stringIndex > codeText.text.length) {
				//move to next string
			}
			var currentLetter = codeText.text.charAt(stringIndex);
			if (keyIndex[currentLetter] === input.keyCode && input.keyCode != 13) {
				// codeText.text.charAt(stringIndex).fill()
				console.log('Correct!')
				codeText.addColor('#00ff00',stringIndex)
				console.log(stringIndex);
				stringIndex++
				codeText.addColor('#fff',stringIndex)

			} else if (input.keyCode === 13 && stringIndex === codeText.text.length) {
				console.log('line done');
				codeLineIndex++;
				that.destroyComet();
				// codeText.setText(levelOneLines[codeLineIndex]);
				// codeText.fill = '#fff';
				that.world.remove(codeText);
				codeText = game.add.text(250, 35, levelOneLines[codeLineIndex], { font: '34px Arial', fill: '#fff' });
				stringIndex = 0;
				// codeText.addColor('#fff',stringIndex)

			} else {
				console.log('wrong dumbass!!')
				that.game.perfectCounter = 0;
			}
		}

		// set spacebar to execute function destroyComet
		this.laserKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.laserKey = this.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
		// this.laserKey.onDown.add(this.changeBack, this);

		// add comets group and enable physics
		this.comets = this.game.add.group();
		this.comets.physicsBodyType = Phaser.Physics.ARCADE;
		this.comets.enableBody = true;

		// add explosions group and create 10 cached explosion sprites, adding animation to each
		explosions = game.add.group();
		for (var i = 0; i < 10; i++)
    {
      var explosionAnimation = explosions.create(0, 0, 'explosion', [0], false);
      explosionAnimation.anchor.setTo(0.5, 0.5);
      explosionAnimation.animations.add('explosion');
    }

    // create 10 emitters and add into Fire Trail pool array
    this.pushToFireTrailPool(10);

    // create bullets group(30), add physics, set properties
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // timer to drop comets
		this.timer = game.time.events.loop(3800, this.dropComet, this);
		// this.postScore();
	},
	update: function() {
		// if collision between comets and city, execute hitCity function, damaging the city
		this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);

		// if the city health is 0, game over
		if (this.game.cityHealth === 0) {
			gameOver = game.add.text(500, 200, "Game Over", { font: '34px Arial', fill: '#fff' });
		}

		// update game text to reflect variables, real time
		gameScoreText.setText("Score: " + this.game.score);
		cityHealthText.setText("City Health: " + this.game.cityHealth);
		multiplierText.setText("Multiplier: " + this.game.multiplier + "x");
	},
	dropComet: function() {

		// makes an emitter for the comets
		// this.emitter = game.add.emitter(0, -50, 10);
		// this.emitter.makeParticles('fire1');
		// this.emitter.gravity = -100;

		//create a comet
		var comet;
		this.comet = this.comets.create(this.game.world.randomX, 0, 'comet');
		this.comet.enableBody = true;

		// this.comet.addChild(this.emitter);

		// set comet sprite scale
		this.comet.scale.setTo(1);

		//set downward velocity
		this.comet.body.velocity.y = 50;
		// this.comet.body.velocity.x = this.game.rnd.integerInRange(-50, 50)

		// comet will not go outside world bounds
		this.comet.body.collideWorldBounds = true;

		console.log(this.comet);

		// grab fireTrail emitter from pool based on counter
		var fireTrail = fireTrailPool[this.currentFireTrail];

		//set velocity for emitter
		var px = (this.comet.body.velocity.x * -1);
		var py = (this.comet.body.velocity.y * -1);
		fireTrail.minParticleSpeed.set(px,py);
		fireTrail.maxParticleSpeed.set(px,py);
		fireTrail.emitX += 13
		fireTrail.emitY -= 5
		//start emitter
		fireTrail.start(false, 3000, 5);
		//append emitter to comet
		this.comet.addChild(fireTrail);
		//create one new emitter for the pool
		this.pushToFireTrailPool(1);
		this.currentFireTrail = Phaser.Math.wrap(this.currentFireTrail + 1, 0, fireTrailPool.length)
	},
	destroyComet: function() {
		// check if a comet exists, if so, execute comet destruction
		if (this.comets.getAt(0) != -1) {
			this.explosionSound.play();
			// take first explosion animation from group, reset the location,
			var explosionAnimation = explosions.getFirstExists(false);
	    explosionAnimation.reset(this.comets.getAt(0).body.x + 14, this.comets.getAt(0).body.y + 8);
	    explosionAnimation.play('explosion', 30, false, true);
	    this.fireBullet(this.comets.getAt(0));
			this.comets.getAt(0).destroy();
			this.game.score += (100 * this.game.multiplier);

			// Play multiplier sound if our perfect entry counter is divisible by 5 (multiplier ups every 5 perfect entries)
			this.game.perfectCounter += 1;
			if (this.game.perfectCounter % 5 === 0) {
				this.multiSound.play();
			}

			//increase multiplier every 5 perfect entries
			if (this.game.perfectCounter === 5) {
				this.game.multiplier = 2;
			} else if (this.game.perfectCounter === 10) {
				this.game.multiplier = 3;
			} else if (this.game.perfectCounter === 15) {
				this.game.multiplier = 4;
			} else if (this.game.perfectCounter === 20) {
				this.game.multiplier = 5;
			} else if (this.game.perfectCounter === 0) {
				this.game.multiplier = 1
			}
		}

	},
	postScore: function() {
		console.log('posting score');
		$.ajax({
			type: "POST",
			url: "users/54ab137f18236521163187d5/scores",
			data: this.game.score
		}).success( function(data) {
			console.log('worked' + data);
		}).fail(function() {
			console.log('failed');
		});
		// $('a').css('color','blue');
	},
	fireBullet: function(comet) {
		//play laser audio
		this.laserSound.play();

		// grab first bullet from group array, reset location to laser tip
		var bullet = bullets.getFirstExists(false);
		bullet.reset(this.laser.x + 26, this.laser.y + 20);
		// bullet velocity x and y are set based of angle between laser and comet, increase speed with multiplier to make bullet faster
    bullet.body.velocity.y = (comet.y - this.laser.y) * 5.5;
    bullet.body.velocity.x = (comet.x - this.laser.x) * 5.5;

    // Set bullet rotation based off angle between sprites, add 90 degrees
    // This took forever to figure out...using a phaser method that allows you to find angle between two sprites, then adding an additional 90 degrees
    bullet.rotation = Phaser.Math.angleBetween(this.laser.x , this.laser.y, comet.x, comet.y) + (90)*(Math.PI/180);

	},
	hitCity: function() {
		// grab first explosion sprite from group array, reset location to comet body, and play explosion animation
		var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(this.comets.getAt(0).body.x + 11, this.comets.getAt(0).body.y + 4);
    explosionAnimation.play('explosion', 30, false, true);
    // destroy the oldest comet
		this.comets.getAt(0).destroy();
		// decrease city health by 1 because of hit
		this.game.cityHealth -= 1;
		// reset perfect entry counter back to 0, thus reseting the multiplier as well
		this.game.perfectCounter = 0;
	},
	pushToFireTrailPool: function(quantity) {
		// add emitter group to
		console.log(quantity +" emitters created");
    for (var e = 0; e < quantity; e++) {
    	//emitter setup
		  emitter = game.add.emitter(0, 0, 400);
		  emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
		  emitter.gravity = 8;
    	emitter.setAlpha(1, 0, 3000);
    	emitter.setScale(0.28, 0.45, 0.28, 0.45, 3000);
		  // push to pool of fire trails
		  fireTrailPool.push(emitter);
		}
	},
};

game.state.add('main', mainState);
game.state.start('main');
