// Variables
var h1 = $("h1");
var container = $('.container');
var eventForm = $("form")

// Time Variables:
var now;
var nowDateTime;
var selectedDate;

var ticketMasterAPIKey = 'OIxE4IaaAdswnN3Q9eeEnasXqbbJzEnG';
var page = 0;
var size = 4; // Make this dynamic

// Implement prev and next button

// Event Listeners
// API
eventForm.on("submit", function(event){
    event.preventDefault();
    var price = $("#price").val();
    var queryDate = $("#date").val();
    var segment = $("#segment").val();
    getEvents(page);
    console.log(price);
    console.log(segment);
    console.log(queryDate);
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
  
    if (page < 0) {
      page = 0;
      return;
    }
    if (page > 0) {
      if (page > getEvents.json.page.totalPages-1) {
        page=0;
      }
    }
    
    $.ajax({
      type:"GET",
      url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterAPIKey}&size=${size}&page=${page}`,
      async:true,
      dataType: "json",
      success: function(json) {
            getEvents.json = json;
                  showEvents(json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });
  }

function showEvents(json) {
    var items = $('#events .list-group-item');
    items.hide();
    var events = json._embedded.events;
    var item = items.first();
    for (var i=0;i<events.length;i++) {
        item.children('.list-group-item-heading').text(events[i].name);
        item.children('.list-group-item-text').text(events[i].dates.start.localDate);
        try {
        item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
        } catch (err) {
        console.log(err);
        }
        item.show();
        item.off("click");
        item.click(events[i], function(eventObject) {
        console.log(eventObject.data);
        try {
            console.log(eventObject.data._embedded.attractions[0].id);
            // getAttraction(eventObject.data._embedded.attractions[0].id);
        } catch (err) {
        console.log(err);
        }
        });
        item=item.next();
    }
}
