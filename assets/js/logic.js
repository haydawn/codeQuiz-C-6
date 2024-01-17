
var startButton = document.getElementById('start');
var submitButton = document.getElementById('submit');
var correctAudio = document.getElementById('correct');
var incorrectAudio = document.getElementById('incorrect');
var currentQuestionIndex = 0;
var time = 0;
var timerInterval;

// Event listener for the start button to initiate the quiz
startButton.addEventListener('click', startQuiz);

// Event listener for the submit button to save the score
submitButton.addEventListener('click', saveScore);

// Function to start the quiz
function startQuiz() {
  // Set up initial conditions
  currentQuestionIndex = 0;
  time = 60;
  document.getElementById('time').textContent = time;

  // Set up a timer that decreases every second
  timerInterval = setInterval(function () {
    time--;
    document.getElementById('time').textContent = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
     showQuestion();
}

// Function to display a question
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var questionTitle = document.getElementById('question-title');
  questionTitle.textContent = currentQuestion.question;
  var choicesContainer = document.getElementById('choices');

  while (choicesContainer.firstChild) {
    choicesContainer.removeChild(choicesContainer.firstChild);
  }

  // Create buttons for each answer choice
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceBtn = document.createElement('button');
    choiceBtn.textContent = currentQuestion.choices[i];
    choiceBtn.setAttribute('data-index', i);
    choiceBtn.addEventListener('click', checkAnswer);

    // Append the button to choicesContainer
    choicesContainer.appendChild(choiceBtn);
  }

  // Hide the start screen and show the questions
  var startScreen = document.getElementById('start-screen');
  var questionsContainer = document.getElementById('questions');

  startScreen.classList.add('hide');
  questionsContainer.classList.remove('hide');
}

// Check answer
function checkAnswer(event) {
  var userChoiceIndex = parseInt(event.target.getAttribute('data-index'));
  var currentQuestion = questions[currentQuestionIndex];

  if (userChoiceIndex === currentQuestion.correctAnswer) {
    document.getElementById('feedback').textContent = 'Correct!';
    correctAudio.play();
  } else {
    time -= 10;
    document.getElementById('feedback').textContent = 'Incorrect!';
    incorrectAudio.play();
  }
  

  //Show the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

// Function to end the game
function endGame() {
  clearInterval(timerInterval);
  var questionsContainer = document.getElementById('questions');
  var endScreen = document.getElementById('end-screen');
  questionsContainer.classList.add('hide');
  endScreen.classList.remove('hide');

  // show Final score
  document.getElementById('final-score').textContent = time;
}

// Save the score
function saveScore() {
  var initials = document.getElementById('initials').value;

  if (initials) {
    var newScore = {
      initials: initials,
      score: time,
    };

    // Save scores to local storage
    localStorage.setItem('highscores', JSON.stringify(highscores));

    // Add the new score to the highscores array sort 
    highscores.push(newScore);
    highscores.sort(function (a, b) {
      return b.score - a.score;
    });
  } else {
    document.getElementById('feedback').textContent = 'Please enter your initials.';
  }
}

// Get scores from local storage
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];