"use strict";
angular
    .module("psFramework").controller("psFrameworkController",
        ['$scope', '$window', '$timeout', '$rootScope', '$location',
            function ($scope, $window, $timeout, $rootScope, $location) {

                $scope.isMenuVisible = true;
                $scope.isMenuButtonVisible = true;
                $scope.isMenuVertical = true;

                $scope.$on('ps-menu-item-selected-event', function (evt, data) {
                    $scope.routeString = data.route;
                    $location.path(data.route);
                    checkWidth();
                    broadcastMenuState();
                });

                // flag from psMenu controller letting the framework know that the menu has changed.
                $scope.$on('ps-menu-orientation-changed-event', function (evt, data) {
                    $scope.isMenuVertical = data.isMenuVertical;
                });


                // attach event to window when it is resized
                // the event is also given a namespace of .psFramework
                $($window).on("resize.psFramework", function () {
                    $scope.$apply(function () {
                        checkWidth();
                        broadcastMenuState();
                    });
                });
                // when scope recieved the destroy, remove handler
                $scope.$on("$destroy", function () {
                    $($window).off("resize.psFramework");
                });

                var checkWidth = function () {
                    // gets the full width of the window (uses the bigger value), for when the scrollbar shows up.
                    var width = Math.max($($window).width(), $($window).innerWidth());
                    $scope.isMenuVisible = (width > 768);
                    $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                };

                // handles when the responsive menu is clicked
                $scope.menuButtonClicked = function () {
                    $scope.isMenuVisible = !$scope.isMenuVisible;
                    broadcastMenuState();
                    //$scope.$apply(); //not sure why this is not working
                };

                var broadcastMenuState = function () {
                    $rootScope.$broadcast('ps-menu-show',
                        {
                            show: $scope.isMenuVisible,
                            isVertical: $scope.isMenuVertical,
                            allowHorizontalToggle: !$scope.isMenuButtonVisible
                        });
                };

                $timeout(function () {
                    checkWidth();
                }, 0);

            }
        ]);