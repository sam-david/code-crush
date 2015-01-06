CodeFall = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv');

CodeFall.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
CodeFall.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('space', 'gamefiles/assets/space.png');
    this.load.image('skyline', 'gamefiles/assets/city-dusk.png');
    this.load.image('comet', 'gamefiles/assets/rocks.png');
    this.load.image('laser','gamefiles/assets/lazgun.png');
    this.load.image('city', 'gamefiles/assets/code-city.png');
    this.load.image('fire1', 'gamefiles/assets/fire1.png');
    this.load.image('fire2', 'gamefiles/assets/fire2.png');
    this.load.image('fire3', 'gamefiles/assets/fire3.png');
    this.load.image('smoke', 'gamefiles/assets/smoke-puff.png');
    this.load.image('bullet', 'gamefiles/assets/lazer.png');
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
    this.state.start('MainMenu');
  }
};
