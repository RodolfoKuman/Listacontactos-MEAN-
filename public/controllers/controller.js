var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  var refresh = function(){
    $http.get('/contactos').success(function(response){
      console.log('Obtengo los datos de la peticion');
      $scope.contactos = response;
      $scope.contact = "";
    });
  };

refresh();

  $scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactos', $scope.contact).success(function(response){
      console.log(response);
      refresh();
    });
  };


  $scope.remove = function(id){
    console.log(id);
    $http.delete('/contact/' + id).success(function(response){
        refresh();
    });
  };

  $scope.edit = function(id){
    console.log(id);
    $http.get('/contact/' + id).success(function(response){
        $scope.contact = response;
    });
  };

  $scope.update = function(id){
    $http.put('/contact/' + $scope.contact._id, $scope.contact).success(function(response){
        refresh();
    });
  };

  $scope.clear = function(){
    $scope.contact = "";
  };


}]);
