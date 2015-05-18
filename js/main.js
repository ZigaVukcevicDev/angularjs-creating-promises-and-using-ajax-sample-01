angular.module('demo', []);

angular.module('demo').controller('DemoController', function($scope, $http) {
    $http.get('http://smartninja.betoo.si/api/CMW/cars', {}).then(function(response){
        $scope.cars = response.data;

        $http.get('http://smartninja.betoo.si/api/CMW/timeslots', {}).then(function(response){
            var timeslots = response.data;

            for (var timeslot in timeslots) {
                // matching car ids and getting properties
                for (var car in $scope.cars) {
                    if (timeslots[timeslot].carId == $scope.cars[car].id) {
                        timeslots[timeslot].carInfo = $scope.cars[car];
                    }
                } 

                // removing reserved timeslots
                if (timeslots[timeslot].reserved) {
                    timeslots.splice(timeslot, 1);                    
                }
            }

            $scope.timeslots = timeslots;

        }, function(errorResponse){
            alert('ne dela');
        });

    }, function(errorResponse){
        alert('ne dela');
    });

    $scope.poslji = function(id, email) {
        $http.post('http://smartninja.betoo.si/api/CMW/reservations', 
        { timeslotId : id, email : email })
        .then(function(success){ alert('Uspešen post: id: ' +  id + ', email: ' + email) }, function() { alert('Neuspešno') });        
    }
});