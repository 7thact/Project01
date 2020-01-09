// HTML Variables
var h1 = $("h1");
var container = $('.container');
var eventForm = $("form")

// Time Variables:
var now;
var nowUTC;
var nowDateTime;
var selectedDate;

// Ticketmaster Variables
var nextBtn = $("#next");
var prevBtn = $("#prev");
var typeEvent = $("#segment").val();
var price = $("#price").val();
var queryDate = $("#date").val();
var startDate = 0;
var ticketMasterAPIKey = 'OIxE4IaaAdswnN3Q9eeEnasXqbbJzEnG';
var page = 0;
var size = 10; // Make this dynamic
var storedEvents = {};
var city = "denver";


// Event Listeners
nextBtn.on("click", function(e){
    e.preventDefault();
    page = pageTurn(1, page);
    // Currently run another

    // getEvents(page);

    console.log(page);
})
prevBtn.on("click", function(e){
    e.preventDefault();
    page = pageTurn(-1, page);

    // getEvents(page);

    console.log(page);
});
// API
eventForm.on("submit", function(event){
    event.preventDefault();
    price = $("#price").val();
    queryDate = $("#date").val();
    typeEvent = $("#segment").val();
    page = 0;
    getEvents(page);
});
// Functions
// This function is going to do the heavy lifting with displaying the AJAX call
function dayDisplay(date){
    // I could only get this to work by creating a new div. I would prefer to create this div outside of this dayDisplay, so we can erase it.
    var a2o = $("<div class='row'></div>")
    var exampleH4 = $("<h4>Here is an example header</h4>");
    console.log(exampleH4);
    var exampleImg = $("<img src='https://cdn.pixabay.com/photo/2019/12/30/20/35/snow-4730565_1280.jpg'>")
    var exampleList = $("<ul><li>IDK</li><li>DUDE</li></ul>")
    container.append(a2o);
    a2o.append(exampleH4);
    a2o.append(exampleImg);
    a2o.append(exampleList);
}

function momentConfig(){
    now = moment();
    nowUTC = now.utc(String).format();
    nowDateTime = now.format("LLLL");
    // Find out what format the query takes
    console.log(nowDateTime);
    // currentHour = now.format("kk")
    // now.format("ddd, Do MMMM, YYYY"));
}

function init(){
    h1.text("Plan a date")
    container.hide();
    momentConfig();
};

init();


function getEvents(page) {

    $('#events-panel').show();
    $('#attraction-panel').hide();
    // var latlong = position.coords.latitude + "," + position.coords.longitude;
    queryURL = queryURLFiller(typeEvent, queryDate, price, size, page);


    $.ajax({
      type: "GET",
      url: queryURL, 
      async: true,
      dataType: "json",
      success: function(json) {
            getEvents.json = json;
            console.log(getEvents.json);
            showEvents(json);
      },
      error: function(xhr, status, err) {
            console.log(err);
      }
    });
  }
  

function showEvents(json) {
    var items = $('#events .list-group-item'); // Targeting our HTML
    var events = json._embedded.events; // Events from the call
    container.show();
    var counter = 0
    for (var i = 0; i < events.length; i++) {
        var item = items[i];
        var event = events[i];
        var storedEvent = storedEventsFiller(event);
        // Display
        if (i < items.length){
            renderTile(storedEvent, item);

        };
        $(item).off("click");
        // console.log(event)
        // console.log(event.name)
        storedEvents[i] = storedEvent;
        storedEvents[i].event =  event; // Incase we need more information
        try {
            storedEvents[i].attraction = event._embedded.attractions[0];
        } catch (err) {
            storedEvents[i].attraction = "#";
        }

        // I think I could replace this with event delegation
        $(item).click(events[i], function(eventObject) {

            console.log(eventObject.data);
            try {
                console.log(eventObject.data._embedded.attractions[0].id);
                // getAttraction(eventObject.data._embedded.attractions[0].id);
            } catch (err) {
                console.log(err);
            }
        });
        storedEvents[i].marker = addMarker(event, "yellow");
        counter++;
    };
    // Hide all the boxes
    while ( counter < items.length ){
        console.log(counter)
        items[counter].hide();
        counter++;
    }
    populateMarkers(storedEvents);
};



function queryURLFiller(typeEvent, startDate, price, size, page){
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterAPIKey}`
    if (typeEvent !== "undefined"){
        queryURL += `&classificationName=${typeEvent}`
    };
    console.log(startDate);
    console.log(price);
    // if (startDate !== "0"){
    // var arr = ["2020-03-03","2020-05-20"]
    // "2020-01-12T23:40:00Z"
    // queryURL += `&startDateTime=${}`; //&endDateTime=${};
    // queryURL += `&endDateTime=${}`;
    // };
    console.log(queryURL);
    queryURL += `&size=${size}&page=${page}`;
    queryURL += `&city=${city}`;
    return queryURL;
};


function pageTurn(increment, page){
    // Fix this. Make it so the page turn only works when there are events populated
    if (getEvents.json === undefined){
        return;
    };
    page += increment;
    if (page < 0) {
        page = getEvents.json.page.totalPages - 1;
        return;
      }
    if (page > getEvents.json.page.totalPages - 1) {
        page = 0;
    }
    return page;
};


// REFACTORING   function showEvents(json) {

function storedEventsFiller(event){
    var itemHeadingText = event.name;
    var itemDateText = event.dates.start.localDate;
    var itemVenueText = "";
    try {
        itemVenueText = event._embedded.venues[0].name + " in " + event._embedded.venues[0].city.name;
    } catch (err) {
        console.log(err);
    }
    var storedEvent = {
        "heading": itemHeadingText,
        "date": itemDateText,
        "venue": itemVenueText
    };
    return storedEvent;
};

function renderTile(storedEvent, item){
    $(item).children('.list-group-item-heading').text(storedEvent.heading);
    $(item).children('.list-group-item-text').text(storedEvent.date);
    $(item).children('.venue').text(storedEvent.venue);
    $(item).show();
};

function populateMarkers(storedEvents){
    for (event in storedEvents){
        console.log(storedEvents[event]);
        storedEvents[event].marker.setMap(map);
        
    };
};





// NOT YET IMPLEMENTED
$("#events").on("click", ".list-group-item", function(event){
    event.preventDefault();
    var eventClicked = $(this);
    console.log("Event clicked: ");
    console.log(eventClicked);
    try {
        console.log(storedEvents[index]["attractionObj"].id) // How will I get the index?
        // idea: We search through the key indices in storedEvents.
        // In the indices we see if the key "heading" === $(this).children()
        // getAttraction(eventObject.data._embedded.attractions[0].id);
    } catch (err) {
        console.log(err);
    }
})


// Google Maps Implementation

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         var x = document.getElementById("location");
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

function initMap() {
    // The location of Denver
    var denver = {lat: 39.7392, lng: -104.9903};
    // The map, centered on Denver
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 10, center: denver});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: denver, map: map});
  }


function addMarker(event, color) {
    console.log(event._embedded.venues[0].location.latitude)
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    title: event.name
  });

  marker.setIcon(`http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`);
  return marker;
}



// getLocation();