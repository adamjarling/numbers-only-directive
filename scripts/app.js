(function() {
    'use strict';
    angular
        .module('app', ['ui.router'])
        .config(UIRouter);

    UIRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function UIRouter($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/state1");

        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "views/state1.html"
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "views/state2.html"
            });
    }
})();



