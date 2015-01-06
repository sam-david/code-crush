CodeFall.Game = function(){};

var explosions;
var bullets;
var emitter;
var fireTrailPool = [];

CodeFall.Game.prototype = {
  create: function() {
    // start game physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //add background, city, and laser
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);
    // this.background = game.add.tileSprite(0, 0, this.game.width, this.game.height, 'skyline');
    this.city = this.game.add.sprite(0,552, 'city');
    this.laser = this.game.add.sprite(480,545, 'laser');
    this.terminal = this.game.add.sprite(175,10, 'terminal');



    this.healthUnits = this.game.add.group();


    this.healthBar = this.game.add.sprite(725,500, 'healthBar');
    this.healthEmptyUnit1 = this.healthUnits.create(738,505, 'healthUnitWire');
    this.healthEmptyUnit2 = this.healthUnits.create(778,505, 'healthUnitWire');
    this.healthEmptyUnit3 = this.healthUnits.create(818,505, 'healthUnitWire');
    this.healthEmptyUnit4 = this.healthUnits.create(858,505, 'healthUnitWire');
    this.healthEmptyUnit5 = this.healthUnits.create(898,505, 'healthUnitWire');
    this.healthUnit1 = this.healthUnits.create(738,505, 'healthUnit');
    this.healthUnit2 = this.healthUnits.create(778,505, 'healthUnit');
    this.healthUnit3 = this.healthUnits.create(818,505, 'healthUnit');
    this.healthUnit4 = this.healthUnits.create(858,505, 'healthUnit');
    this.healthUnit5 = this.healthUnits.create(898,505, 'healthUnit');

    // this.healthUnit2 = this.game.add.sprite(738,505, 'healthUnit');
    // this.healthUnit3 = this.game.add.sprite(738,505, 'healthUnit');
    // this.healthUnit4 = this.game.add.sprite(738,505, 'healthUnit');
    // this.healthUnit5 = this.game.add.sprite(738,505, 'healthUnit');
    // this.healthBar = this.game.add.sprite(600, 500, 'healthBar');
    this.healthUnit1.scale.setTo(.4);
    this.healthUnit2.scale.setTo(.4);
    this.healthUnit3.scale.setTo(.4);
    this.healthUnit4.scale.setTo(.4);
    this.healthUnit5.scale.setTo(.4);
    this.healthEmptyUnit1.scale.setTo(.4);
    this.healthEmptyUnit2.scale.setTo(.4);
    this.healthEmptyUnit3.scale.setTo(.4);
    this.healthEmptyUnit4.scale.setTo(.4);
    this.healthEmptyUnit5.scale.setTo(.4);

    this.healthBar.scale.setTo(.4);
    this.terminal.scale.setTo(.8);

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
    codeText = this.game.add.text(250, 43, levelOneLines[codeLineIndex], { font: '30px Monospace', fill: '#fff' });
    codeText.parent.bringToTop(codeText);
    // cityHealthText = this.game.add.text(810,520, "Health: 5", {
    //   font: "24px Cousine",
    //   fill: '#ff0044',
    //   align: 'center'
    // });
    gameScoreText = this.game.add.text(10,20, "0", {
      font: "24px Cousine",
      fill: '#ff0044',
      align: 'center',
      fontWeight: 'bold'
    });
    multiplierText = this.game.add.text(810,20, "1x", {
      font: "24px Cousine",
      fill: '#ff0044',
      align: 'center',
      fontWeight: 'bold'
    });
    streakText = this.game.add.text(810,50, "Streak: ", {
      font: "24px Cousine",
      fill: '#ff0044',
      align: 'center'
    });
    //Level 1 text
    levelText = this.game.add.text(430,300, "Level 1", {
      font: "36px Cousine",
      fill: '#ff0044',
      align: 'center'
    });5

    // this.levelTimer = new Phaser.Timer(this, true);
    this.levelTimer = this.game.time.events.loop(3000, this.killLevelText, this);
    // this.levelTimer.start(3000);
    // this.levelTimer = this.game.time.events.loop(2000, levelText.kill, this);

    //Keyboard input for code
    var that = this;
    this.game.input.keyboard.onDownCallback = function(input) {
      console.log("Perfect Counter" + that.game.perfectCounter);
      console.log("Key  code:" + input.keyCode);
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
        codeText = this.game.add.text(250, 43, levelOneLines[codeLineIndex], { font: '30px Monospace', fill: '#fff' });
        codeText.parent.bringToTop(codeText);
        stringIndex = 0;
        // codeText.addColor('#fff',stringIndex)

      } else if (input.keyCode != 16) {
        console.log('wrong!');
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
    explosions = this.game.add.group();
    for (var i = 0; i < 10; i++)
    {
      var explosionAnimation = explosions.create(0, 0, 'explosion', [0], false);
      explosionAnimation.anchor.setTo(0.5, 0.5);
      explosionAnimation.scale.setTo(.7);
      explosionAnimation.animations.add('explosion');
    }

    // create 10 emitters and add into Fire Trail pool array
    this.pushToFireTrailPool(10);

    // create bullets group(30), add physics, set properties
    bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // drop one comet to start
    this.dropComet();
    // timer to drop comets
    // this.game.time.events.add(3800, this.dropComet, this);
    this.cometTimer = this.game.time.events.loop(3800, this.dropComet, this);
    // this.postScore();
  },
  update: function() {
    // if collision between comets and city, execute hitCity function, damaging the city
    this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);

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

    // update game text to reflect variables, real time
    gameScoreText.setText(this.game.score);
    // cityHealthText.setText("Health: " + this.game.cityHealth);
    multiplierText.setText(this.game.multiplier + "x");
    streakText.setText("Streak: " + this.game.perfectCounter);
  },
  killLevelText: function() {
    console.log('kill level');
    levelText.destroy();
  },
  dropComet: function() {
    console.log('dropping comet');
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
    this.terminal.bringToTop();
    codeText.parent.bringToTop(codeText);
  },
  destroyComet: function() {
    // check if a comet exists, if so, execute comet destruction
    if (this.comets.getAt(0) != -1) {
      this.explosionSound.play();
      // take first explosion animation from group, reset the location,
      var explosionAnimation = explosions.getFirstExists(false);
      explosionAnimation.reset(this.comets.getAt(0).body.x + 18, this.comets.getAt(0).body.y + 15);
      explosionAnimation.play('explosion', 30, false, true);
      this.fireBullet(this.comets.getAt(0));
      this.comets.getAt(0).destroy();
      this.game.score += (100 * this.game.multiplier);

      // Play multiplier sound if our perfect entry counter is divisible by 5 (multiplier ups every 5 perfect entries)
      this.game.perfectCounter += 1;
      if (this.game.perfectCounter % 5 === 0) {
        this.multiSound.play();
      }
    }
  },
  cityFire: function() {
    console.log("fire in the city!");
    // grab fireTrail emitter from pool based on counter
    var fireTrail = fireTrailPool[this.currentFireTrail];

    //set velocity for emitter
    var px = (this.comet.body.velocity.x * -1);
    var py = (this.comet.body.velocity.y * -1);
    fireTrail.minParticleSpeed.set(px,py);
    fireTrail.maxParticleSpeed.set(px,py);
    fireTrail.x = 400
    fireTrail.y = 400
    fireTrail.setScale(0.20, 0.45, 0.20, 0.45, 3000);
    //start emitter
    fireTrail.start(false, 3000, 5);
    //append emitter to comet
    this.comet.addChild(fireTrail);
    //create one new emitter for the pool
    this.pushToFireTrailPool(1);
    this.currentFireTrail = Phaser.Math.wrap(this.currentFireTrail + 1, 0, fireTrailPool.length)

  },
  postScore: function() {
    console.log('posting score');
    $.ajax({
      type: "POST",
      url: "users/" + user_id + "/scores",
      data: {score: this.game.score}
    }).success( function(data) {
      console.log('worked' + data);
    }).fail(function() {
      console.log('failed');
    });
  },
  fireBullet: function(comet) {
    //play laser audio
    this.laserSound.play();

    // grab first bullet from group array, reset location to laser tip
    var bullet = bullets.getFirstExists(false);
    bullet.reset(this.laser.x + 26, this.laser.y + 20);
    // bullet velocity x and y are set based of angle between laser and comet, increase speed with multiplier to make bullet faster
    bullet.body.velocity.y = (comet.y - this.laser.y) * 6;
    bullet.body.velocity.x = (comet.x - this.laser.x) * 6;

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
    //city fire for later
    // this.cityFire();
    // if the city health is 0, game over
    // if (this.game.cityHealth === 0) {
    //   this.cometTimer.destroy();
    //   gameOver = this.game.add.text(500, 200, "Game Over", { font: '34px Arial', fill: '#fff' });
    // }
    if (this.game.cityHealth === 4) {
        this.healthUnit5.kill();
      } else if (this.game.cityHealth === 3) {
        this.healthUnit4.kill();
      } else if (this.game.cityHealth === 2) {
        this.healthUnit3.kill();
      } else if (this.game.cityHealth === 1) {
        this.healthUnit2.kill();
      }
  },
  pushToFireTrailPool: function(quantity) {
    // add emitter group to
    console.log(quantity +" emitters created");
    for (var e = 0; e < quantity; e++) {
      //emitter setup
      emitter = this.game.add.emitter(0, 0, 400);
      emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
      emitter.gravity = 8;
      emitter.setAlpha(1, 0, 3000);
      emitter.setScale(0.28, 0.45, 0.28, 0.45, 3000);
      // push to pool of fire trails
      fireTrailPool.push(emitter);
    }
  },
};
