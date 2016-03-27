(function() {
    'use strict';
    
    angular
        .module('app')
        .directive('numbersOnly', numbersOnly);
    
    function numbersOnly() {
        var directive = {
            require: 'ngModel',
            restrict: 'EA',
            link: linkFn
        };
        return directive;
        
        function linkFn(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9.-]/g, '');

                transformedInput = cleanNonLeadingDash(transformedInput);
                transformedInput = cleanExtraDecimals(transformedInput);
                transformedInput = limitDecimals(transformedInput, scope.vm.numDecimals);

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    }


    /**
     * Helper functions
     */

    function cleanNonLeadingDash(val) {
        var lastIndex = val.lastIndexOf('-');
        if (lastIndex > 0) {
            val = val.slice(0, lastIndex);
        }
        return val;
    }

    function cleanExtraDecimals(val) {
        var count = val.split('.').length;
        if (count > 2) {
            val = val.slice(0, val.length - 1);
        }
        return val;
    }
    
    function limitDecimals(val, numDecimals) {
        var decimalPos = val.indexOf('.'),
            floatArr = [],
            newDecimal;

        if (!numDecimals) {
            numDecimals = 4;
        }

        if (decimalPos > -1) {
            floatArr = val.split('.');
            if (floatArr[1].length > numDecimals) {
                newDecimal = floatArr[1].slice(0, numDecimals);
                val = floatArr[0] + '.' + newDecimal;
            }
        }
        return val;
    }
    
})();