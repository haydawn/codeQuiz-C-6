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