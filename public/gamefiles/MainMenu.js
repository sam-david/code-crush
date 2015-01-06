CodeFall.MainMenu = function(){};

CodeFall.MainMenu.prototype = {
  create: function() {
    console.log('main menu made');
    //show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

    //give it speed in x
    this.background.autoScroll(-20, 0);

    //start game text
    var t = this.add.text(this.game.width/2, this.game.height/2, "poop");
    t.anchor.set(0.5);

    //highest score

    // button = new Button(this,10,10);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
