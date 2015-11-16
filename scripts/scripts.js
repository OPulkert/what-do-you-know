(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var carousel = require('./carousel.js');

$(window).on('load', function() {
    carousel.init();
});
},{"./carousel.js":2}],2:[function(require,module,exports){
var carousel = carousel || {};

carousel = {

    elements: {

    },

    init: function() {
        console.log('b');
        this.prepare_vars();
        this.prepare_listeners();
    },

    prepare_vars: function() {

    },

    prepare_listeners: function() {
        var _self = this;

    }
};

module.exports = carousel;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC9hcHAuanMiLCJzY3JpcHRzL2FwcC9jYXJvdXNlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY2Fyb3VzZWwgPSByZXF1aXJlKCcuL2Nhcm91c2VsLmpzJyk7XG5cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGNhcm91c2VsLmluaXQoKTtcbn0pOyIsInZhciBjYXJvdXNlbCA9IGNhcm91c2VsIHx8IHt9O1xuXG5jYXJvdXNlbCA9IHtcblxuICAgIGVsZW1lbnRzOiB7XG5cbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiJyk7XG4gICAgICAgIHRoaXMucHJlcGFyZV92YXJzKCk7XG4gICAgICAgIHRoaXMucHJlcGFyZV9saXN0ZW5lcnMoKTtcbiAgICB9LFxuXG4gICAgcHJlcGFyZV92YXJzOiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG5cbiAgICBwcmVwYXJlX2xpc3RlbmVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhcm91c2VsO1xuIl19
