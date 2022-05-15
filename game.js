
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
initGame();

$(document).keypress(function(event) {
    if (!started && event.key === "a") {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        playSound("wrong");
        gameOver();
        changeTitle("Game Over, Press A Key to Restart");
        initGame();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var currentColorId = "#" + currentColor;
    $(currentColorId).addClass("pressed");

    setTimeout(function () {
      $(currentColorId).removeClass("pressed");
    }, 100);
}

function gameOver() {
    var bodyId = "body";
    $(bodyId).addClass("game-over");

    setTimeout(function () {
      $(bodyId).removeClass("game-over");
    }, 800);
}

function changeTitle(newTitle){
    $("h1").text(newTitle);
}

function initGame() {
    level = 0;
    gamePattern = [];
    started = false;
}