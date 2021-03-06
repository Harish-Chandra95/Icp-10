angular.module('myhome', ['naif.base64']).controller('home', function($scope,$http,$window){

  $scope.imageUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.imageIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.imageIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("img").src = e.target.result;
      document.getElementById("img").style.removeProperty("display");
    });
  }

  $scope.faceUpload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.faceIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.faceIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("face").src = e.target.result;
      document.getElementById("face").style.removeProperty("display");
    });
  }



  $scope.upload = function(file) {
    var fname = file.base64;
    var itemList = "";

    const app = new Clarifai.App({apiKey: 'c180af2d90164e15b1170fc75f85af25'});
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: fname}).then(

      function(response) {
        console.log(response);
        console.log(response.outputs[0].data.concepts[0].name);
        console.log(response.outputs[0].data.concepts.length);

        for (var i = 0; i < 10;i++) {
          var temp = response.outputs[0].data.concepts[i].name;
          itemList = itemList+ temp +"<br/>";

        }
        document.getElementById("notes").innerHTML =itemList;
      }

    );
  }




});
