
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;


$(".btn").click(function(){
 
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  
});

$(document).keypress(function(event){
  if(!start && event.key == 'a') {
    nextSequence();
    start = true;
  }

});
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  $("h1").text("level " + level);
  level++;

  userClickedPattern = [];
  

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  $("#"+currentColour).addClass("pressed");
  setTimeout(()=>{ $("#" + currentColour).removeClass("pressed");} , 100);

}

function startOver(){
  level = 0;
  start = false;
  gamePattern = [];

}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length) {
        setTimeout(nextSequence,1000);
        userClickedPattern=[];
    }
  }
  else {
    console.log("wrong");
    $('#level-title').text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $(document).keypress(function(){
      startOver();
    })
  }
}