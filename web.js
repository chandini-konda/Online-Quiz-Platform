const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Transfer Markup Language",
            "Hyper Text Markup Language",
            "High Tech Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 1
    },
    {
        question: "Which tag is used to define an image in HTML?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: 0
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<h1>", "<h6>", "<head>", "<h4>"],
        answer: 0
    },
    {
        question: "Which attribute is used to provide a unique name to an HTML element?",
        options: ["id", "class", "name", "style"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            autoSubmit();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    
    const buttons = document.getElementsByClassName("option");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = currentQuestion.options[i];
        buttons[i].disabled = false;
    }
    
    document.getElementById("result").innerText = "";
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(selectedIndex) {
    clearInterval(timer); 
    
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        document.getElementById("result").innerText = "Correct!";
        document.getElementById("result").style.color = "green";
        score++;
    } else {
        document.getElementById("result").innerText = "Wrong!";
        document.getElementById("result").style.color = "red";
    }

    const buttons = document.getElementsByClassName("option");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    document.getElementById("next-btn").style.display = "block";
}

function autoSubmit() {
    const buttons = document.getElementsByClassName("option");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    document.getElementById("result").innerText = "Time's up!";
    document.getElementById("result").style.color = "red";
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        document.querySelector(".quiz-container").innerHTML = `<h2>Test Completed</h2><p>Your score: ${score}/${questions.length}</p>`;
    }
}

loadQuestion();
