var currentLevel = 1;

var MainMenu = {
  create: function() {
    //show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

    //give it speed in x
    this.background.autoScroll(-20, 0);

    //highest score
    this.codeCrushlogo = this.game.add.sprite(1000,530, 'logo');
    this.codeFalllogo = this.game.add.sprite(180,-150, 'codeFallLogo');
    this.rubyButtonOne = this.game.add.sprite(250,800, 'rubyButton');
    this.rubyButtonTwo = this.game.add.sprite(570,800, 'rubyButton');
    this.rubyButtonThree = this.game.add.sprite(250,800, 'rubyButton');
    this.rubyButtonFour = this.game.add.sprite(570,800, 'rubyButton');
    this.rubyButtonFive = this.game.add.sprite(420,800, 'rubyButton');
    // this.jsButtonOne = this.game.add.sprite(310,260, 'jsButton');
    // this.jsButtonTwo = this.game.add.sprite(630,260, 'jsButton');
    // this.jsButtonThree = this.game.add.sprite(310,400, 'jsButton');
    // this.jsButtonFour = this.game.add.sprite(630,400, 'jsButton');
    // this.jsButtonFive = this.game.add.sprite(480,540, 'jsButton');

    this.levelOneText = this.game.add.text(250, 210, "Level 1", {
      font: "34px Montserrat",
      fill: '#FFF0A5',
      align: 'center'
    });

    this.levelTwoText = this.game.add.text(565, 210, "Level 2", {
      font: "34px Montserrat",
      fill: '#FFB03B',
      align: 'center'
    });
    this.levelThreeText = this.game.add.text(250, 350, "Level 3", {
      font: "34px Montserrat",
      fill: '#B64926',
      align: 'center'
    });
    this.levelFourText = this.game.add.text(565, 350, "Level 4", {
      font: "34px Montserrat",
      fill: '#8E2800',
      align: 'center'
    });
    this.levelFiveText = this.game.add.text(415, 490, "Level 5", {
      font: "34px Montserrat",
      fill: '#C91600',
      align: 'center'
    });

    // tweens
    this.codeFalllogo.angle = -6
    this.codeFallTween = this.game.add.tween(this.codeFalllogo);
    this.codeFallTween.to({x: 280, y: 40}, 500);
    this.codeFallTween.start();

    this.rotateTween = this.game.add.tween(this.codeFalllogo);
    this.rotateTween.to({angle: 0}, 500);
    this.rotateTween.start();

    this.codeCrushTween = this.game.add.tween(this.codeCrushlogo);
    this.codeCrushTween.to({ x: 840, y: 530}, 500);
    this.codeCrushTween.start();

    this.rubyButtonOneTween = this.game.add.tween(this.rubyButtonOne);
    this.rubyButtonTwoTween = this.game.add.tween(this.rubyButtonTwo);
    this.rubyButtonThreeTween = this.game.add.tween(this.rubyButtonThree);
    this.rubyButtonFourTween = this.game.add.tween(this.rubyButtonFour);
    this.rubyButtonFiveTween = this.game.add.tween(this.rubyButtonFive);
    this.rubyButtonOneTween.to({x: 270, y: 260}, 500).start();
    this.rubyButtonTwoTween.to({x: 590, y: 260}, 500).start();
    this.rubyButtonThreeTween.to({x: 270, y: 400}, 500).start();
    this.rubyButtonFourTween.to({x: 590, y: 400}, 500).start();
    this.rubyButtonFiveTween.to({x: 440, y: 540}, 500).start();

    that = this;
    this.rubyButtonOne.inputEnabled = true;
    this.rubyButtonTwo.inputEnabled = true;
    this.rubyButtonThree.inputEnabled = true;
    this.rubyButtonFour.inputEnabled = true;
    this.rubyButtonFive.inputEnabled = true;
    this.rubyButtonOne.events.onInputDown.add(this.levelStart, {level: 1});
    this.rubyButtonTwo.events.onInputDown.add(this.levelStart, {level: 2});
    this.rubyButtonThree.events.onInputDown.add(this.levelStart, {level: 3});
    this.rubyButtonFour.events.onInputDown.add(this.levelStart, {level: 4});
    this.rubyButtonFive.events.onInputDown.add(this.levelStart, {level: 5});
  },
  update: function() {

  },
  levelStart: function(level) {
    if (this.level === 1) {
      currentLevel = 1
      that.game.state.start('Game');
    } else if (this.level === 2) {
      currentLevel = 2
      that.game.state.start('Game');
    } else if (this.level === 3) {
      currentLevel = 3
      that.game.state.start('Game');
    } else if (this.level === 4) {
      currentLevel = 4
      that.game.state.start('Game');
    } else if (this.level === 5) {
      currentLevel = 5
      that.game.state.start('Game');
    }
  }
};
