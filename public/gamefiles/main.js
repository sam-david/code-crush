
var CodeFall = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv');


CodeFall.state.add('Boot', Boot);
CodeFall.state.add('MainMenu', MainMenu);
CodeFall.state.add('Game', Game);
// CodeFall.state.add('Level1', Game);

CodeFall.state.start('Boot');
