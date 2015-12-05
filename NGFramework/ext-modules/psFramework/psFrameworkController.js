"use strict";
angular
    .module("psFramework").controller("psFrameworkController",
        ['$scope', '$rootScope', '$window', '$timeout',
            function ($scope, $rootScope, $window, $timeout) {

                $scope.isMenuVisible = true;
                $scope.isMenuButtonVisible = true;

                $scope.$on('ps-menu-item-selected-event', function (evt, data) {
                    $scope.routeString = data.route;
                    checkWidth();
                    broadcastMenuState();
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
                    // gets the full width of the window, even when the scrollbar shows up.
                    var width = Math.max($($window).width(), $($window).innerWidth());
                    $scope.isMenuVisible = (width > 768);
                    $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                };

                // handles when the responsive menu is clicked
                $scope.menuButtonClicked = function () {
                    $scope.isMenuVisible = !$scope.isMenuVisible;
                    broadcastMenuState();
                    //$scope.$apply();
                };

                var broadcastMenuState = function () {
                    $rootScope.$broadcast('ps-menu-show',
                        {
                            show: $scope.isMenuVisible
                        });
                };

                $timeout(function () {
                    checkWidth();
                }, 0);

            }
        ]);