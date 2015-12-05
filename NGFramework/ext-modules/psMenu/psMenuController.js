"use strict";
angular.module("psMenu").controller('psMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $scope.showMenu = true;

            // controls which item in the menu is active
            // only one item active at a time.
            this.getActiveElement = function () {
                 return $scope.activeElement;
            };

            this.setActiveElement = function (el) {
                $scope.activeElement = el;
            };

            this.setRoute = function (route) {
                $rootScope.$broadcast('ps-menu-item-selected-event',
                    {route:  route})
            };

            $scope.$on('ps-menu-show', function (evt, data) {
                $scope.showMenu = data.show;
            });

        }
    ]);