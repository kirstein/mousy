require.config({
    baseUrl: '/js/',
    paths : {
        underscore :  'lib/loaders/underscore-loader',
        backbone :    'lib/loaders/backbone-loader',
        io:           'lib/loaders/io-loader',
        order:        'lib/order'
    }
});

require(['core', 'collection/userCollection', 'view/statsView'], function (Core, UserCollection, StatsView) {

    'use strict';


    var application    = new Core(),
        userCollection = new UserCollection(application.socket()),
        statsView      = new StatsView(userCollection);



});
