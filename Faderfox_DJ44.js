// Declare the variable for your controller and assign it to an empty object
var DJ44 = {};
 
// Mixxx calls this function on startup or when the controller
// is enabled in the Mixxx Preferences
DJ44.init = function (id, debugging) {
    // create an instance of your custom Deck object for each side of your controller
    DJ44.leftDeck = new DJ44.Deck([1, 3], 1);
    DJ44.rightDeck = new DJ44.Deck([2, 4], 2);
// turn on all LEDs
    for (var i = 1; i <= 40; i++) { 
        midi.sendShortMsg(0xB0, i, 0x7f);
		midi.sendShortMsg(0xB1, i, 0x7f);
    }
}
};
 

 DJ44.shutdown = function () {
    // send whatever MIDI messages you need to turn off the lights of your controller
	   for (var i = 1; i <= 40; i++) {
        midi.sendShortMsg(0xB0, i, 0x00);
	   for (var i = 1; i <= 40; i++) {
        midi.sendShortMsg(0xB1, i, 0x00);
};
 
}
 
   DJ44.LoopEncoder = new components.Encoder({
    midi: [0xB0, 0xA1],
    group: '[Channel1]',
    inKey: 'loop_halve',
    input: function (channel, control, value, status, group) {
        if (value === 1) {
            this.inSetParameter(this.inGetParameter() - .05);
        } else if (value === 127) {
            this.inSetParameter(this.inGetParameter() + .05);
        }
    }
});

// give your custom Deck all the methods of the generic Deck in the Components library
DJ44.Deck.prototype = new components.Deck();