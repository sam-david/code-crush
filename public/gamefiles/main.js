
var CodeFall = new Phaser.Game(960, 640, Phaser.AUTO, 'gameDiv');


CodeFall.state.add('Boot', Boot);
CodeFall.state.add('Preload', Preload);
CodeFall.state.add('MainMenu', MainMenu);
CodeFall.state.add('Game', Game);

CodeFall.state.start('Boot');
