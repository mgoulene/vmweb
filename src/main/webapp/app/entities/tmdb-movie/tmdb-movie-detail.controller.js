(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('TMDBMovieDetailController', TMDBMovieDetailController);

    TMDBMovieDetailController.$inject = ['$window', '$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TMDBMovie','TMDBMovieImport'];

    function TMDBMovieDetailController($window, $scope, $rootScope, $stateParams, previousState, entity, TMDBMovie, TMDBMovieImport) {
        console.log("tmdb-movie-detail.controller.js:TMDBMovieDetailController()");
        var vm = this;

        vm.tMDBMovie = entity;
        vm.previousState = previousState.name;
        vm.toMovie = toMovie;


        var unsubscribe = $rootScope.$on('vmwebApp:tMDBMovieUpdate', function(event, result) {
            vm.tMDBMovie = result;
        });
        $scope.$on('$destroy', unsubscribe);
        function toMovie() {
            console.log("tmdb-movie-detail.controller.js:toMovie()"+vm.tMDBMovie.id);
            TMDBMovieImport.import({id: vm.tMDBMovie.id}, function(result) {
                $window.location.href = '#/movie/'+result.id;
            });
        }
    }
})();
