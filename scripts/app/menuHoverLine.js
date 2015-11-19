var menuHoverLine = menuHoverLine || {};

menuHoverLine = {
    elements: {
        nav: null,
        line: null,
        navigationLink: null
    },

    init: function() {
        this.prepare_vars();
        this.prepare_listeners();
    },

    prepare_vars: function() {
        var _self = this;
        this.elements.nav = $('nav');
        this.elements.line = $('#line');
        this.elements.navigationLink = this.elements.nav.find('a');

        this.elements.line
            .width($(".active").width())
            .css("left", $(".active a").position().left)
            .data("origLeft", _self.elements.line.position().left)
            .data("origWidth", _self.elements.line.width());

    },

    prepare_listeners: function() {
        var _self = this;

        this.elements.navigationLink.hover(function() {
            var $el = $(this);
            var leftPos = $el.position().left;
            var newWidth = $el.parent().width();

            _self.elements.line.stop().animate({
                left: leftPos,
                width: newWidth
            });
        }, function() {
            _self.elements.line.stop().animate({
                left: _self.elements.line.data("origLeft"),
                width: _self.elements.line.data("origWidth")
            });
        });
    }
};

module.exports = menuHoverLine;
