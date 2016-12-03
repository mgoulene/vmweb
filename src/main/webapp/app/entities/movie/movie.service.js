(function() {
    'use strict';
    angular
        .module('vmwebApp')
        .factory('Movie', Movie);

    Movie.$inject = ['$resource'];

    function Movie ($resource) {
        var resourceUrl =  'vmms/' + 'api/movies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
