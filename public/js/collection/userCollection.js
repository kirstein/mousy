define(['order!underscore','order!backbone', 'model/userModel', 'lib/backbone-localstorage'], function(_, Backbone, UserModel, LocalStorage) {

  "use strict";

  return Backbone.Collection.extend({
        localStorage: new LocalStorage("users"),  
        model: UserModel,
        initialize: function (socket) {
            this.socket = socket;
            this.handleSocks();
        },
        handleSocks : function () {
            var that = this;
            this.socket.on('uconnect', function (id) {
                that.add({
                    'id': id
                });
            });
            this.socket.on('udconnect', function (id) {
                that.remove(that.where({
                    'id': id
                }));
            });
            this.socket.on('sync', function (data) {
                that.setById.call(that, data);
            });
        }, 
        setById: function (data) {
            var arr = this.where({ 'id': data.id }),
                i;

            for (i = 0; i < arr.length; i += 1) {
                arr[i].set({
                    x: data.x,
                    y: data.y
                });
            }
        },
    });

});
