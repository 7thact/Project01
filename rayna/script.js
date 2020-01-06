$(document).ready(function(){
    console.log ("jquery is loaded!")
    var URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${API_KEY}`
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
}) 