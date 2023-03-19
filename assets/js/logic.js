// select elements
var startScreen = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var choiceItems = choices.childNodes;
var answerResult = document.querySelector("#answer-result");
var resultP = document.querySelector("#result");
var endScreen = document.querySelector("#end-screen");
var correctAudio = new Audio("./assets/sfx/correct.wav");
var wrongAudio = new Audio("./assets/sfx/incorrect.wav");
var finalScore = document.querySelector("#final-score");
var initals = document.querySelector("#initials");
var timeSpan = document.querySelector("#time");
var submitBtn = document.querySelector("#submit");
var feedback = document.querySelector("#feedback");

var timer;
let timerCount = 0;
let correctCounter = 0;
let qNo = 0;
let userChoice = "";
let isCorrect = false;

// start quiz
function startQuiz() {
    // hide start page
    startScreen.setAttribute("class", "hide");

    // timer start
    timerCount = 60;
    timer = setInterval(function () {
        timerCount--;
        timeSpan.textContent = timerCount;
        if (timerCount > 0 && qNo === myQuestions.length) {
            clearInterval(timer);
            timeSpan.textContent = 0;
            showEndScreen();
        }
        if (timerCount <= 0) {
            clearInterval(timer);
            timeSpan.textContent = 0;
            showEndScreen();
        }
    }, 1000);

    showQuestion(qNo);
}

// show new question
function showQuestion(i) {
    questionsDiv.setAttribute("class", "show");
    questionTitle.textContent = myQuestions[i].question;
    for (const [key, value] of Object.entries(myQuestions[i].answers)) {
        var choiceBlock = document.createElement("p");
        choiceBlock.textContent = key + ": " + value;
        choices.appendChild(choiceBlock);
    }
    for (let i = 0; i < choiceItems.length; i++) {
        choiceItems[i].addEventListener("click", clickChoice)
    }
}

// show end screen
function showEndScreen() {
    endScreen.setAttribute("class", "show");
    questionsDiv.setAttribute("class", "hide");
    answerResult.setAttribute("class", "hide");
    finalScore.textContent = correctCounter;
}

// choice clicked
function clickChoice(event) {
    // get the user's choice
    var userClick = event.target;
    userChoice = userClick.textContent[0];

    // check user's choice
    if (userChoice === myQuestions[qNo].correctAnswer) {
        correctCounter++;
        isCorrect = true;
        correctAudio.play();
    } else {
        isCorrect = false;
        // if answer is wrong time reduce 10 seconds
        timerCount = timerCount - 10;
        wrongAudio.play();
    }

    if (qNo < myQuestions.length - 1) {
        questionTitle.textContent = "";
        choices.textContent = "";

        answerResult.setAttribute("class", "result")
        if (isCorrect) {
            resultP.textContent = "Correct answer!";
        } else {
            resultP.textContent = "Wrong answer!";
        }

        setTimeout(answerResult.setAttribute("class", "hide"), 1500);
        qNo++;
        showQuestion(qNo);
    } else {
        qNo++;
        showEndScreen();
    }
}

// save score and initial name
function saveScore(event) {
    event.preventDefault();

    let newScore = {
        initials: initals.value.charAt(0).toUpperCase(),
        score: correctCounter
    };

    let highScoresArray = [];
    let highScoresStorageArray = JSON.parse(localStorage.getItem("highScores"));

    if (localStorage.getItem("highScores") === null) {
        highScoresArray.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScoresArray))
    } else {
        highScoresStorageArray.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScoresStorageArray));
    }

    endScreen.setAttribute("class", "hide")
    feedback.setAttribute("class", "feedback show");
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);