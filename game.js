var level = 0;
var userClickedPattern = [];
var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    
}
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        $(".user-num h2").text(userClickedPattern.length)
        if(currentLevel === gamePattern.length -1)
        {
            
            setTimeout(function() {
                nextSequence();
                $(".user-num h2").text("0")
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        $(".user-num h2").text("XX")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() 
{
    var randomNumber = Math.random();
    randomNumber = randomNumber* 4;
    randomNumber = Math.floor(randomNumber);

    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    
    $("h1").text("level " + level);
    $(".game-num h2").text(gamePattern.length)
};

$(".btn").click( function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
} );

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
//start game by clicking a keyboard button anywhere
var started = false;

$("body").keydown(function() {
    if(!started){
        $(".user-num h2").text("--")
        nextSequence();
    }
    started = true;
    
})