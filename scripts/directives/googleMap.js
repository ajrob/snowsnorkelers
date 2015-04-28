angular.module('MainApp')
  .directive('googleMap', function () {
    return {
      restrict: 'E',
      scope: {
        location: "=",
        map: "="
      },
      replace: true,
      template: "<div class='map'></div>",
      link: function (scope, element, attrs) {
        var coordinates, map, mapOptions, infoContent, infoWindow;
        if (attrs.type == "dropMarker") {
          // //Custom Marker
          // coordinates = new google.maps.LatLng(40.887769, -111.9104205);
          // mapOptions = {
          //   center: coordinates,
          //   zoom: 12
          // };
          // scope.map = new google.maps.Map(element[0], mapOptions);
          // infoContent  = '<h3>' + coordinates.lat() + ', ' + coordinates.lng() + '</h3>';
          // infoWindow = new google.maps.InfoWindow({
          //   content: infoContent
          // });

          // var userMarker = new google.maps.Marker({
          //   position: scope.map.center,
          //   map: scope.map,
          //   draggable: true
          // });

          // google.maps.event.addListener(userMarker, 'click', function () {
          //   infoWindow.open(scope.map, userMarker);
          // });

          // google.maps.event.addListener(scope.map, 'click', function (event) {
          //   console.log(event.latLng.lat() + ', ' + event.latLng.lng());
          //   userMarker.setPosition(event.latLng);
          //   infoContent = '<h3>' + userMarker.position.lat() + ', ' + userMarker.position.lng() + '</h3>';
          //   infoWindow.content = infoContent;
          //   scope.map.panTo(userMarker.getPosition());
          // });

          // google.maps.event.addListener(scope.map, 'projection_changed', function () {
          //   console.log('Tiles loaded');
          // });

          // google.maps.event.trigger(scope.map, 'resize');
        } else {
          //Display marker
          infoContent  = '<h3>' + scope.location.name + '</h3>';
          infoWindow = new google.maps.InfoWindow({
            content: infoContent
          });

          coordinates = new google.maps.LatLng(scope.location.latitude, scope.location.longitude);
          mapOptions = {
            center: coordinates,
            zoom: 13
          };

          map = new google.maps.Map(element[0], mapOptions);
          var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: scope.location.name
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
          });
        };
      },
      controller: function ($scope) {
        console.log($scope.location);
      }
    };
  });