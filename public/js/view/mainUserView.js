define(['jquery', 'order!underscore', 'order!backbone'], function($, _, Backbone) {
  "use strict";
  return Backbone.View.extend({
    tagName: 'div',
    template: _.template($("#main-template").html()),
    initialize: function() {
      this.bindMouse();

      $('body').append(this.render().el);

      $('#input').focus();
    },
    events: {
      'keyup #input': 'keyupInput',
      'submit form' : 'submitForm' 
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    keyupInput: function() {
      this.model.set({
        text: this.$('#input').val()
      });
    },
    submitForm : function(evt) {
      this.$('#input').val('');
      evt.preventDefault();
    }, 
    bindMouse: function() {
      var that = this;
      $(document).mousemove(function(e) {
        var x = e.pageX,
            y = e.pageY;

        that.$('#input').css({
          'top'  : y,
          'left' : x
        });
        that.model.set({
          'x' : x,
          'y' : y
        });
      });
    }
  });
});

