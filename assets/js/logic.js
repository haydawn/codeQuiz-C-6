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
}
