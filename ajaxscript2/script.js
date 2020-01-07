// $(document).ready(function(){
//     console.log ("jquery is loaded!")
//     function ticketmaster(size){
//         var URL = `https://app.ticketmaster.com/discovery/v2/events.json?size=${size}&apikey=${API_KEY}`
//         $.ajax({
//         type:"GET",
//         url:URL,
//         async:true,
//         dataType: "json",
//         success: function(json) {
//                     console.log(json);
//                     // Parse the response.
//                     // Do other things.
//              },
//         error: function(xhr, status, err) {
//                    console.log(err);
//             // This time, we do not end up here!
//                  }
//       });
//     }
//     var otherSize = prompt("how many events do you want to search for?")
//     ticketmaster(otherSize);
// }) 

var city= ["Denver"]

for ()

function ticketmaster(){
    var URL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=Denver&apikey=${API_KEY}`
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
console.log(this)



