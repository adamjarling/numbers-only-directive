(function(){
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.myNumber = 125.98;
        vm.numDecimals = 2;

    }

})();