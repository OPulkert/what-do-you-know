(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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
},{"./anchorControl.js":1,"./heightListElement.js":3,"./sectionDetect.js":4,"./tabsControl.js":5}],3:[function(require,module,exports){
var heightListElement = heightListElement || {};

heightListElement = {
    height: 0,

    elements: {
        elementP: null
    },

    init: function() {
        var _self = this;

        this.prepare_vars();
        this.count_height();

        $(window).on('resize', function() {
            _self.height = 0;
            _self.elements.elementP.css('height', 'auto');
            _self.count_height();
        });
    },

    prepare_vars: function() {
        this.elements.elementP = $('.list li p');
    },

    count_height: function() {
        var _self = this;
        if($(window).width() >= 768) {
            this.elements.elementP.each(function () {
                var h = $(this).outerHeight();
                if (_self.height < $(this).outerHeight()) {
                    _self.height = $(this).outerHeight();
                }
            });

            _self.set_height();
        }
    },

    set_height: function() {
        this.elements.elementP.css('height', this.height);
    }
};

module.exports = heightListElement;

},{}],4:[function(require,module,exports){
var sectionDetect = sectionDetect || {};

sectionDetect = {
    animated: false,
    isInSection: false,

    elements: {
        section: null,
        st: null,
        navLi: null,
        line: null,
        nav: null,
        horse: null,
        seal: null,
        defaultLeft: 0,
        defaultWidth: 0
    },

    init: function() {
        var _self = this;

        this.prepare_vars();
        this.prepare_listeners();


        $(window).on('scroll', function()
        {
            _self.elements.st = $(window).scrollTop();
            if(!_self.isInSection) {
                _self.detect_active_section();
            }
        });

    },

    prepare_vars: function() {
        var _self = this;

        this.elements.section = $('section.anchor');
        this.elements.navLi = $('nav ul li');
        this.elements.nav = $('nav');
        this.elements.line = $('#line');
        this.elements.horse = $('.horseAnimate');
        this.elements.seal = $('.sealAnimate');

        this.elements.navigationLink = this.elements.navLi.find('a');
        this.elements.navLi.first().addClass('active');
        this.elements.defaultLeft = this.elements.navLi.first().find('a').position().left;
        this.elements.defaultWidth = this.elements.navLi.first().find('a').width();

        this.elements.line
            .width(_self.elements.defaultWidth)
            .css("left",_self.elements.defaultLeft);
    },

    prepare_listeners: function() {
        var _self = this;

        this.elements.navigationLink.hover(function() {
            var $element = $(this);
            _self.animate_link($element);

        }, function() {
            _self.back_to_position();
        });
    },

    detect_active_section: function() {
        var _self = this;

        var closest = 0;
        var pageTop = this.elements.st;

        this.elements.section.each(function(index)
        {
            if(pageTop > $(this).offset().top - 100)
            {
                _self.isInSection = true;
                closest = index;
            }
        });

        if(closest == 1) {
            if(!_self.animated) {
                _self.animated = true;
                _self.elements.horse.animate({
                    right: 0
                }, 500);

                _self.elements.seal.animate({
                    left: 0
                }, 500);
            }
        }

        var $el = this.elements.navLi.eq(closest).find('a');
        this.elements.navLi.eq(closest).addClass('active').siblings().removeClass('active');
        this.animate_link($el);
    },

    animate_link: function($el) {
        var leftPos = $el.position().left;
        var newWidth = $el.parent().width();

        this.elements.line.stop().animate({
            left: leftPos,
            width: newWidth
        });

        this.count_origin_position();
    },

    back_to_position: function() {
        var _self = this;

        this.elements.line.stop().animate({
            left: _self.elements.defaultLeft,
            width: _self.elements.defaultWidth
        });
    },

    count_origin_position: function() {
        var _self = this;

        this.elements.defaultLeft = this.elements.nav.find('.active').find('a').position().left;
        this.elements.defaultWidth = this.elements.nav.find('.active').find('a').width();

        _self.isInSection = false;
    }



};

module.exports = sectionDetect;

},{}],5:[function(require,module,exports){
var tabsControl = {} || tabsControl;

tabsControl = {
    elements: {
        tabsLink: null,
        link: null,
        content: null,
        active: null
    },

    init: function() {
        this.prepare_vars();
        this.prepare_listeners();
    },

    prepare_vars: function() {
        this.elements.tabsLink = $('.tabsLink');
        this.elements.link = this.elements.tabsLink.find('a');
        this.elements.active = $(this.elements.link.filter('[href="'+location.hash+'"]')[0] || this.elements.link[0]);
        this.elements.active.addClass('active');
        this.elements.content = $(this.elements.active[0].hash);

        this.elements.link.not(this.elements.active).each(function () {
          $(this.hash).hide();
        });
    },

    prepare_listeners: function() {
        var _self = this;

        this.elements.tabsLink.on('click', 'a', function(e){
          _self.elements.active.removeClass('active');
          _self.elements.content.hide();

          _self.elements.active = $(this);
          _self.elements.content = $(this.hash);

          _self.elements.active.addClass('active');
          _self.elements.content.show();

          e.preventDefault();
       });
    }
}

module.exports = tabsControl;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FwcC9hbmNob3JDb250cm9sLmpzIiwic2NyaXB0cy9hcHAvYXBwLmpzIiwic2NyaXB0cy9hcHAvaGVpZ2h0TGlzdEVsZW1lbnQuanMiLCJzY3JpcHRzL2FwcC9zZWN0aW9uRGV0ZWN0LmpzIiwic2NyaXB0cy9hcHAvdGFic0NvbnRyb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmNob3JDb250cm9sID0gYW5jaG9yQ29udHJvbCB8fCB7fTtcblxuYW5jaG9yQ29udHJvbCA9IHtcbiAgICBlbGVtZW50czoge1xuICAgICAgICBhbmNob3JMaW5rOiBudWxsXG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByZXBhcmVfdmFycygpO1xuICAgICAgICB0aGlzLnByZXBhcmVfbGlzdGVuZXJzKCk7XG4gICAgfSxcblxuICAgIHByZXBhcmVfdmFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuYW5jaG9yTGluayA9ICQoJy5hbmNob3JMaW5rJyk7XG4gICAgfSxcblxuICAgIHByZXBhcmVfbGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5lbGVtZW50cy5hbmNob3JMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJykucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgICAgIF9zZWxmLm1vdmVfdG9fYW5jaG9yKGhyZWYpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgbW92ZV90b19hbmNob3I6IGZ1bmN0aW9uKGFuY2hvcikge1xuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9ICQoXCJbaWQ9J1wiICsgYW5jaG9yICsgXCInXVwiKTtcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0YXJnZXRFbGVtZW50Lm9mZnNldCgpLnRvcH0sICdzbG93Jyk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbmNob3JDb250cm9sO1xuIiwidmFyIHNlY3Rpb25EZXRlY3QgPSByZXF1aXJlKCcuL3NlY3Rpb25EZXRlY3QuanMnKTtcbnZhciBhbmNob3JDb250cm9sID0gcmVxdWlyZSgnLi9hbmNob3JDb250cm9sLmpzJyk7XG52YXIgaGVpZ2h0TGlzdEVsZW1lbnQgPSByZXF1aXJlKCcuL2hlaWdodExpc3RFbGVtZW50LmpzJyk7XG52YXIgdGFic0NvbnRyb2wgPSByZXF1aXJlKCcuL3RhYnNDb250cm9sLmpzJyk7XG5cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGFuY2hvckNvbnRyb2wuaW5pdCgpO1xuICAgIHNlY3Rpb25EZXRlY3QuaW5pdCgpO1xuICAgIGhlaWdodExpc3RFbGVtZW50LmluaXQoKTtcbiAgICB0YWJzQ29udHJvbC5pbml0KCk7XG5cbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICBoYXNoID0gaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICBhbmNob3JDb250cm9sLm1vdmVfdG9fYW5jaG9yKGhhc2gpO1xuICAgIH1cbn0pOyIsInZhciBoZWlnaHRMaXN0RWxlbWVudCA9IGhlaWdodExpc3RFbGVtZW50IHx8IHt9O1xuXG5oZWlnaHRMaXN0RWxlbWVudCA9IHtcbiAgICBoZWlnaHQ6IDAsXG5cbiAgICBlbGVtZW50czoge1xuICAgICAgICBlbGVtZW50UDogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnByZXBhcmVfdmFycygpO1xuICAgICAgICB0aGlzLmNvdW50X2hlaWdodCgpO1xuXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfc2VsZi5oZWlnaHQgPSAwO1xuICAgICAgICAgICAgX3NlbGYuZWxlbWVudHMuZWxlbWVudFAuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgICAgICAgICAgX3NlbGYuY291bnRfaGVpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwcmVwYXJlX3ZhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmVsZW1lbnRQID0gJCgnLmxpc3QgbGkgcCcpO1xuICAgIH0sXG5cbiAgICBjb3VudF9oZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZWxlbWVudFAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGggPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9zZWxmLmhlaWdodCA8ICQodGhpcykub3V0ZXJIZWlnaHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5oZWlnaHQgPSAkKHRoaXMpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9zZWxmLnNldF9oZWlnaHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRfaGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5lbGVtZW50UC5jc3MoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlaWdodExpc3RFbGVtZW50O1xuIiwidmFyIHNlY3Rpb25EZXRlY3QgPSBzZWN0aW9uRGV0ZWN0IHx8IHt9O1xuXG5zZWN0aW9uRGV0ZWN0ID0ge1xuICAgIGFuaW1hdGVkOiBmYWxzZSxcbiAgICBpc0luU2VjdGlvbjogZmFsc2UsXG5cbiAgICBlbGVtZW50czoge1xuICAgICAgICBzZWN0aW9uOiBudWxsLFxuICAgICAgICBzdDogbnVsbCxcbiAgICAgICAgbmF2TGk6IG51bGwsXG4gICAgICAgIGxpbmU6IG51bGwsXG4gICAgICAgIG5hdjogbnVsbCxcbiAgICAgICAgaG9yc2U6IG51bGwsXG4gICAgICAgIHNlYWw6IG51bGwsXG4gICAgICAgIGRlZmF1bHRMZWZ0OiAwLFxuICAgICAgICBkZWZhdWx0V2lkdGg6IDBcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlX3ZhcnMoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlX2xpc3RlbmVycygpO1xuXG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgIF9zZWxmLmVsZW1lbnRzLnN0ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgaWYoIV9zZWxmLmlzSW5TZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuZGV0ZWN0X2FjdGl2ZV9zZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHByZXBhcmVfdmFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5zZWN0aW9uID0gJCgnc2VjdGlvbi5hbmNob3InKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5uYXZMaSA9ICQoJ25hdiB1bCBsaScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdiA9ICQoJ25hdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmxpbmUgPSAkKCcjbGluZScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmhvcnNlID0gJCgnLmhvcnNlQW5pbWF0ZScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnNlYWwgPSAkKCcuc2VhbEFuaW1hdGUnKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdmlnYXRpb25MaW5rID0gdGhpcy5lbGVtZW50cy5uYXZMaS5maW5kKCdhJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubmF2TGkuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuZGVmYXVsdExlZnQgPSB0aGlzLmVsZW1lbnRzLm5hdkxpLmZpcnN0KCkuZmluZCgnYScpLnBvc2l0aW9uKCkubGVmdDtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5kZWZhdWx0V2lkdGggPSB0aGlzLmVsZW1lbnRzLm5hdkxpLmZpcnN0KCkuZmluZCgnYScpLndpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cy5saW5lXG4gICAgICAgICAgICAud2lkdGgoX3NlbGYuZWxlbWVudHMuZGVmYXVsdFdpZHRoKVxuICAgICAgICAgICAgLmNzcyhcImxlZnRcIixfc2VsZi5lbGVtZW50cy5kZWZhdWx0TGVmdCk7XG4gICAgfSxcblxuICAgIHByZXBhcmVfbGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdmlnYXRpb25MaW5rLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKTtcbiAgICAgICAgICAgIF9zZWxmLmFuaW1hdGVfbGluaygkZWxlbWVudCk7XG5cbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfc2VsZi5iYWNrX3RvX3Bvc2l0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBkZXRlY3RfYWN0aXZlX3NlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjbG9zZXN0ID0gMDtcbiAgICAgICAgdmFyIHBhZ2VUb3AgPSB0aGlzLmVsZW1lbnRzLnN0O1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2VjdGlvbi5lYWNoKGZ1bmN0aW9uKGluZGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihwYWdlVG9wID4gJCh0aGlzKS5vZmZzZXQoKS50b3AgLSAxMDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3NlbGYuaXNJblNlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoY2xvc2VzdCA9PSAxKSB7XG4gICAgICAgICAgICBpZighX3NlbGYuYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5hbmltYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3NlbGYuZWxlbWVudHMuaG9yc2UuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgICAgIF9zZWxmLmVsZW1lbnRzLnNlYWwuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyICRlbCA9IHRoaXMuZWxlbWVudHMubmF2TGkuZXEoY2xvc2VzdCkuZmluZCgnYScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLm5hdkxpLmVxKGNsb3Nlc3QpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5hbmltYXRlX2xpbmsoJGVsKTtcbiAgICB9LFxuXG4gICAgYW5pbWF0ZV9saW5rOiBmdW5jdGlvbigkZWwpIHtcbiAgICAgICAgdmFyIGxlZnRQb3MgPSAkZWwucG9zaXRpb24oKS5sZWZ0O1xuICAgICAgICB2YXIgbmV3V2lkdGggPSAkZWwucGFyZW50KCkud2lkdGgoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmxpbmUuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgbGVmdDogbGVmdFBvcyxcbiAgICAgICAgICAgIHdpZHRoOiBuZXdXaWR0aFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvdW50X29yaWdpbl9wb3NpdGlvbigpO1xuICAgIH0sXG5cbiAgICBiYWNrX3RvX3Bvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmxpbmUuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgbGVmdDogX3NlbGYuZWxlbWVudHMuZGVmYXVsdExlZnQsXG4gICAgICAgICAgICB3aWR0aDogX3NlbGYuZWxlbWVudHMuZGVmYXVsdFdpZHRoXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjb3VudF9vcmlnaW5fcG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZGVmYXVsdExlZnQgPSB0aGlzLmVsZW1lbnRzLm5hdi5maW5kKCcuYWN0aXZlJykuZmluZCgnYScpLnBvc2l0aW9uKCkubGVmdDtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5kZWZhdWx0V2lkdGggPSB0aGlzLmVsZW1lbnRzLm5hdi5maW5kKCcuYWN0aXZlJykuZmluZCgnYScpLndpZHRoKCk7XG5cbiAgICAgICAgX3NlbGYuaXNJblNlY3Rpb24gPSBmYWxzZTtcbiAgICB9XG5cblxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlY3Rpb25EZXRlY3Q7XG4iLCJ2YXIgdGFic0NvbnRyb2wgPSB7fSB8fCB0YWJzQ29udHJvbDtcblxudGFic0NvbnRyb2wgPSB7XG4gICAgZWxlbWVudHM6IHtcbiAgICAgICAgdGFic0xpbms6IG51bGwsXG4gICAgICAgIGxpbms6IG51bGwsXG4gICAgICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgICAgIGFjdGl2ZTogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlX3ZhcnMoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlX2xpc3RlbmVycygpO1xuICAgIH0sXG5cbiAgICBwcmVwYXJlX3ZhcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnRhYnNMaW5rID0gJCgnLnRhYnNMaW5rJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubGluayA9IHRoaXMuZWxlbWVudHMudGFic0xpbmsuZmluZCgnYScpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmFjdGl2ZSA9ICQodGhpcy5lbGVtZW50cy5saW5rLmZpbHRlcignW2hyZWY9XCInK2xvY2F0aW9uLmhhc2grJ1wiXScpWzBdIHx8IHRoaXMuZWxlbWVudHMubGlua1swXSk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuYWN0aXZlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5jb250ZW50ID0gJCh0aGlzLmVsZW1lbnRzLmFjdGl2ZVswXS5oYXNoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzLmxpbmsubm90KHRoaXMuZWxlbWVudHMuYWN0aXZlKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMuaGFzaCkuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcHJlcGFyZV9saXN0ZW5lcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMudGFic0xpbmsub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBfc2VsZi5lbGVtZW50cy5hY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIF9zZWxmLmVsZW1lbnRzLmNvbnRlbnQuaGlkZSgpO1xuXG4gICAgICAgICAgX3NlbGYuZWxlbWVudHMuYWN0aXZlID0gJCh0aGlzKTtcbiAgICAgICAgICBfc2VsZi5lbGVtZW50cy5jb250ZW50ID0gJCh0aGlzLmhhc2gpO1xuXG4gICAgICAgICAgX3NlbGYuZWxlbWVudHMuYWN0aXZlLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICBfc2VsZi5lbGVtZW50cy5jb250ZW50LnNob3coKTtcblxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICB9KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGFic0NvbnRyb2w7XG4iXX0=
