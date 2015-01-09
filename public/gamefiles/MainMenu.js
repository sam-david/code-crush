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
    this.levelOneButton = this.game.add.sprite(230,530, 'redButton');
    this.levelTwoButton = this.game.add.sprite(500,530, 'redButton');
    this.levelThreeButton = this.game.add.sprite(230,630, 'yellowButton');
    this.levelFourButton = this.game.add.sprite(500,630, 'yellowButton');
    this.levelFiveButton = this.game.add.sprite(365,730, 'redButton');
    this.levelOneText = this.game.add.text(275, 550, "Level 1", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });
    this.levelTwoText = this.game.add.text(545, 550, "Level 2", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelThreeText = this.game.add.text(275, 650, "Level 3", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelFourText = this.game.add.text(545, 650, "Level 4", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelFiveText = this.game.add.text(410, 750, "Level 5", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    // tweens
    this.codeFalllogo.angle = -6
    this.codeFallTween = this.game.add.tween(this.codeFalllogo);
    this.codeFallTween.to({x: 220, y: 40}, 500);
    this.codeFallTween.start();

    this.rotateTween = this.game.add.tween(this.codeFalllogo);
    this.rotateTween.to({angle: 0}, 500);
    this.rotateTween.start();

    this.codeCrushTween = this.game.add.tween(this.codeCrushlogo);
    this.codeCrushTween.to({ x: 840, y: 530}, 500);
    this.codeCrushTween.start();

    this.buttonOneTween = this.game.add.tween(this.levelOneButton);
    this.textOneTween = this.game.add.tween(this.levelOneText);
    this.buttonTwoTween = this.game.add.tween(this.levelTwoButton);
    this.textTwoTween = this.game.add.tween(this.levelTwoText);
    this.buttonThreeTween = this.game.add.tween(this.levelThreeButton);
    this.textThreeTween = this.game.add.tween(this.levelThreeText);
    this.buttonFourTween = this.game.add.tween(this.levelFourButton);
    this.textFourTween = this.game.add.tween(this.levelFourText);
    this.buttonFiveTween = this.game.add.tween(this.levelFiveButton);
    this.textFiveTween = this.game.add.tween(this.levelFiveText);
    this.buttonOneTween.to({x: 230, y: 230}, 500).start();
    this.buttonTwoTween.to({x: 500, y: 230}, 500).start();
    this.buttonThreeTween.to({x: 230, y: 330}, 500).start();
    this.buttonFourTween.to({x: 500, y: 330}, 500).start();
    this.buttonFiveTween.to({x: 365, y: 430}, 500).start();
    this.textOneTween.to({x: 275, y: 250}, 500).start();
    this.textTwoTween.to({x: 545, y: 250}, 500).start();
    this.textThreeTween.to({x: 275, y: 350}, 500).start();
    this.textFourTween.to({x: 545, y: 350}, 500).start();
    this.textFiveTween.to({x: 410, y: 450}, 500).start();

    that = this;
    this.levelOneButton.inputEnabled = true;
    this.levelTwoButton.inputEnabled = true;
    this.levelThreeButton.inputEnabled = true;
    this.levelFourButton.inputEnabled = true;
    this.levelFiveButton.inputEnabled = true;
    this.levelOneButton.events.onInputDown.add(this.levelStart, {level: 1});
    this.levelTwoButton.events.onInputDown.add(this.levelStart, {level: 2});
    this.levelThreeButton.events.onInputDown.add(this.levelStart, {level: 3});
    this.levelFourButton.events.onInputDown.add(this.levelStart, {level: 4});
    this.levelFiveButton.events.onInputDown.add(this.levelStart, {level: 5});
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
