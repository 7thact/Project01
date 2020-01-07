function getEvents(page) { //talk to charles
    var page = 0; //api variable
    var cityName= Denver;
    var size = 4;
    var userMaxPrice;

    $('#events-panel').show();
    $('#attraction-panel').hide();

    if (page < 0) {
        page = 0;
        return;
    }
    if (page > 0) {
        if (page > getEvents.json.page.totalPages - 1) {
            page = 0;
        }

        $.ajax({
            type: "GET",
            url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${cityName}&size=4&page=${page}`,
            async: true,
            dataType: "json",
            success: function (json) {
                getEvents.json = json;
                showEvents(json);
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
    function showEvents(json) { //talk to charles about items
        var items = $('#events .list-group-item');
        items.hide();
        var events = json._embedded.events;
        var item = items.first();
        for (var i=0;i<events.length;i++) {
          item.children('.list-group-item-heading').text(events[i].name); // name of event
          item.children('.list-group-item-text').text(events[i].dates.start.localDate); //date of the event
          try {
            item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name); //venue, display venue and city if exists
          } catch (err) {
            console.log(err);
          }
          item.show(); //displaying on the page
          item.off("click");//removes all event handlers"click event"
          item.click(events[i], function(eventObject) { //setting a click event to the element we are creating
            console.log(eventObject.data); //logging the data associtated with the click 
            try {
              getAttraction(eventObject.data._embedded.attractions[0].id); //run the function get attraction
            } catch (err) {
            console.log(err);
            }
          });
          item=item.next(); //move to the next item
        }
      }
$(document).ready(function() {
    console.log ("jquery is loaded!")
    function price(priceRanges) {
        var URL = `https://app.ticketmaster.com/discovery/v2/events.json?city=denver&price=${priceRanges}&apikey=${API_KEY}`
        console.log(URL);
        $.ajax({
        type:"GET",
        url:URL,
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                    // Parse the response.
                    // Do other things.
             },
        error: function(xhr, status, err) {
                   console.log(err);
            // This time, we do not end up here!
                 }
      });
    }
    price({
        min: 0,
        max: userMaxPrice,//userInput
    });
// })
// function dates(dates) {
//     var URL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationNamedates=${dates}&apikey=${API_KEY}`
//     console.log(URL);
//     $.ajax({
//     type:"GET",
//     url:URL,
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//          },
//     error: function(xhr, status, err) {
//                console.log(err);
//         // This time, we do not end up here!
//          dates({
//              start: userInput,
//              end: userInput
//          }).then(function(response) {
//     // Create a new table row element
//     var card1 = $("<card>");

//     // Methods run on jQuery selectors return the selector they we run on
//     // This is why we can create and save a reference to a td in the same statement we update its text
//     var titleCard = $("<card>").text(response.date);
//     var yearCard = $("<card>").text(response.Year);


//     // Append the newly created table data to the table row
//     card1.append(titleTd, yearTd);
//     // Append the table row to the table body
//     $("cBody").append(card1);
//   });
// }
    