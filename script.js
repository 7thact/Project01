// First Page Variables
var h1 = $("h1");
var q1 = $(".question1");
var outBtn = $(".out");
var inBtn = $(".in");
// Second Page Variables:
// In Variables:
var q2i = $(".question2i");
// Out Variables:
var q2o = $(".question2o");

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

        case "in1":
            console.log("in1")
            h1.text("What movie do you feel like watching?")
            q1.css("display", "none");
            q2i.attr("style", "display: box"); // Displaying
            q2o.css("display", "none");
            break;

    }

}

function init(){
    renderPage("start");
};

init();