"use strict";
angular.module("psMenu").directive('psMenuItem', function () {
    return {
        require: "^psMenu",
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'ext-modules/psMenu/psMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {

            // check if item is active
            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
            };

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                scope.$apply(function () {
                    // calls methods in controller psMenuController
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }

    };
});