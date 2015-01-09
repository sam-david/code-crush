var Preload = {
  preload: function() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('skyline', 'gamefiles/assets/city-dusk.png');
    this.load.image('comet', 'gamefiles/assets/rocks.png');
    this.load.image('laser','gamefiles/assets/lazgun.png');
    this.load.image('city', 'gamefiles/assets/code-city.png');
    this.load.image('fire1', 'gamefiles/assets/fire1.png');
    this.load.image('fire2', 'gamefiles/assets/fire2.png');
    this.load.image('fire3', 'gamefiles/assets/fire3.png');
    this.load.image('smoke', 'gamefiles/assets/smoke-puff.png');
    this.load.image('bullet', 'gamefiles/assets/lazer.png');
    this.load.image('redButton', 'gamefiles/assets/button-red.png');
    this.load.image('blueButton', 'gamefiles/assets/button-blue.png');
    this.load.image('yellowButton', 'gamefiles/assets/button-yellow.png');
    this.load.image('clouds', 'gamefiles/assets/bg-tile-grey.png');
    this.load.image('terminal', 'gamefiles/assets/codecrush-terminal-png.png');
    this.load.image('playerParticle', 'gamefiles/assets/player-particle.png');
    this.load.image('healthBar', 'gamefiles/assets/codecrush-healthbar.png');
    this.load.image('healthUnit', 'gamefiles/assets/codecrush-health-unit.png');
    this.load.image('healthUnitWire', 'gamefiles/assets/codecrush-health-unit-wireframe.png')
    this.load.image('megamoth', 'gamefiles/assets/megamoth.png');
    this.load.image('brick', 'gamefiles/assets/brick-png-small.png');
    this.load.image('scoreCard', 'gamefiles/assets/scorecard.png');
    this.load.image('streakCard', 'gamefiles/assets/streak-multiplier.png');
    this.load.image('menuButton', 'gamefiles/assets/main-menu-button.png');
    this.load.spritesheet('explosion', 'gamefiles/assets/explosion-png.png', 128, 128);
    this.load.spritesheet('megamothAni', 'gamefiles/assets/megamoth-spritesheet.png', 560,420);
    this.load.audio('explosion', 'gamefiles/assets/audio/explosion1.wav');
    this.load.audio('explosion2', 'gamefiles/assets/audio/explosion2.wav');
    this.load.audio('laserAudio', 'gamefiles/assets/audio/laser3.wav');
    this.load.audio('multiUp', 'gamefiles/assets/audio/powerup2.wav');
    this.load.audio('bossMusic', 'gamefiles/assets/audio/handygirl-cut.ogg');
    this.load.audio('levelMusic', 'gamefiles/assets/audio/gold-coast-cut.ogg');
  },
  create: function() {
    this.state.start('MainMenu');
  }
};
