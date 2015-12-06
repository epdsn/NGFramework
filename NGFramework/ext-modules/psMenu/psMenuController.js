"use strict";
angular.module("psMenu").controller('psMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $scope.isVertical = true;
            $scope.openMenuScope = null;
            $scope.showMenu = true;
            $scope.allowHorizontalToggle = true;

            // controls which item in the menu is active
            // only one item active at a time.
            this.getActiveElement = function () {
                 return $scope.activeElement;
            };

            this.setActiveElement = function (el) {
                $scope.activeElement = el;
            };

            this.isVertical = function () {
                return $scope.isVertical;
            };

            this.setRoute = function (route) {
                $rootScope.$broadcast('ps-menu-item-selected-event',
                    {route:  route})
            };
            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };
            $scope.toggleMenuOrientation = function () {
                // close any open menu
                if ($scope.openMenuScope)
                    $scope.openMenuScope.closeMenu();

                $scope.isVertical = !$scope.isVertical;
                // boradcasting to the rest of the app that the menu is vertical
                // so other components will know this is the case.
                $rootScope.$broadcast('ps-menu-orientation-changed-event', {isMenuVertical: $scope.isVertical});
            };

            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    // if clicked  in scoped menu, do nothing
                    if ($(e.target).parent().hasClass('ps-selectable-item'))
                        return;
                    //close menu if clicked outside of open submenu.
                    // using $apply because we are calling an element using jquery.
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            $scope.$on('ps-menu-show', function (evt, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });

        }
    ]);