var outBtn = $(".out>h3");
var inBtn = $(".in>h3");

outBtn.on("click", function(event){
    event.preventDefault();
    console.log("working bro");
});
inBtn.on("click", function(event){
    event.preventDefault();
    console.log("working brah");
});

