require.config({
    baseUrl: '/js/',
    paths : {
        underscore :  'lib/loaders/underscore-loader',
        backbone :    'lib/loaders/backbone-loader',
        io:           'lib/loaders/io-loader',
        order:        'lib/order'
    }
});

require(['order!io',
         'model/mainUser', 
         'collection/userCollection', 
         'view/statsView',
         'view/mainUserView'], function (io, MainUserModel, UserCollection, StatsView, MainUserView) {

  'use strict';

    var sockets        = io.connect('http://localhost'),
        mainUserModel  = new MainUserModel(sockets),
        mainUserView   = new MainUserView({ model : mainUserModel }), 
        userCollection = new UserCollection(sockets), 
        statsView      = new StatsView({ collection : userCollection});
});
