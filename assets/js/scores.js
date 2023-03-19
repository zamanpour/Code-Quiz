// select main elements
var highScores = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");


// get highscore from local storage
let scoreArray = JSON.parse(localStorage.getItem("highScores"));

// sort array
if (scoreArray != null) {
    if (scoreArray.length > 1) {
        scoreArray.sort(function (a, b) {
            return b.score - a.score;
        })
    }

    scoreArray.forEach(element => {
        let sortedList = document.createElement("li");
        sortedList.textContent = element.initials + ": " + element.score;
        highScores.appendChild(sortedList);
    });
}



function clearData() {
    localStorage.clear();
    highScores.innerHTML = "";
}

clearBtn.addEventListener("click", clearData)