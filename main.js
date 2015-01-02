var game = new Phaser.Game(768,600, Phaser.AUTO, 'gameDiv');

var mainState = {
	preload: function() {
		this.load.image('space', 'assets/space.png');
		this.load.image('comet', 'assets/rock.png');
		this.load.image('city', 'assets/code-city.png');
		this.load.image('fire1', 'assets/fire1.png');
    this.load.image('fire2', 'assets/fire2.png');
    this.load.image('fire3', 'assets/fire3.png');
    this.load.image('smoke', 'assets/smoke-puff.png');
		this.load.image('playerParticle', 'assets/player-particle.png');
		this.load.spritesheet('explosion', 'assets/explode-animation.png', 128, 128);

	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//add background and city
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

		gameTitle = game.add.text(300, 10, "Code City", { font: '34px Arial', fill: '#fff' });

		// city = this.game.add.sprite(0,512, 'city');
		this.city = this.game.add.sprite(0,512, 'city');

		//enable city physics for collision
		// this.game.physics.arcade.enable(this.city);
		this.game.physics.enable(this.city, Phaser.Physics.ARCADE);
		this.city.body.immovable = true;
		// this.city.enableBody = true;

		// add single comet to test

		this.comet = this.game.add.sprite(this.game.world.randomX, 0, 'comet');
		this.game.physics.enable(this.comet, Phaser.Physics.ARCADE);
		this.comet.body.velocity.y = 500;

		emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400)
		emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
		this.comet.addChild(emitter);
		// explosions = game.add.group();
  //   explosions.createMultiple(30, 'explosion');
		// this.comet.animations.add('explosion');
		
		this.comets = this.game.add.group();
		this.comets.physicsBodyType = Phaser.Physics.ARCADE;
		this.comets.enableBody = true;

		this.oldestIndex = 1;
		this.timer = game.time.events.loop(2800, this.dropComet, this);
	},
	update: function() {
		// this.game.physics.arcade.collide(this.city, this.comet);
		this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);
		
	},
	dropComet: function() {
		



		//enable physics of comets
		var comet;
		this.comet = this.comets.create(this.game.world.randomX, 0, 'comet');
		this.comet.enableBody = true;
		// this.game.physics.enable(this.comet, Phaser.Physics.ARCADE);

		// game.physics.arcade.enable(this.comet); 
		this.comet.scale.setTo(.5);

		// this.comet.animations.add('explosion');

		//set downward velocity
		this.comet.body.velocity.y = 200;
		this.comet.body.velocity.x = this.game.rnd.integerInRange(-50, 50)
		// comet.body.immovable = true;
		this.comet.body.collideWorldBounds = true;
	},
	hitCity: function() {
		console.log('collide');
		this.comet.kill();
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