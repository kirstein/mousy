define(['order!backbone', 'view/userView'], function(Backbone, UserView) {

  "use strict";

  return Backbone.Model.extend({
        initialize: function () {
          this.on('remove', this.destroy);

          if (this.get('id') !== null) {
              this.view = new UserView(this);
          }
        },
        defaults: {
            id: null,
            x: -100,
            y: -100
        }
    });
});
