(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('ActorDialogController', ActorDialogController);

    ActorDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Actor', 'Person', 'Movie'];

    function ActorDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Actor, Person, Movie) {
        var vm = this;

        vm.actor = entity;
        vm.clear = clear;
        vm.save = save;
        vm.people = Person.query({filter: 'actor-is-null'});
        $q.all([vm.actor.$promise, vm.people.$promise]).then(function() {
            if (!vm.actor.personId) {
                return $q.reject();
            }
            return Person.get({id : vm.actor.personId}).$promise;
        }).then(function(person) {
            vm.people.push(person);
        });
        vm.movies = Movie.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.actor.id !== null) {
                Actor.update(vm.actor, onSaveSuccess, onSaveError);
            } else {
                Actor.save(vm.actor, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('vmwebApp:actorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
