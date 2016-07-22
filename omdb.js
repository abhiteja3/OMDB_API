/**
 * Created by abhitej on 7/21/16.
 */
var app = angular.module('omdbApi',['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'omdb.html',
        controller: 'movieSearchCtrl'
    })
        .when('/:id', {
            templateUrl: 'movie.html',
            controller: 'movieDetailCtrl'
        })
        .otherwise({redirectTo: '/'});

});

app.factory('movielist',function($http){

});
app.controller('movieSearchCtrl',['$scope','$http','$location', function($scope,$http,$location) {
    $scope.searchParam = '';
    $scope.titleSearch = function () {
        $http.get('http://www.omdbapi.com/', {
            params: {s: $scope.searchParam, type: 'movie', r: 'json'}
        }).success(function (response) {
            if (response.Search) {
                // success
                $('.results').css('display', 'block');
                $('.noresults').css('display', 'none');

            var results = response.Search;
            $scope.movieResults = results;
            }else {
                //error, movie not found
                console.log("not found");
                $('.results').css('display', 'none');
                $('.noresults').css('display', 'block');
                $('.noresults').html("<strong>No results found.</strong>");
            }
        })
    };
    $scope.movieDetail = function(id) {
        $location.url('/' + id);
    }
}]);

app.controller('movieDetailCtrl',['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams){
    $scope.routeId = $routeParams.id;
    console.log($scope.routeId);
            $http.get('http://www.omdbapi.com/',{
                params: {i: $routeParams.id,plot: 'full',r: 'json'}
            }).success(function(data){
                var stuff = data;
                $scope.movieStuff = stuff;
                console.log(stuff);
            }).error(function(data,status) {
                $scope.errorstatus = data;
                console.log($scope.errorstatus);
            });
    $scope.back = function() {
        $location.url('/');
    };

}]);
