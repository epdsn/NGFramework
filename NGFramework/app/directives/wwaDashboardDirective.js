"use strict";
angular.module('app').directive('wwaDashboard', function () {
    return {
        //restrict: 'AE',
        
        scope: {
            // only used for attributes from the caller here.
        },
        // template must be snake case to work
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {

            scope.title = 'Dashboard Title';

            // for gridster options see:
            // https://github.com/ManifestWebDesign/angular-gridster

            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: false
            };

            scope.widgets = [
            {
                title: 'First',
                // size of widget
                sizeX: 3,
                sizeY: 3,
                // widget placement
                row: 0,
                col:0
            },
            {
                title: 'Second',
                sizeX: 2,
                sizeY: 4,
                row: 0,
                col: 5
            }
            ];
        }
    }
});