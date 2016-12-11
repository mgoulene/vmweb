(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('MovieDialogController', MovieDialogController);

    MovieDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Movie', 'Picture', 'Genre', 'Actor'];

    function MovieDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Movie, Picture, Genre, Actor) {
        var vm = this;

        vm.movie = entity;
        vm.clear = clear;
        vm.save = save;
        vm.posters = Picture.query({filter: 'movie-is-null'});
        $q.all([vm.movie.$promise, vm.posters.$promise]).then(function() {
            if (!vm.movie.posterId) {
                return $q.reject();
            }
            return Picture.get({id : vm.movie.posterId}).$promise;
        }).then(function(poster) {
            vm.posters.push(poster);
        });
        vm.backdrops = Picture.query({filter: 'movie-is-null'});
        $q.all([vm.movie.$promise, vm.backdrops.$promise]).then(function() {
            if (!vm.movie.backdropId) {
                return $q.reject();
            }
            return Picture.get({id : vm.movie.backdropId}).$promise;
        }).then(function(backdrop) {
            vm.backdrops.push(backdrop);
        });
        vm.genres = Genre.query({filter: 'movie-is-null'});
        $q.all([vm.movie.$promise, vm.genres.$promise]).then(function() {
            if (!vm.movie.genreId) {
                return $q.reject();
            }
            return Genre.get({id : vm.movie.genreId}).$promise;
        }).then(function(genre) {
            vm.genres.push(genre);
        });
        vm.actors = Actor.query();
        vm.pictures = Picture.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.movie.id !== null) {
                Movie.update(vm.movie, onSaveSuccess, onSaveError);
            } else {
                Movie.save(vm.movie, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('vmwebApp:movieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
