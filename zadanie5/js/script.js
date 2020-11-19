/*
    Javascript for Google Map for 5th Lab from Website Technologies
    Copyright Samuel Adler - 2020
*/

/*
    Global variables
*/

let theMap, Window,directionsService,displayDirections,theStreet;
let Topped = false, Mode = false;
let destPos;
let theMainPosition;
/*
    Functions
 */

function myMap()
{
    theMainPosition = new google.maps.LatLng(48.15185320000001, 17.073344700000007);
    theMap = new google.maps.Map(document.getElementById('map'), {
        streetViewControl: false,
        zoom: 16,
        center: theMainPosition
    });

    theStreet = new google.maps.StreetViewPanorama(document.getElementById('street'), {
        position: theMainPosition,
        zoom: 1
    });

    let textMark = new google.maps.InfoWindow({
        content: 'Latitude: 48.15185320000001 <br>Longitude: 17.073344700000007 <br> Fakulta Elektrotechniky a Informatiky <br> Slovenská Technická Univerzita'
    });

    let myMarker = new google.maps.Marker({
        position: theMainPosition,
        map: theMap,
        icon: {
            url: "pics/map.png",
            scaledSize: new google.maps.Size(40, 53),
            labelOrigin: new google.maps.Point(30, 70),
        },
        label: {
            text: "STU FEI",
            color: "#18ab29",
            fontWeight: "bold"
        }
    });

    theMap.addListener('click', function(){
        textMark.close(theMap, myMarker);
        Window.close(theMap, myMarker);
        Topped = false;
    });

    myMarker.addListener('click', function(){
        if(Topped)
        {
            textMark.close(theMap, myMarker);
            Topped = false;
        }
        else
        {
            textMark.open(theMap, myMarker);
            Topped = true;
        }
    });

    let searchButtonVar = new google.maps.places.SearchBox(document.getElementById('searchStop'));

    theMap.addListener('bounds_changed', function(){
        searchButtonVar.setBounds(theMap.getBounds());
    });

    searchButtonVar.addListener('places_changed', function(){
        let allPlaces = searchButtonVar.getPlaces();
        let bounds = new google.maps.LatLngBounds();

        allPlaces.forEach(function(allPlaces){
            if (allPlaces.geometry.viewport)
            {
                bounds.union(allPlaces.geometry.viewport);
            }
            else {
                bounds.extend(allPlaces.geometry.location);
            }
        });

        //theMap.fitBounds(bounds);
        destPos = bounds.getCenter();

        if(displayDirections != null)
        {
            displayDirections.setMap(null);
            displayDirections = null;
        }

        directionsService = new google.maps.DirectionsService;
        displayDirections = new google.maps.DirectionsRenderer({
            map: theMap
        });
    });
}

function findStop()
{
    let req = {
        location: theMainPosition,
        radius: 1000,
        type: ['transit_station']
    }

    Window = new google.maps.InfoWindow();
    let theService = new google.maps.places.PlacesService(theMap);

    theService.nearbySearch(req, printStops);
}

function createTheMarker(place)
{
    let theLocation = place.geometry.location;
    let theMarker = new google.maps.Marker({
        map: theMap,
        position: theLocation,
        animation: google.maps.Animation.BOUNCE,
        icon: {
            url: "pics/bus.png",
            scaledSize: new google.maps.Size(20, 31)
        }
    });

    google.maps.event.addListener(theMarker, 'click', function(){
        Window.setContent(place.name);
        Window.open(theMap, this);
    });
}

function printStops(results, status)
{
    if(status === google.maps.places.PlacesServiceStatus.OK)
    {
        for(let i = 0; i < results.length; i++)
        {
            createTheMarker(results[i]);
        }
    }
}

function displayTheRoad()
{
    if(Mode)
    {
        directionsService.route({
            origin: theMainPosition,
            destination: destPos,
            travelMode: 'WALKING'
        }, function(response, status){
            if(status === google.maps.DirectionsStatus.OK){
                displayDirections.setDirections(response);
                $('.pDistance span').html(response.routes[0].legs[0].distance.value / 1000);
            }
        });
    }
    else
    {
        directionsService.route({
            origin: theMainPosition,
            destination: destPos,
            travelMode: 'DRIVING'
        }, function(response, status){
            if(status === google.maps.DirectionsStatus.OK){
                displayDirections.setDirections(response);
                $('.pDistance span').html(response.routes[0].legs[0].distance.value / 1000);
            }
        });
    }
}

function findRoute()
{
    displayTheRoad();
}

function travelByCar()
{
    Mode = false;
}

function travelByFoot()
{
    Mode = true;
}