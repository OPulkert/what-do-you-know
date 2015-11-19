(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var menuHoverLine = require('./menuHoverLine.js');

$(window).on('load', function() {
    menuHoverLine.init();
});
},{"./menuHoverLine.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC9hcHAuanMiLCJzY3JpcHRzL2FwcC9tZW51SG92ZXJMaW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1lbnVIb3ZlckxpbmUgPSByZXF1aXJlKCcuL21lbnVIb3ZlckxpbmUuanMnKTtcblxuJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgbWVudUhvdmVyTGluZS5pbml0KCk7XG59KTsiLCJ2YXIgbWVudUhvdmVyTGluZSA9IG1lbnVIb3ZlckxpbmUgfHwge307XG5cbm1lbnVIb3ZlckxpbmUgPSB7XG4gICAgZWxlbWVudHM6IHtcbiAgICAgICAgbmF2OiBudWxsLFxuICAgICAgICBsaW5lOiBudWxsLFxuICAgICAgICBuYXZpZ2F0aW9uTGluazogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlX3ZhcnMoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlX2xpc3RlbmVycygpO1xuICAgIH0sXG5cbiAgICBwcmVwYXJlX3ZhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdiA9ICQoJ25hdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmxpbmUgPSAkKCcjbGluZScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdmlnYXRpb25MaW5rID0gdGhpcy5lbGVtZW50cy5uYXYuZmluZCgnYScpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMubGluZVxuICAgICAgICAgICAgLndpZHRoKCQoXCIuYWN0aXZlXCIpLndpZHRoKCkpXG4gICAgICAgICAgICAuY3NzKFwibGVmdFwiLCAkKFwiLmFjdGl2ZSBhXCIpLnBvc2l0aW9uKCkubGVmdClcbiAgICAgICAgICAgIC5kYXRhKFwib3JpZ0xlZnRcIiwgX3NlbGYuZWxlbWVudHMubGluZS5wb3NpdGlvbigpLmxlZnQpXG4gICAgICAgICAgICAuZGF0YShcIm9yaWdXaWR0aFwiLCBfc2VsZi5lbGVtZW50cy5saW5lLndpZHRoKCkpO1xuXG4gICAgfSxcblxuICAgIHByZXBhcmVfbGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdmlnYXRpb25MaW5rLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgbGVmdFBvcyA9ICRlbC5wb3NpdGlvbigpLmxlZnQ7XG4gICAgICAgICAgICB2YXIgbmV3V2lkdGggPSAkZWwucGFyZW50KCkud2lkdGgoKTtcblxuICAgICAgICAgICAgX3NlbGYuZWxlbWVudHMubGluZS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdFBvcyxcbiAgICAgICAgICAgICAgICB3aWR0aDogbmV3V2lkdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF9zZWxmLmVsZW1lbnRzLmxpbmUuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IF9zZWxmLmVsZW1lbnRzLmxpbmUuZGF0YShcIm9yaWdMZWZ0XCIpLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBfc2VsZi5lbGVtZW50cy5saW5lLmRhdGEoXCJvcmlnV2lkdGhcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbnVIb3ZlckxpbmU7XG4iXX0=
