var explosions;
var bullets;
// var emitter;
var fireTrailPool = [];
var cometTimerInterval = 4000;
var cometSpeed = 50;
var codeFontSize;
var codeFontAdjust = 0;
var cometTimer;

var Game = {
  create: function() {
    // start game physics
    this.initializeLevelVars();
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //add background, city, and laser
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    this.background.autoScroll(-20, 0);
    this.city = this.game.add.sprite(0,552, 'city');
    this.laser = this.game.add.sprite(480,545, 'laser');
    this.terminal = this.game.add.sprite(175,-50, 'terminal');
    this.terminal.scale.setTo(.8);

    // tweens
    this.terminalTween = this.game.add.tween(this.terminal);
    this.terminalTween.to({x: 175, y: 10}, 800);
    this.terminalTween.start();

    // health unit gui
    this.createHealthUnits();

    //enable city physics for collision
    this.game.physics.enable(this.city, Phaser.Physics.ARCADE);
    this.city.body.immovable = true;

    // set game variables
    this.game.score = 0;
    this.game.perfectCounter = 0;
    this.game.multiplier = 1;
    this.game.cityHealth = 5;
    this.currentFireTrail = 0;
    this.musicPlaying = true;
    stringIndex = 0;
    codeLineIndex = 0;

    // set game audio
    this.explosionSound = this.add.audio('explosion2');
    this.laserSound = this.add.audio('laserAudio');
    this.multiSound = this.add.audio('multiUp');

    if (currentLevel === 5) {
      this.bossSound = this.add.audio('bossMusic');
      this.bossSound.play(null,null,.4,true);
    } else {
      this.levelMusic = this.add.audio('levelMusic');
      this.levelMusic.play(null,null,.4,true);

    }

    // create game text objects (health, code text, and multiplier)
    codeText = this.game.add.text(250, 43 + codeFontAdjust, levelLines[codeLineIndex], { font: codeFontSize + 'px Monospace', fill: '#fff' });
    codeText.parent.bringToTop(codeText);
    gameScoreText = this.game.add.text(30,45, "0", {
      font: "24px Cousine",
      fill: '#ff0044',
      align: 'center',
      fontWeight: 'bold'
    });
    multiplierText = this.game.add.text(845,30, "1x", {
      font: "36px Cousine",
      fill: '#ff0044',
      align: 'center',
      fontWeight: 'bold'
    });
    streakText = this.game.add.text(890,90, "1", {
      font: "36px Cousine",
      fill: '#ff0044',
      align: 'center'
    });
    //Level 1 text
    levelText = this.game.add.text(430,300, "Level " + currentLevel, {
      font: "36px Cousine",
      fill: '#ff0044',
      align: 'center'
    });

    this.levelTimer = this.game.time.events.loop(2000, this.killLevelText, this);

    //Keyboard input for code
    var that = this;
    this.game.input.keyboard.onDownCallback = function(input) {
      if (stringIndex > codeText.text.length) {
        //move to next string
      }
      var currentLetter = codeText.text.charAt(stringIndex);
      if (keyIndex[currentLetter] === input.keyCode && input.keyCode != 13) {
        codeText.addColor('#00ff00',stringIndex)
        stringIndex++
        codeText.addColor('#fff',stringIndex)
      } else if (input.keyCode === 13 && (codeLineIndex + 1) === levelLines.length) {
        this.game.score += (100 * this.game.multiplier);
        if (currentLevel != 5) {
          that.destroyComet();
        } else {
          that.shootMoth();
          that.destroyMoth();
        }
        that.world.remove(codeText);
        that.gameOver("win");
      } else if (input.keyCode === 13 && stringIndex === codeText.text.length) {
        codeLineIndex++;
        this.game.score += (100 * this.game.multiplier);
        if (currentLevel != 5) {
          that.destroyComet();
        } else {
          that.shootMoth();
        }
        that.world.remove(codeText);
        codeText = this.game.add.text(250, 43 + codeFontAdjust, levelLines[codeLineIndex], { font: codeFontSize + 'px Monospace', fill: '#fff' });
        codeText.parent.bringToTop(codeText);
        stringIndex = 0;
      } else if (input.keyCode != 16) {
        that.game.perfectCounter = 0;
      }
    }

    // set spacebar to execute function destroyComet
    this.laserKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.laserKey = this.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

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

    // final boss?
    if (currentLevel === 5) {
      this.brick = this.game.add.sprite(120,520, 'brick');
      this.brick.scale.setTo(1);
      this.brick.scale.x *= -1;

      this.dropMoth();
    } else {
      // drop one comet to start
      this.dropComet();
      // timer to drop comets
      cometTimer = this.game.time.events.loop(cometTimerInterval, this.dropComet, this);
      cometTimer.timer.resume();
    }
  },
  update: function() {
    // if collision between comets and city, execute hitCity function, damaging the city
    this.game.physics.arcade.collide(this.city, this.comets, this.hitCity, null, this);
    this.game.physics.arcade.overlap(this.city, this.megaMothra, this.mothHitCity, null, this);

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
    streakText.setText(this.game.perfectCounter);
    this.terminal.bringToTop();
    if ((codeLineIndex + 1) != levelLines.length) {
      codeText.parent.bringToTop(codeText);
    }

  },
  initializeLevelVars: function() {
    if (currentLevel === 1) {
      levelLines = levelOneLines;
      cometSpeed = 50;
      cometTimerInterval = 4000;
      codeFontSize = 26;
      codeFontAdjust = 0;
    } else if (currentLevel === 2) {
      levelLines = levelTwoLines;
      cometSpeed = 50;
      cometTimerInterval = 4000;
      codeFontSize = 24;
      codeFontAdjust = 1;
    } else if (currentLevel === 3) {
      levelLines = levelThreeLines;
      cometSpeed = 50;
      cometTimerInterval = 3900;
      codeFontSize = 24;
      codeFontAdjust = 1;
    } else if (currentLevel === 4) {
      levelLines = levelFourLines;
      cometSpeed = 50;
      cometTimerInterval = 3800;
      codeFontSize = 22;
      codeFontAdjust = 2;
    } else if (currentLevel === 5) {
      levelLines = levelFiveLines;
      cometSpeed = 50;
      cometTimerInterval = 3200;
      codeFontSize = 20;
      codeFontAdjust = 3;
    }
  },
  killLevelText: function() {
    levelText.destroy();
  },
  dropComet: function() {
    //create a comet
    var comet;
    this.comet = this.comets.create(this.game.world.randomX, 0, 'comet');
    this.comet.enableBody = true;

    // this.comet.addChild(this.emitter);

    // set comet sprite scale
    this.comet.scale.setTo(1);

    //set downward velocity
    this.comet.body.velocity.y = cometSpeed;
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
      this.explosionSound.play(null,null,.7);
      // take first explosion animation from group, reset the location,
      var explosionAnimation = explosions.getFirstExists(false);
      explosionAnimation.reset(this.comets.getAt(0).body.x + 18, this.comets.getAt(0).body.y + 15);
      explosionAnimation.play('explosion', 30, false, true);
      this.fireBullet(this.comets.getAt(0), 6);
      this.comets.getAt(0).destroy();

      // Play multiplier sound if our perfect entry counter is divisible by 5 (multiplier ups every 5 perfect entries)
      this.game.perfectCounter += 1;
      if (this.game.perfectCounter % 5 === 0) {
        this.multiSound.play(null,null,.8);
      }
    }
  },
  dropMoth: function() {
    this.megaMothra = this.game.add.sprite(0,0, 'megamothAni');
    this.game.physics.enable(this.megaMothra, Phaser.Physics.ARCADE);
    this.megaMothra.scale.setTo(.4);
    this.megaMothra.enableBody = true;
    this.megaMothra.animations.add('fly', null, 10, true);
    this.megaMothra.animations.play('fly');
    this.megaMothraXindex = this.megaMothra.x
    this.megaMothraYindex = this.megaMothra.y
    this.flyRight = true;
    this.flyMoth();
    mothTimer = this.game.time.events.loop(25500, this.flyMoth, this);
  },
  flyMoth: function() {
    if (this.flyRight === true) {
      this.megaMothraXindex += 730;
      this.megaMothraYindex += 50;
      this.mothFlyTween = this.game.add.tween(this.megaMothra);
      this.mothFlyTween.to({x: this.megaMothraXindex, y: this.megaMothraYindex}, 25000).start();
      this.flyRight = false;
    } else {
      this.megaMothraXindex -= 730;
      this.megaMothraYindex += 50;
      this.mothFlyTween = this.game.add.tween(this.megaMothra);
      this.mothFlyTween.to({x: this.megaMothraXindex, y: this.megaMothraYindex}, 25000).start();
      this.flyRight = true;
    }
  },
  shootMoth: function() {
      this.fireBullet(this.megaMothra, 15);
      if (codeLineIndex === levelLines.length) {
        this.megaMothra.destroy();
      }
      // Play multiplier sound if our perfect entry counter is divisible by 5 (multiplier ups every 5 perfect entries)
      this.game.perfectCounter += 1;
      if (this.game.perfectCounter % 5 === 0) {
        this.multiSound.play(null,null,.9);
      }
  },
  destroyMoth: function() {
    this.explosionSound.play(null,null,.8);
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(this.megaMothra.body.x + 80, this.megaMothra.body.y + 50);
    explosionAnimation.play('explosion', 30, false, true);
    this.megaMothra.destroy();
  },
  postScore: function() {
    console.log('posting score');
    $.ajax({
      type: "POST",
      url: "users/" + user_id + "/scores",
      data: {score: this.game.score, name: 'Codefall', level: currentLevel}
    }).success( function(data) {
      console.log('worked' + data);
    }).fail(function() {
      console.log('failed');
    });
  },
  fireBullet: function(sprite, speed) {
    //play laser audio
    this.laserSound.play(null,null,.7);

    // grab first bullet from group array, reset location to laser tip
    var bullet = bullets.getFirstExists(false);
    bullet.reset(this.laser.x + 26, this.laser.y + 20);
    // bullet velocity x and y are set based of angle between laser and comet, increase speed with multiplier to make bullet faster
    bullet.body.velocity.y = (sprite.y - this.laser.y) * speed;
    bullet.body.velocity.x = (sprite.x - this.laser.x) * speed;

    // Set bullet rotation based off angle between sprites, add 90 degrees
    // This took forever to figure out...using a phaser method that allows you to find angle between two sprites, then adding an additional 90 degrees
    bullet.rotation = Phaser.Math.angleBetween(this.laser.x , this.laser.y, sprite.x, sprite.y) + (90)*(Math.PI/180);

  },
  gameOver: function(outcome) {
    if (currentLevel != 5) {
      cometTimer.timer.pause();
    }
    if (user_id != undefined) {
      this.postScore();
    }
    this.retryButton = this.game.add.sprite(220,290, 'blueButton');
    this.mainMenuButton = this.game.add.sprite(545,290, 'blueButton');
    retryText = this.game.add.text(300,315, "Retry", {
      font: "24px Cousine",
      fill: 'white',
      align: 'center'
    });
    mainMenuText = this.game.add.text(600,315, "Main Menu", {
      font: "24px Cousine",
      fill: 'white',
      align: 'center'
    });
    if (outcome === "win") {
      winText = this.game.add.text(440,200, "YOU WIN!", {
        font: "24px Cousine",
        fill: 'white',
        align: 'center'
      });
    } else {
      gameOverText = this.game.add.text(440,200, "Game Over", {
        font: "24px Cousine",
        fill: 'white',
        align: 'center'
      });
    }
    this.mainMenuButton.inputEnabled = true;
    this.retryButton.inputEnabled = true;
    this.mainMenuButton.events.onInputDown.add(this.mainMenuNav, this);
    this.retryButton.events.onInputDown.add(this.restartGame, this);
  },
  mainMenuNav: function() {
    if (currentLevel != 5) {
      console.log('music paused')
      this.levelMusic.pause();
    } else if (currentLevel === 5) {
      console.log('music paused')
      this.bossSound.pause();
    }
    fireTrailPool = [];
    this.game.state.start('MainMenu');
    // this.game.switchState('MainMenu');
  },
  restartGame: function() {
    // console.log(game.start);
    fireTrailPool = [];
    this.game.state.start('Game');
  },
  hitCity: function() {
    // grab first explosion sprite from group array, reset location to comet body, and play explosion animation
    this.explosionSound.play(null,null,.8);
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
      } else if (this.game.cityHealth === 0) {
        this.healthUnit1.kill();
        this.gameOver();
      }
  },
  mothHitCity: function() {
    console.log('moth hit city');
    this.explosionSound.play(null,null,.9);
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(this.megaMothra.body.x + 80, this.megaMothra.body.y + 50);
    explosionAnimation.play('explosion', 30, false, true);
    // destroy the oldest comet
    this.megaMothra.destroy();
    // decrease city health by 1 because of hit
    this.game.cityHealth -= 1;
    this.healthUnit1.kill();
    this.gameOver();
  },
  pushToFireTrailPool: function(quantity) {
    // add emitter group to
    for (var e = 0; e < quantity; e++) {
      //emitter setup
      var emitter = this.game.add.emitter(0, 0, 400);
      emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );
      emitter.gravity = 8;
      emitter.setAlpha(1, 0, 3000);
      emitter.setScale(0.28, 0.45, 0.28, 0.45, 3000);
      // push to pool of fire trails
      fireTrailPool.push(emitter);
    }
  },
  createHealthUnits: function() {
    this.steakCard = this.game.add.sprite(790,10, 'streakCard');
    this.scoreCard = this.game.add.sprite(15,10, 'scoreCard');
    this.menuButton = this.game.add.sprite(15,88, 'menuButton');
    this.menuButton.inputEnabled = true;
    this.menuButton.events.onInputDown.add(this.mainMenuNav, this);
    mainMenuText = this.game.add.text(27,107, "Main Menu", {
      font: "24px Cousine",
      fill: 'black',
      align: 'center',
      fontWeight: 'bold'
    });
    this.muteButton = this.game.add.sprite(15,154, 'menuButton');
    this.muteButton.scale.setTo(.4);
    this.muteButton.inputEnabled = true;
    this.muteButton.events.onInputDown.add(this.toggleMusic, this);
    muteText = this.game.add.text(26,158, "Mute", {
      font: "16px Cousine",
      fill: 'black',
      align: 'center',
      fontWeight: 'bold'
    });
    this.healthUnits = this.game.add.group();
    this.healthBar = this.game.add.sprite(725,500, 'healthBar');
    this.healthBar.scale.setTo(.4);
    this.healthEmptyUnit1 = this.healthUnits.create(738,505, 'healthUnitWire');
    this.healthEmptyUnit2 = this.healthUnits.create(778,505, 'healthUnitWire');
    this.healthEmptyUnit3 = this.healthUnits.create(818,505, 'healthUnitWire');
    this.healthEmptyUnit4 = this.healthUnits.create(858,505, 'healthUnitWire');
    this.healthEmptyUnit5 = this.healthUnits.create(898,505, 'healthUnitWire');
    this.healthUnit1 = this.healthUnits.create(738,505, 'healthUnit');
    this.healthUnit1.scale.setTo(.4);
    this.healthEmptyUnit1.scale.setTo(.4);
    this.healthEmptyUnit2.scale.setTo(.4);
    this.healthEmptyUnit3.scale.setTo(.4);
    this.healthEmptyUnit4.scale.setTo(.4);
    this.healthEmptyUnit5.scale.setTo(.4);

    if (currentLevel != 5) {
      this.healthUnit2 = this.healthUnits.create(778,505, 'healthUnit');
      this.healthUnit3 = this.healthUnits.create(818,505, 'healthUnit');
      this.healthUnit4 = this.healthUnits.create(858,505, 'healthUnit');
      this.healthUnit5 = this.healthUnits.create(898,505, 'healthUnit');
      this.healthUnit2.scale.setTo(.4);
      this.healthUnit3.scale.setTo(.4);
      this.healthUnit4.scale.setTo(.4);
      this.healthUnit5.scale.setTo(.4);
    }
  },
  toggleMusic: function() {
    if (this.musicPlaying === true && currentLevel === 5) {
      console.log('music paused');
      this.bossSound.pause();
      this.musicPlaying = false;
    } else if (this.musicPlaying === false && currentLevel === 5) {
      console.log('music resume');
      this.bossSound.resume();
      this.musicPlaying = true;
    } else if (this.musicPlaying === true && currentLevel != 5) {
      console.log('music paused');
      this.levelMusic.pause();
      this.musicPlaying = false;
    } else if (this.musicPlaying === false && currentLevel != 5) {
      console.log('music resume');
      this.levelMusic.resume();
      this.musicPlaying = true;
    }
  },
  cityFire: function() {
    // feature put on hold
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
};
