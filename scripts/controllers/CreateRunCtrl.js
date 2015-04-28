angular.module('MainApp')
  .controller('CreateRunCtrl', function ($scope, $timeout, $modalInstance, $firebase, $sce) {
    var url = "https://snowsnorkelers.firebaseio.com/events";
    var RunsRef = new Firebase(url);
    $scope.runs = $firebase(RunsRef).$asArray();

    var d = new Date();
    d.setHours(5);
    d.setMinutes(30);

    $scope.run = {};
    $scope.tempTime = d.getTime();
    // $scope.run.dateTime = d.getTime();

    $scope.hrStep = 1;
    $scope.minStep = 15;
    $scope.ismeridian = true;

    $scope.minDate = new Date();

    $scope.isCollapsed = true;

    // $scope.changed = function () {

    // };

    $scope.locations = $firebase(new Firebase("https://snowsnorkelers.firebaseio.com/locations")).$asArray();
    $scope.newLocationName = "";
    $scope.hasSaveError = false;

    $scope.showNewLocation = function () {
      $scope.hasSaveError = false;
      $scope.isNewLocationVisible = !$scope.isNewLocationVisible;
      if ($scope.isNewLocationVisible) {
        //Create google map for a new location
        var map, mapOptions, infoContent, infoWindow, userMarker;
        //Custom Marker
        $scope.newLocationCoordinates = new google.maps.LatLng(40.887769, -111.9104205);
        mapOptions = {
          center: $scope.newLocationCoordinates,
          zoom: 12
        };
        map = new google.maps.Map(document.getElementById('map-new-location'), mapOptions);
        infoContent  = '<h4>' + $scope.newLocationCoordinates.lat() + ', ' + $scope.newLocationCoordinates.lng() + '</h4>';
        infoWindow = new google.maps.InfoWindow({
          content: infoContent
        });

        userMarker = new google.maps.Marker({
          position: map.center,
          map: map,
          draggable: true
        });

        google.maps.event.addListener(userMarker, 'click', function () {
          infoWindow.open(map, userMarker);
        });

        google.maps.event.addListener(userMarker, 'dragend', function (event) {
          $scope.newLocationCoordinates = event.latLng;
        });

        google.maps.event.addListener(map, 'click', function (event) {
          console.log(event.latLng.lat() + ', ' + event.latLng.lng());
          $scope.newLocationCoordinates = event.latLng;
          userMarker.setPosition(event.latLng);
          infoContent = '<h4>' + userMarker.position.lat() + ', ' + userMarker.position.lng() + '</h4>';
          infoWindow.content = infoContent;
          map.panTo(userMarker.getPosition());
        });

        $timeout(function () {
          google.maps.event.trigger(map, 'resize');
          map.panTo(userMarker.position);
        });
      }
    };

    $scope.saveNewLocation = function (name) {
      if (name === "") {
        $scope.hasSaveError = true;
        return;
      };
      $scope.hasSaveError = false;
      $scope.run.location = {};
      $scope.run.location.name = name;
      $scope.run.location.latitude = $scope.newLocationCoordinates.lat();
      $scope.run.location.longitude = $scope.newLocationCoordinates.lng();
      $scope.locations.$add($scope.run.location);
      $scope.isNewLocationVisible = false;
    };

    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.createRun = function () {
      console.log($scope.run);

      //Change Date object to timestamp in order to save to Firebase
      // Retrive the right date by creating a new Date(timestamp)
      $scope.run.dateTime = $scope.tempTime.getTime();
      $scope.run.createdBy = "Steve N.";
      $scope.run.location = $scope.selectedLocation;
//       $scope.run.location.url = "https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=mueller+park&aq=&sll=40.985028,-111.910163&sspn=0.09343,0.181961&ie=UTF8&hq=mueller+park&t=m&ll=40.854418,-111.827308&spn=0.026182,0.023943&output=embed";
//       $scope.run.locationUrl = $sce.trustAsResourceUrl($scope.run.location.url);
      $scope.runs.$add($scope.run);
      $modalInstance.close();
    };

    $scope.ok = function () {
      $modalInstance.close("Object returned from OK");
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });