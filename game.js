var button_colors=["red","blue","green","yellow"];
var gamepattern=[];
var user_clicked_pattern=[]
var random_number,random_choosen_color,level=0;
var start=false;

$(document).keypress(function(){
    if(!start)
    {
        $("#level-title").text("Level " + level);
        nextsequence();
        start = true;
    }
});
$(".btn").click(function(){
    var user_choosen_color=$(this).attr("id");
    user_clicked_pattern.push(user_choosen_color);
    animatepress(user_choosen_color);
    playsound(user_choosen_color);
    checkans(user_clicked_pattern.length-1);
});

function nextsequence()
{
    user_clicked_pattern=[];
    if(level!=0)
    {
        $("#level-title").text("Level " + level);
    }
    level++;
    random_number=Math.random();
    random_number=Math.floor(random_number*4);
    random_choosen_color=button_colors[random_number];
gamepattern.push(random_choosen_color);
$("#"+random_choosen_color).fadeTo(50, 0.3, function() { $(this).fadeTo(500, 1.0); });
playsound(random_choosen_color);

}

function playsound(name)
{
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatepress(currentcolor) {
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function() {$("#"+currentcolor).removeClass("pressed");}, 100);
}
function checkans(cuurrentlevel)
{ 
    var i;
    if(user_clicked_pattern[cuurrentlevel]==gamepattern[cuurrentlevel])
    {
        console.log("success");
        if(user_clicked_pattern.length==gamepattern.length)
        {
            
            setTimeout(function () {
                nextsequence();
              }, 1000);
        }
    }
    else
    {
        console.log("wrong");
        var wrong_audio=new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startover();
    }
}
function startover()
{
    level=0;
    gamepattern=[];
    start=false;
}





