var sectionDetect = require('./sectionDetect.js');
var anchorControl = require('./anchorControl.js');
var heightListElement = require('./heightListElement.js');
var tabsControl = require('./tabsControl.js');

$(window).on('load', function() {
    anchorControl.init();
    sectionDetect.init();
    heightListElement.init();
    tabsControl.init();

    if(window.location.hash) {
        var hash = window.location.hash;
        hash = hash.replace('#', '');
        anchorControl.move_to_anchor(hash);
    }
});