WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { CodeFall.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Cousine']
    }

};

//setting game configuration and loading the assets for the loading screen
var Boot = {
  preload: function() {
    // google font script
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    this.load.image('preloadbar', 'gamefiles/assets/preloader-bar.png');
    this.load.image('logo', 'gamefiles/assets/codecrush-logo.png');
    this.load.image('codeFallLogo', 'gamefiles/assets/codefall-logo.png');
    this.load.image('space', 'gamefiles/assets/space.png');
    //assets we'll use in the loading screen
  },
  create: function() {
    this.state.start('Preload');
  }
};
