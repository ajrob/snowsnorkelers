angular.module('MainApp')
  .controller('MainCtrl', function ($scope, $firebase, $modal, $log, $state, RunService) {
    // $scope.upcomingRuns = RunsRef.orderByChild("dateTime").startAt(currentTime).on("child_added", function (snapshot) {
    //   console.log(snapshot);
    // });
    // var RunsRef = new Firebase("https://snowsnorkelers.firebaseio.com/events");
    // var currentTime = new Date().getTime();
    // $scope.upcomingRuns = $firebase(RunsRef.orderByChild("dateTime").startAt(currentTime)).$asArray();
    // $scope.pastRuns = $firebase(RunsRef.orderByChild("dateTime").endAt(currentTime)).$asArray();

    // var nextRun = $firebase(RunsRef.orderByChild("dateTime").startAt(currentTime).limitToFirst(1)).$asArray();
    // nextRun.$loaded().then(function () {
    //   $state.go('home.run', { id: nextRun[0].$id });
    // });

    $scope.upcomingRuns = RunService.getUpcomingRuns();
    $scope.pastRuns = RunService.getPastRuns();

    $scope.title = "Next Run";

    $scope.nextRun = RunService.getNextRun();

    

    $scope.showCreateRunModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/createRun.html',
        controller: 'CreateRunCtrl'
      });

      modalInstance.result.then(function (item) {
        console.log(item);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // $scope.data.$add({
    //   title: "This is the title",
    //   date: "date"
    // });

    // console.log($scope.data);

    // $scope.run = {
    //   formattedDate: new Date().toJSON().slice(0,10)
    // };

    //Create an run
    // $scope.createRun = function (argument) {
    // };
  });