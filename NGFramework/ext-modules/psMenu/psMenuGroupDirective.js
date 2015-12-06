"use strict";
angular.module('psMenu').directive('psMenuGroup', function () {
    return {
        require: "^psMenu",
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/psMenu/psMenuGroupTemplate.html',
        link: function (scope, el, attrs, ctrl) {
            // sub menu is closed on start
            scope.isOpen = false;
            scope.closeMenu = function () {
                scope.isOpen = false;
            };
            // opens sub menu when it is clicked.
            scope.clicked = function () {
                scope.isOpen = !scope.isOpen;
                if (el.parents('.ps-subitem-section').length == 0)
                    scope.setSubmenuPosition();
                // adds 
                ctrl.setOpenMenuScope(scope);


            };
            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            };
            scope.setSubmenuPosition = function () {
                // jquery to get left and top offset of element
                var pos = el.offset();
                $('body .ps-subitem-section').css({ 'left': pos.left + 20, 'top' : 36});
            };
        }
    };
});