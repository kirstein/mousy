define(['order!backbone'], function(Backbone) {

  "use strict";

  return Backbone.Model.extend({
        initialize: function (socket) {
            this.on('change', this.sync, this);
            this.socket = socket;
        },
        defaults: {
            x: -100,
            y: -100
        },
        sync: function () {
            var data = {
                x: this.get('x'),
                y: this.get('y')
            };
            this.socket.emit('sync', data);
        }
    });
});
