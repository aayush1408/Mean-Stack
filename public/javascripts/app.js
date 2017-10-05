var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.       
    when('/',{        //has our server gets opened we visit the todo.html page
        templateUrl:'../todo.html',
        controller:'myController'
    })
    .otherwise({
        redirectTo:'../todo.html'
    });
}]);

myApp.controller('myController',['$scope','$http',function($scope,$http){

    //code
     $scope.task={};     //object
   //adding the data function
        $scope.add = function(){     //add function to be called on ng-submit
            console.log($scope.task);       //task.text is the formData(containiig all the entries of any given form)
        $http({
          method: 'POST',       //POST method
          url: '/api',        //url of the route in express for post method
          data:$scope.task        //we passs the object
          }).then(function (success){       //after success
            $scope.todos = success.data;       //we store the data of success in todos
            $scope.task = { };                       //empty the field
         },
         function (error){
            console.log(error);
        });
};

    //reading the data
    $http({
        method:'GET',  //GET request
        url:'/api'   //passing the url that is in the express routes 
       }).then(successCallback,errorCallback);   //passing 2 callbacks
    function successCallback(doc){     //doc is the json file which has the request,status,data and the headers 
        console.log(doc);        
        $scope.todos = doc.data;             //we need data(i.e is required) from the doc that json object and store the data in todos
    }
    function errorCallback(){
        console.log('Error in the get');          //if error
    }

//deleting the data
     $scope.remove = function(id){
        $http({

            method:'GET',          //GET method
            url:'api/delete/'+id       //pass the id like this insead of params
         }).then(successCallback,errorCallback);   //2 callbacks
        function successCallback(doc){
            $scope.todos = doc.data;    //adding the recieved data in todos(container of all the data)
        }
        function errorCallback(doc){     //Error callback
            console.log(id);
            console.log('Delete');
        }
    }; 

  
  }]);
