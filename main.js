var game = new Phaser.Game(768, 600, Phaser.AUTO, 'gameDiv');

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
		this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

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

		this.comets = this.game.add.group();
		this.comets.physicsBodyType = Phaser.Physics.ARCADE;
		this.comets.enableBody = true;

		this.oldestIndex = 1;
		this.timer = game.time.events.loop(2800, this.dropComet, this);
	},
	update: function() {
		this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);
	},
	dropComet: function() {
		// makes an emitter for the comets
		this.emitter = game.add.emitter(0, -50, 100);
		this.emitter.makeParticles('fire1');
		this.emitter.gravity = 0;

		//enable physics of comets
		var comet;
		this.comet = this.comets.create(this.game.world.randomX, 0, 'comet');
		this.comet.enableBody = true;
		this.comet.addChild(this.emitter);
		// this.game.physics.enable(this.comet, Phaser.Physics.ARCADE);

		// game.physics.arcade.enable(this.comet);
		this.comet.scale.setTo(.5);

		// this.comet.animations.add('explosion');

		//set downward velocity
		this.comet.body.velocity.y = 100;
		// this.comet.body.velocity.x = this.game.rnd.integerInRange(-50, 50)
		// comet.body.immovable = true;
		this.comet.body.collideWorldBounds = true;

		// this.emitter.x = this.comet.x;
		// this.emitter.y = this.comet.y;
		this.emitter.start(false, 100000000, 10, 5);
	},
	hitCity: function() {
		console.log('collide' + this.comets);
		this.comets.getAt(0).destroy();
		console.log(this.comets.length);

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
