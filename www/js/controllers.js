
angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope, $http, $rootScope, $location) {
    $scope.buscaAPI = function(busca2){
        // Simple GET request example:
        var apikey = "f96ebf64-3b89-41fa-b018-e36a625234dc";
        var url = "https://na.api.pvp.net/api/lol/br/v1.4/summoner/by-name/"
        var nome = busca2;
        $rootScope.nome = busca2;
        console.log(nome);
        var resto_da_url = "?api_key=";
        var url_get = url + nome + resto_da_url + apikey;
        $http.get(url_get).then(function successCallback(response) {
            //$scope.buscou = true;
            //console.log(response.data);
            var data = response.data[busca2];
            $scope.data = data;
            $rootScope.sumonnerId = data.id;
            $rootScope.iconId = data.profileIconId
            
            $scope.buscaChampions();
            
            
            
            
        }, function errorCallback(response) {
            alert(JSON.stringify(response));
        });
    };
    
    $scope.buscaChampions = function(){
        // Simple GET request example:
        var apikey = "f96ebf64-3b89-41fa-b018-e36a625234dc";
        var url = "https://global.api.pvp.net/api/lol/static-data/br/v1.2/champion?api_key="+apikey;
        $http.get(url).then(function successCallback(response) {
            //$scope.buscou = true;
            //console.log(response.data.data);
            $scope.data = response.data;
            var data = response.data.data;
            var tamanhodata = Object.keys(data).length;
            var keys = Object.keys(data);
            var champions = {};
            for(var i=0;i<tamanhodata;i++){
                var nome = keys[i];
                var id = data[nome].id;
                champions[id] = nome;
            }
            $rootScope.champions = champions;
            
            $scope.buscaMatch();
            console.log(champions);
        }, function errorCallback(response) {
            alert(JSON.stringify(response));
        });
    };
    
    $scope.buscaMatch = function(){
        // Simple GET request example:
        var apikey = "f96ebf64-3b89-41fa-b018-e36a625234dc";
        var id = $rootScope.sumonnerId;
        
        console.log(id);
        var url = "https://br.api.pvp.net/api/lol/br/v2.2/matchlist/by-summoner/"+id+"?api_key="+apikey;
        $http.get(url).then(function successCallback(response) {
            //$scope.buscou = true;
            console.log(response.data);
             $rootScope.data = [];
             for(var i = 0; i < response.data.matches.length; i++){
                
                $rootScope.data.push({"lane":response.data.matches[i].lane, "champion": $rootScope.champions[response.data.matches[i].champion]});
            }
            $location.path('/page3');
            
        }, function errorCallback(response) {
            alert(JSON.stringify(response));
            
        });
    };
    

})

.controller('pageCtrl', function($scope, $rootScope, $http) {
    console.log($rootScope.sumonnerId);
    console.log($rootScope.nome);
    var url = "https://ddragon.leagueoflegends.com/cdn/6.2.1/img/profileicon/";
    var iconId = $rootScope.iconId;
    //console.log(iconId);
    var ext = ".png";
    var fullurl = url + iconId + ext;
    $scope.fullurl = fullurl;
    $scope.champions = $rootScope.champions;
    $scope.data = $rootScope.data;


})
   
.controller('partidaCtrl', function($scope, $rootScope) {
    
})