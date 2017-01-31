    var origin;
    var destination;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();


// adding google maps searchBox with autofilling
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('txtOrigin'));
        new google.maps.places.SearchBox(document.getElementById('txtDestination'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });
     $('#asd').change(function () {
        var modeSelect = $(this).find("option:selected").text();
        });

    function GetRoute () {
      var modeSelect = $("#mode").find("option:selected").text();
      var Manchester = new google.maps.LatLng(53.483959, -2.244644)
        var settings = {
            zoom: 10,
            center: Manchester
        };
        var map = new google.maps.Map(document.getElementById('map'), settings);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('dvPanel'));

      // Getting direction and route
        var origin = document.getElementById("txtOrigin").value;
        destination = document.getElementById("txtDestination").value;
        var travelModeData = modeSelect;

        var request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[travelModeData]
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        //Distance and time

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode[travelModeData],
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.text;
                var dist = document.getElementById("dist");
                dist.innerHTML = "";
                dist.innerHTML += "Distance: " + distance + "<br />";
                dist.innerHTML += "Time:" + duration;
            } else {
                window.alert("Cannot find distance or toute via selcted travel mode: " + travelModeData);
            }
        });
    }
