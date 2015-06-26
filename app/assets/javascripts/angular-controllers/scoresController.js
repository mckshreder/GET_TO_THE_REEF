angular.module("scoresApp")
    .controller('ScoresController', ScoresController);

ScoresController.$inject = ['$http'];

function ScoresController($http) {
    var self = this;
    self.getScores = function () {
        return $http({
            method: 'GET',
            url: "/api/scores"
        })
            .success(function (data) {
                console.log('success');
                self.jsonScores = data;
            })
            .error(function (data) {
                console.log('error!');
            });
    };
}
