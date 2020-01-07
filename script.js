// First Page Variables
var h1 = $("h1");
var q1 = $(".question1");
var outBtn = $(".out");
var inBtn = $(".in");
var container = $('.container');
// Second Page Variables:
// In Variables:
var q2i = $(".question2i");
var movieForm = $("form")
// Out Variables:
var q2o = $(".question2o");

// Event Listeners
outBtn.on("click", function(event){
    event.preventDefault();
    var situation = $(this).attr("data-choice") + 1;
    renderPage(situation);
});
inBtn.on("click", function(event){
    event.preventDefault();
    var situation = $(this).attr("data-choice") + 1;
    renderPage(situation);
});

movieForm.on("submit", function(event){
    event.preventDefault();
    console.log("Submitted the movie");
})
// Ajax call for an Out event here
q2o.on("click", "button", function(event){
    event.preventDefault();
    var day = $(this).val();
    console.log(day);
    var situation = "daySelected";
    renderPage(situation);
    dayDisplay(day);
});
// Functions
function renderPage(situation){
    switch(situation){
        case "start":
            console.log("start")
            h1.text("Do you want to:")
            q1.attr("style", "display: box"); // Displaying
            q2i.css("display", "none");
            q2o.css("display", "none");
            break;

        case "out1":
            console.log("out1")
            h1.text("What day are you planning for?")
            q1.css("display", "none");
            q2i.css("display", "none");
            q2o.attr("style", "display: box"); // Displaying
            break;

        case "daySelected":
            console.log("daySelected")
            h1.text("Things to do:");
            q1.css("display", "none");
            q2i.css("display", "none");
            q2o.css("display", "none");
            break;

        case "in1":
            console.log("in1")
            h1.text("What movie do you feel like watching?")
            q1.css("display", "none");
            q2i.attr("style", "display: box"); // Displaying
            q2o.css("display", "none");
            break;

        default:
            console.log("Default")
            h1.text("Do you want to:")
            q1.attr("style", "display: box"); // Displaying
            q2i.css("display", "none");
            q2o.css("display", "none");
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

function init(){
    renderPage("start");
};

init();