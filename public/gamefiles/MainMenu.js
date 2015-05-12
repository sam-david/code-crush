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
    // this.rubyLevelOneButton = this.game.add.sprite(230,530, 'rubyLevelOne');
    // this.rubyLevelTwoButton = this.game.add.sprite(500,530, 'rubyLevelTwo');
    // this.rubyLevelThreeButton = this.game.add.sprite(230,630, 'rubyLevelThree');
    // this.rubyLevelFourButton = this.game.add.sprite(500,630, 'rubyLevelFour');
    // this.rubyLevelFiveButton = this.game.add.sprite(365,730, 'rubyLevelFive');
    // this.jsLevelOneButton = this.game.add.sprite(465,730, 'jsLevelOne');
    // this.jsLevelTwoButton = this.game.add.sprite(465,730, 'jsLevelTwo');
    // this.jsLevelThreeButton = this.game.add.sprite(465,730, 'jsLevelThree');
    // this.jsLevelFourButton = this.game.add.sprite(465,730, 'jsLevelFour');
    // this.jsLevelFiveButton = this.game.add.sprite(465,730, 'jsLevelFive');
    this.rubyButtonOne = this.game.add.sprite(230,260, 'rubyButton');
    this.jsButtonOne = this.game.add.sprite(310,260, 'jsButton');
    this.rubyButtonTwo = this.game.add.sprite(550,260, 'rubyButton');
    this.jsButtonTwo = this.game.add.sprite(630,260, 'jsButton');
    this.rubyButtonThree = this.game.add.sprite(230,400, 'rubyButton');
    this.jsButtonThree = this.game.add.sprite(310,400, 'jsButton');
    this.rubyButtonFour = this.game.add.sprite(550,400, 'rubyButton');
    this.jsButtonFour = this.game.add.sprite(630,400, 'jsButton');
    this.rubyButtonFive = this.game.add.sprite(400,540, 'rubyButton');
    this.jsButtonFive = this.game.add.sprite(480,540, 'jsButton');
    // this.levelOneText = this.game.add.text(275, 550, "Level 1", {
    //   font: "34px Cousine",
    //   fill: 'white',
    //   align: 'center'
    // });
    // this.levelTwoText = this.game.add.text(545, 550, "Level 2", {
    //   font: "34px Cousine",
    //   fill: 'white',
    //   align: 'center'
    // });

    // this.levelThreeText = this.game.add.text(275, 650, "Level 3", {
    //   font: "34px Cousine",
    //   fill: 'white',
    //   align: 'center'
    // });

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

    this.rubyButtonOneTween = this.game.add.tween(this.rubyLevelOneButton);
    this.jsButtonOneTween = this.game.add.tween(this.jsLevelOneButton);
    // this.jsButtonTwoTween = this.game.add.tween(this.jsLevelTwoButton);
    // this.jsButtonThreeTween = this.game.add.tween(this.jsLevelThreeButton);
    // this.jsButtonFourTween = this.game.add.tween(this.jsLevelFourButton);
    // this.jsButtonFiveTween = this.game.add.tween(this.jsLevelFiveButton);
    // this.rubyButtonTwoTween = this.game.add.tween(this.rubyLevelTwoButton);
    // this.rubyButtonThreeTween = this.game.add.tween(this.rubyLevelThreeButton);
    // this.rubyButtonFourTween = this.game.add.tween(this.rubyLevelFourButton);
    // this.rubyButtonFiveTween = this.game.add.tween(this.rubyLevelFiveButton);
    // this.rubyButtonOneTween.to({x: 240, y: 230}, 500).start();
    // this.rubyButtonTwoTween.to({x: 500, y: 230}, 500).start();
    // this.rubyButtonThreeTween.to({x: 240, y: 340}, 500).start();
    // this.rubyButtonFourTween.to({x: 500, y: 340}, 500).start();
    // this.rubyButtonFiveTween.to({x: 365, y: 450}, 500).start();
    // this.jsButtonOneTween.to({x: 350, y: 230}, 500).start();
    // this.jsButtonTwoTween.to({x: 610, y: 230}, 500).start();
    // this.jsButtonThreeTween.to({x: 350, y: 340}, 500).start();
    // this.jsButtonFourTween.to({x: 610, y: 340}, 500).start();
    // this.jsButtonFiveTween.to({x: 480, y: 450}, 500).start();

    // that = this;
    // this.levelOneButton.inputEnabled = true;
    // this.levelTwoButton.inputEnabled = true;
    // this.levelThreeButton.inputEnabled = true;
    // this.levelFourButton.inputEnabled = true;
    // this.levelFiveButton.inputEnabled = true;
    // this.levelOneButton.events.onInputDown.add(this.levelStart, {level: 1});
    // this.levelTwoButton.events.onInputDown.add(this.levelStart, {level: 2});
    // this.levelThreeButton.events.onInputDown.add(this.levelStart, {level: 3});
    // this.levelFourButton.events.onInputDown.add(this.levelStart, {level: 4});
    // this.levelFiveButton.events.onInputDown.add(this.levelStart, {level: 5});
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
