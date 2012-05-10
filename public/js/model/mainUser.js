define(['order!underscore', 'order!backbone'], function(_, Backbone) {

  "use strict";

  return Backbone.Model.extend({
        initialize: function (socket) {
            this.on('change', this.sync, this);
            this.socket = socket;
        },
        defaults: {
            x: 50,
            y: 50,
            text : ""
        },
        sync: function () {
            var data = {
                 x: this.get('x'),
                 y: this.get('y'),
              text: this.get('text')
            };
            this.socket.emit('sync', data);
        }
    });
});
