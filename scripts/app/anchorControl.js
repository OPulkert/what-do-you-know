var anchorControl = anchorControl || {};

anchorControl = {
    elements: {
        anchorLink: null
    },

    init: function() {
        this.prepare_vars();
        this.prepare_listeners();
    },

    prepare_vars: function() {
        this.elements.anchorLink = $('.anchorLink');
    },

    prepare_listeners: function() {
        var _self = this;
        this.elements.anchorLink.on('click', function(e) {
            e.preventDefault();
            var href = $(this).attr('href').replace('#', '');
            _self.move_to_anchor(href);
        });
    },

    move_to_anchor: function(anchor) {
        var targetElement = $("[id='" + anchor + "']");
        $('html,body').animate({scrollTop: targetElement.offset().top}, 'slow');
    }
};

module.exports = anchorControl;
