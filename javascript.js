var playing = false;
var score;
var timeRemaining;
var action;
var correctAnswer;

//the user clicks on the start/reset
document.getElementById("start").onclick = function () {
  //if the user is playing
  if (playing == true) {
    //reload page
    location.reload();
  }
  //if the user is not playing
  else {
    //change mode to playing
    document.getElementById("startgame").pause();
    playing = true;
    score = 0;
    document.getElementById("scoreNumber").innerHTML = score;

    //show the instructions
    document.getElementById("instruction").innerHTML =
      "How Many Packs on Sell Multiple to Pick?";

    //show countdown box
    show("time");

    //30 seconds timer
    timeRemaining = 600;
    document.getElementById("remainingTime").innerHTML = timeRemaining;

    //hide game over box
    hide("gameover");

    //change button to reset
    document.getElementById("start").innerHTML = "Reset Game";

    //start countdown
    startCountdown();

    //generate new question and answers
    generateQA();
  }
};

//the user clicks on the answer box
for (var i = 1; i < 5; i++) {
  document.getElementById("answer" + i).onclick = function () {
    if (playing == true) {
      //if the answer is correct
      //this=document.getElementById("answer1")
      if (this.innerHTML == correctAnswer) {
        //correct answer
        score++;
        document.getElementById("scoreNumber").innerHTML = score;
        //play sound
        document.getElementById("win").play();
        show("right");

        //show for 1 sec
        setTimeout(function () {
          hide("right");
        }, 1000);
        hide("wrong");
        //generate new answer and question
        generateQA();
      } else {
        //play sound
        document.getElementById("lost").play();

        //wrong answer
        show("wrong");

        //show for 1 sec
        setTimeout(function () {
          hide("wrong");
        }, 1000);
        hide("right");
      }
    }
  };
}

//functions

//start countdown 20sec
const startCountdown = () => {
  action = setInterval(function () {
    timeRemaining -= 1;
    document.getElementById("remainingTime").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      //game over
      stopCountdown();
      show("gameover");
      document.getElementById("gameover").innerHTML =
        "<p>GAME OVER!</p><p>YOUR SCORE: " + score + "</p>";
      document.getElementById("final").play();
      hide("time");
      hide("right");
      hide("wrong");
      playing = false;
      document.getElementById("start").innerHTML = "Start Game";
    }
  }, 1000);
};

//generate question and answers
const generateQA = () => {
  var min1 = 5;
  var max1 = 20;
  
  var min2 = 5;
  var max2 = 10;

  //a random digit from 0 to 10 inclusive
  var randomNumber1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
  var randomNumber2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
  
  document.getElementById("problem").innerHTML =
  //correctAnswer = randomNumber1 / randomNumber2;
    "Order Quantity: "+ "\t" + randomNumber1 +    "\n"  +    "\nSell Multiple: "  +    "\t"     +     randomNumber2;
    
    if ((randomNumber1 % randomNumber2) == 0) {
      correctAnswer = randomNumber1 / randomNumber2;
    }
    else{    correctAnswer= "Sell Multiple Broken.\n" + "Inform Team Lead.\t\t\n" + "\n" + "\n Seek support from Quality"};
  var answerBox = Math.round(Math.random() * 3) + 1;

  //to fill on if the random answer boxes with the right answer
  document.getElementById("answer" + answerBox).innerHTML = correctAnswer;

  //storing answer choices;
  var answers = [correctAnswer];

  //to fill the other answer boxes with the wrong answers

  //make sure to exclude the box with the right answer
  for (var i = 1; i < 5; i++) {
    if (i !== answerBox) {
      var wrongAnswer;
      // check that the wrong answer is not equal to the right answer or another taken wrong answer
      //do: at least one possible answer, while: generate then a new possible answer, if the previous answer is not ok
      do {
        wrongAnswer =
          Math.round(Math.random() * 10) * Math.round(Math.random() * 10);
      } while (answers.indexOf(wrongAnswer) > -1); //wrongAnswer is already in the answer list, we countinue do loop

      document.getElementById("answer" + i).innerHTML = wrongAnswer;
      //adding wrong answer to answer choices
      answers.push(wrongAnswer);
    }
  }
};

//stop counter
const stopCountdown = () => clearInterval(action);

//hide an element
const hide = (id) => (document.getElementById(id).style.display = "none");

//show an element
const show = (id) => (document.getElementById(id).style.display = "block");