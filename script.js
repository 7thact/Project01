// HTML Variables
var h1 = $("h1");
var container = $('.container');
var eventForm = $("form")

// Time Variables:
var now;
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
function renderPage(situation){
    switch(situation){
        case "start":
            console.log("start")
            h1.text("Plan a date")
            // These currently don't exist but they will in the future
            // q1.attr("style", "display: box"); // Displaying
            // q2i.css("display", "none");
            // q2o.css("display", "none");
            break;

        default:
            console.log("Default")
            h1.text("Plan a date")
            // These currently don't exist but they will in the future
            // q1.attr("style", "display: box"); // Displaying
            // q2i.css("display", "none");
            // q2o.css("display", "none");
            break;
    }

}
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
    nowDateTime = now.format("LLLL");
    // Find out what format the query takes
    console.log(nowDateTime);
    // currentHour = now.format("kk")
    // now.format("ddd, Do MMMM, YYYY"));
}

function init(){
    renderPage("start");
    momentConfig();
};

init();


function getEvents(page) {

    $('#events-panel').show();
    $('#attraction-panel').hide();

    queryURL = queryURLFiller(typeEvent, startDate, price, size, page);


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
      items.hide();
      var events = json._embedded.events; // Events from the call
      console.log("In showEvents, here are the json._embedded.events:")
      console.log(events);
      var item = items.first();
    for (var i = 0; i < events.length; i++) {
        var item = items[i];
        $(item).children('.list-group-item-heading').text(events[i].name);
        $(item).children('.list-group-item-text').text(events[i].dates.start.localDate);
        try {
            $(item).children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
        } catch (err) {
            console.log(err);
        }
        $(item).show();
        $(item).off("click");
        // Clicking functionality for each of the items
        $(item).click(events[i], function(eventObject) {

            console.log(eventObject.data);
            try {
                console.log(eventObject.data._embedded.attractions[0].id);
                // getAttraction(eventObject.data._embedded.attractions[0].id);
            } catch (err) {
                console.log(err);
            }
        });
    };
};



function queryURLFiller(typeEvent, startDate, price, size, page){
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterAPIKey}`
    if (typeEvent !== "undefined"){
        queryURL += `&classificationName=${typeEvent}`
    };
    //if (startDate !== 0){
    // queryURL += `&startDateTime=${startDate}`; //&endDateTime=${}
    // Figure out how this works YYYY-MM-DD`
    //}
    queryURL += `&size=${size}&page=${page}`;
    return queryURL;
};


function pageTurn(increment, page){
    // Fix this. Make it so the page turn only works when there are events populated
    // if (getEvents.json === undefined){
    //     return;
    // };
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

