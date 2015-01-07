var currentLevel = 1;

var MainMenu = {
  create: function() {
    console.log('main menu made');
    //show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

    //give it speed in x
    this.background.autoScroll(-20, 0);

    //highest score
    this.codeCrushlogo = this.game.add.sprite(840,530, 'logo');
    this.codeFalllogo = this.game.add.sprite(220,30, 'codeFallLogo');
    this.levelOneButton = this.game.add.sprite(230,230, 'redButton');
    this.levelTwoButton = this.game.add.sprite(500,230, 'redButton');
    this.levelThreeButton = this.game.add.sprite(230,330, 'yellowButton');
    this.levelFourButton = this.game.add.sprite(500,330, 'yellowButton');
    this.levelFiveButton = this.game.add.sprite(365,430, 'redButton');

    // this.codeFalllogo.scale.setTo(.7);
    this.levelOneText = this.game.add.text(275, 250, "Level 1", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelTwoText = this.game.add.text(545, 250, "Level 2", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelThreeText = this.game.add.text(275, 350, "Level 3", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelFourText = this.game.add.text(545, 350, "Level 4", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });

    this.levelFiveText = this.game.add.text(410, 450, "Level 5", {
      font: "34px Cousine",
      fill: 'white',
      align: 'center'
    });
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
