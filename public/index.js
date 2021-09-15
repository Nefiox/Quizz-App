const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionsElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionsElement.innerText = question.question;
    question.answers.forEach(ans => {
        const button = document.createElement('button');

        button.innerText = ans.text;
        button.classList.add('btn');

        if(ans.correct) {
            button.dataset.correct = ans.correct;
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
};

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });

    if(shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    };
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    };
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            {text: '22', correct: false},
            {text: '16', correct: false},
            {text: '8', correct: false},
            {text: '4', correct: true},
        ]
    },
    {
        question: 'What is 8 + 2?',
        answers: [
            {text: '82', correct: false},
            {text: '10', correct: true},
            {text: '14', correct: false},
            {text: '2', correct: false},
        ]
    },
    {
        question: 'What is 22 - 2?',
        answers: [
            {text: '24', correct: false},
            {text: '5', correct: false},
            {text: '20', correct: true},
            {text: '0', correct: false},
        ]
    },
    {
        question: 'What is 7 + 7?',
        answers: [
            {text: '45', correct: false},
            {text: '14', correct: true},
            {text: '7', correct: false},
            {text: '2', correct: false},
        ]
    },
    {
        question: 'What is 7 * 7?',
        answers: [
            {text: '59', correct: false},
            {text: '14', correct: false},
            {text: '49', correct: true},
            {text: '77', correct: false},
        ]
    },
];