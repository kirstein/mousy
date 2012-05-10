define(['order!io', 'model/mainUser'], function(io, MainUserModel) {

  "use strict";

  return function() {

    var socket = io.connect('http://localhost'),
        model = new MainUserModel(socket);

    $(document).mousemove(function (e) {
      model.set({
        x : e.pageX,
        y : e.pageY
      });
    });

    this.socket = function() {
      return socket;
    }
  }

  });
