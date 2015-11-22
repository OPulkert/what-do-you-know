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
