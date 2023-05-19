var HeaderElement = document.getElementById('Header');
var titleElement = document.getElementById('title');
var startButton = document.getElementById('start-button');
var quizContainer = document.getElementById('quiz-container');
var timerElement = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var gameOverContainer = document.getElementById('game-over');
var initialsInput = document.getElementById('initials-input');
var saveScoreButton = document.getElementById('save-score-button');
var highScoresButton = document.getElementById('high-scores-button');
var highScoresContainer = document.getElementById('high-scores-container');
var highScoresList = document.getElementById('high-scores-list');
var resetHighScoresButton = document.getElementById('reset-high-scores-button');
var backToQuizButton = document.getElementById('back-to-quiz-button');

var originalQuestions = [
    { question: 'What does HTML stand for?', correctAnswer: 1, answers: ['Hot Tomato Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'] },
    { question: 'What does CSS stand for?', correctAnswer: 2, answers: ['Computer Style Sheet', 'Colorful Style Sheet', 'Cascading Style Sheet', 'Creative Style Sheet'] },
    { question: 'JavaScript is a...', correctAnswer: 3, answers: ['Markup Language', 'Style Sheet Language', 'Database Management Language', 'Programming Language'] },
    { question: 'What does API stand for?', correctAnswer: 0, answers: ['Application Programming Interface', 'Applied Programming Input', 'Application Performance Index', 'Advanced Pixel Integration'] },
    { question: 'Which of these is not a relational database?', correctAnswer: 1, answers: ['MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'] },
    { question: 'What is a primary key in a database?', correctAnswer: 2, answers: ['A special key to unlock database', 'The most important data in the database', 'A unique identifier for records in the database', 'The first key in any database'] },
    { question: 'What does JSON stand for?', correctAnswer: 1, answers: ['Java Standard Object Notation', 'JavaScript Object Notation', 'Just a Simple Object Notation', 'JavaScript Oriented Notation'] },
    { question: 'Which of these is not a HTTP method?', correctAnswer: 3, answers: ['GET', 'POST', 'PUT', 'MAKE'] },
    { question: 'What does URL stand for?', correctAnswer: 2, answers: ['Unlimited Resources Locator', 'Universal Retrieval Link', 'Uniform Resource Locator', 'Unified Reference Link'] },
    { question: 'In CSS, "px" is a unit for...', correctAnswer: 0, answers: ['Pixels', 'Percentage', 'Picas', 'Points'] },
    { question: 'Which HTML tag is used to define an internal style sheet?', correctAnswer: 1, answers: ['<style>', '<css>', '<script>', '<frame>'] },
    { question: 'Which HTML attribute is used to specify an alternate text for an image, if the image cannot be displayed?', correctAnswer: 0, answers: ['alt', 'src', 'href', 'title'] }
];
var questions = [...originalQuestions];
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
    highScoresButton.style.display = 'none';
    highScoresContainer.style.display = 'none';
    gameOverContainer.style.display = 'none';
    titleElement.style.display = 'none';
    quizContainer.style.display = 'block';
    timerElement.innerText = "Time: " + timeLeft;
    questions = getRandomQuestions([...originalQuestions]);

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

function getRandomQuestions(questions) {
    let randomQuestions = [];

    for(let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * questions.length);
        randomQuestions.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
    }

    return randomQuestions;
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
        if (initialsInput.value === '') {
            initials = 'Unknown'
        }
    var score = timeLeft;
    highScores.push({ initials, score });
    initialsInput.value = '';
    gameOverContainer.style.display = 'none';
    showHighScores();
}

function showHighScores() {
    highScoresContainer.style.display = 'block';
    highScoresButton.style.display = 'none'
    startButton.style.display = 'none';
    titleElement.style.display = 'none';
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
    highScoresButton.style.display = 'block'
    titleElement.style.display = 'block';
    currentQuestionIndex = 0;
    timeLeft = 60;
}

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveHighScore);
resetHighScoresButton.addEventListener('click', resetHighScores);
backToQuizButton.addEventListener('click', backToQuiz);
highScoresButton.addEventListener('click', showHighScores);