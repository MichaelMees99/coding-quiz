var startButton = document.getElementById('start-button');
var quizContainer = document.getElementById('quiz-container');
var timerElement = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var gameOverContainer = document.getElementById('game-over');
var initialsInput = document.getElementById('initials-input');
var saveScoreButton = document.getElementById('save-score-button');
var highScoresContainer = document.getElementById('high-scores-container');
var highScoresList = document.getElementById('high-scores-list');
var resetHighScoresButton = document.getElementById('reset-high-scores-button');
var backToQuizButton = document.getElementById('back-to-quiz-button');

var questions = [
    { question: 'What does HTML stand for?', correctAnswer: 1, answers: ['Hot Tomato Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'] },
    { question: 'What does CSS stand for?', correctAnswer: 2, answers: ['Computer Style Sheet', 'Colorful Style Sheet', 'Cascading Style Sheet', 'Creative Style Sheet'] },
    { question: 'JavaScript is a...', correctAnswer: 3, answers: ['Markup Language', 'Style Sheet Language', 'Database Management Language', 'Programming Language'] }
];
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var highScores = [];

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveHighScore);
resetHighScoresButton.addEventListener('click', resetHighScores);
backToQuizButton.addEventListener('click', backToQuiz);

function startQuiz() {
    startButton.style.display = 'none';
    highScoresContainer.style.display = 'none';
    gameOverContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timerElement.innerText = "Time: " + timeLeft;

    timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.innerText = "Time: " + timeLeft;
        if (timeLeft <= 0) endQuiz();
    }, 1000);

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        var button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (index === question.correctAnswer) button.dataset.correct = true;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;

    if (!correct) timeLeft = Math.max(0, timeLeft - 10);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';
    gameOverContainer.style.display = 'block';
}

function saveHighScore() {
    var initials = initialsInput.value;
    var score = timeLeft;
    highScores.push({ initials, score });
    initialsInput.value = '';
    gameOverContainer.style.display = 'none';
    showHighScores();
}

function showHighScores() {
    highScoresContainer.style.display = 'block';
    highScoresList.innerHTML = '';
    highScores.forEach(score => {
        var li = document.createElement('li');
        li.innerText = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(li);
    });
}

function resetHighScores() {
    highScores = [];
    highScoresList.innerHTML = '';
}

function backToQuiz() {
    highScoresContainer.style.display = 'none';
    startButton.style.display = 'block';
    currentQuestionIndex = 0;
    timeLeft = 60;
}