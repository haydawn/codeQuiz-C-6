// Event listener for the submit button to save the score
document.getElementById("submit").addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    var score = time; 

    if (initials) {
        // Get highscores from local storage or create an empty array
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        var newScore = {
          initials: initials,
          score: score,
        };
        // Add the new score 
      highscores.push(newScore);
      highscores.sort(function (a, b) {
        return b.score - a.score;
      });
  
      // Save new highscores to local storage
      localStorage.setItem("highscores", JSON.stringify(highscores));
    }
});

// Clear highscores
document.getElementById("clear").addEventListener("click", function () {
    localStorage.removeItem("highscores");
    document.getElementById("highscores").innerHTML = "";
});