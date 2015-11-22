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
