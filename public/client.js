

$(document).ready(function(){
  $(".background").each(function(){
   $(this).css("width", window.innerWidth);
  $(this).css("height", window.innerHeight);
  });
});

$( window ).resize(function() {
  $(".background").each(function(){
   $(this).css("width", window.innerWidth);
  $(this).css("height", window.innerHeight);
  });
});

var app = angular.module("liz", []);


app.controller('lizCtl', function($scope){
  $scope.port = [{"Title": "TEST"}];
  $scope.skills = [];

  //background controls:
  $scope.bgs = ["/img/pinkbg.svg",
                "/img/greenbg.svg",
                "/img/orangebg.svg"];
  $scope.cone = 0;
  $scope.ctwo = 1;
  $scope.bgone = $scope.bgs[$scope.cone % $scope.bgs.length];
  $scope.bgtwo = $scope.bgs[$scope.ctwo % $scope.bgs.length];
  $scope.counter = 0;
  $scope.increment = function(){
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $scope.counter = $scope.counter + 1;
    $scope.cone = $scope.cone + ($scope.counter % 2);
    $scope.ctwo = $scope.ctwo + 1 - ($scope.counter % 2);
    $scope.cone = $scope.cone % $scope.bgs.length;
    $scope.ctwo = $scope.ctwo % $scope.bgs.length;
    if ($scope.cone == $scope.ctwo){
      $scope.cone = $scope.cone = $scope.cone + 1;
    }
    $scope.bgone = $scope.bgs[$scope.cone];
    $scope.bgtwo = $scope.bgs[$scope.ctwo];
    //will change to a watch function
    //console.log("Increment:", $scope.cone, $scope.bgone);
    //$scope.$apply();
  }



  //gets information:
  $.getJSON({
    url: "/portfolio",
    success: function(data){
      console.log("Loaded portfolio");
      console.log(data);
      $scope.port = data;
      $scope.$apply();
    },
    failure: function(){
      console.log("Failed to load data");
    }
  });
  $.getJSON({
    url: "/skills",
    success: function(data){
     $scope.skills = data;
      console.log("Loaded skills");
      console.log($scope.skills);
      $scope.$apply();
    }
  })

  //nav controls
  $scope.frontPage = true;
  $scope.skillPage = false;
  $scope.workPage = false;

  $scope.navSkills = function(){
    $scope.frontPage = false;
    $scope.skillPage = true;
    $scope.workPage = false;
    $scope.increment();
  }

  $scope.navWork = function(){
    $scope.frontPage = false;
    $scope.skillPage = false;
    $scope.workPage = true;
    $scope.increment();
  }

  $scope.navHome = function(){
    $scope.frontPage = true;
    $scope.skillPage = false;
    $scope.workPage = false;
    $scope.increment();
  }

  $scope.getOrder = function(entry){
    //console.log("Ordering", entry);
    if (entry != undefined){
      return entry['Project']['Order'];
    }
  }

  $scope.workStuffStyle = function(y){
    //console.log(y);
    var col = workStyle();
    if ('Image' in y){

      //dumb workaround >:(
      if (window.innerWidth > 700){
        return {width:"auto", "display":"inline-block", "margin-right":"40%"};
      }
      else{
        return {width:"auto", "display":"inline-block"};
      }
    }
  
  }

  $scope.colors = ["#41B207", "#B24D00", "#1822B2"];

  $scope.workStyle = function(){
    var x=Math.round(0xffffff * Math.random()).toString(16);
    var y=(6-x.length);
    var z="000000";
    var z1 = z.substring(0,y);
    var color= "#" + z1 + x;
    var n = Math.floor($scope.colors.length * Math.random());
    var bgcolor = $scope.colors[n];
    return {"border-color": color, "background": bgcolor};
  }
});
