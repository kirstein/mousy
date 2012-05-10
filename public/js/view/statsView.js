define(['order!jquery','order!underscore', 'order!backbone'], function($, _, Backbone) {

  "use strict";

  return Backbone.View.extend({
    
    template: _.template($('#stats-template').html()),
    initialize: function(collection) {
      this.collection = collection;
      this.collection.bind('change', this.render, this);

      $('body').append(this.render().el);
    },
    render : function() {
      $(this.el).html(this.template({ count: this.collection.length }));
      return this;
    }

  }); 
});
