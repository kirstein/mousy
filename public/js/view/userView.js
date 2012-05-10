define(['order!jquery', 'order!underscore', 'order!backbone'], function($, _, Backbone) {
  "use strict";

  return Backbone.View.extend({
    tagName: 'div',
         template: _.template($('#user-template').html()),
         initialize: function (model) {
           this.model = model;
           this.model.on('change', this.render, this);
           this.model.on('remove', this.destroy, this);

           $("body").append(this.render().el);
         },

         render: function () {
           $(this.el).html(this.template(this.model.toJSON()));
           this.$('.content').css({
             left: this.model.get('x'),
             top: this.model.get('y')
           });
           return this;
         },

         destroy : function() {
           $(this.el).remove();
         }
  });

});
