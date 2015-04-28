angular.module('MainApp')
  .factory('RunService', function ($firebase, $q) {
    var i = 0;
    var runs = {};
    var URL = "https://snowsnorkelers.firebaseio.com/events";
    var RunsRef = new Firebase(URL);
    var _currentTime = new Date().getTime();
    var _upcomingRuns = $firebase(RunsRef.orderByChild("dateTime").startAt(_currentTime)).$asArray();
    var _pastRuns = $firebase(RunsRef.orderByChild("dateTime").endAt(_currentTime)).$asArray();
    var _allRuns = $firebase(RunsRef).$asArray();
    var _nextRun = $firebase(RunsRef.orderByChild("dateTime").startAt(_currentTime).limitToFirst(1)).$asObject();
    var _lookup = {};

    var _generateLookup = function () {
      for (i = _allRuns.length - 1; i >= 0; i--) {
        _lookup[_allRuns[i].$id] = _allRuns[i];
      }
    };

    //Watch for changes to the data, then regenerate the lookup array
    _allRuns.$watch(function () {
      _generateLookup();
    });

    _upcomingRuns.$watch(function () {
      _generateLookup();
    });

    _pastRuns.$watch(function () {
      _generateLookup();
    });

    runs.getUpcomingRuns = function () {
      return _upcomingRuns;
    };

    runs.getPastRuns = function () {
      return _pastRuns;
    };

    runs.getNextRun = function () {
      return _nextRun;
    };

    runs.lookupById = function (id) {
      var deferred = $q.defer();
      _allRuns.$loaded().then(function () {
        deferred.resolve(_lookup[id]);
      });
      return deferred.promise;
    };

    return runs;
  });