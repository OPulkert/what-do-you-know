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
