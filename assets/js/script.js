const logoEasyQuestions = [
    {
        imagePath: 'assets/images/logo1.jpg',
        answers: [
            { text: "New Zealand", correct: false },
            { text: "Australia", correct: true },
            { text: "USA", correct: false },
            { text: "United Kingdom", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo2.jpg',
        answers: [
            { text: "Greece", correct: false },
            { text: "The Netherlands", correct: false },
            { text: "Sweden", correct: false },
            { text: "Germany", correct: true }
        ]
    },
    {
        imagePath: 'assets/images/logo3.jpg',
        answers: [
            { text: "Brazil", correct: false },
            { text: "Greenland", correct: false },
            { text: "Canada", correct: true },
            { text: "USA", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo4.jpg',
        answers: [
            { text: "USA", correct: true },
            { text: "China", correct: false },
            { text: "United Kingdom", correct: false },
            { text: "France", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo5.jpg',
        answers: [
            { text: "Sweden", correct: false },
            { text: "Switzerland", correct: false },
            { text: "United Kingdom", correct: true },
            { text: "France", correct: false }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const logoEasyButton = document.querySelector(".logo-easy");
    const logoHardButton = document.querySelector(".logo-hard");
    const locationsEasyButton = document.querySelector(".locations-easy");
    const locationsHardButton = document.querySelector(".locations-hard");
    const initialContent = document.getElementById("initial-content");
    const locationsContent = document.querySelector(".locations");
    const quizContainer = document.getElementById("quiz-container");
    const scoreArea = document.querySelector(".score-area");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const correctScore = document.getElementById("score");
    const incorrectScore = document.getElementById("incorrect");
    const stopQuizButton = document.getElementById("stop-quiz");

    let currentQuestionIndex = 0;
    let currentQuestions = [];
    let score = 0;
    let incorrectAnswers = 0;

    // Initially hide the quiz container and the "Stop Quiz" button
    quizContainer.classList.add("hidden");
    stopQuizButton.classList.add("hidden");

    logoEasyButton.addEventListener("click", () => {
        startQuiz(logoEasyQuestions);
    });

    logoHardButton.addEventListener("click", () => {
        startQuiz(logoHardQuestions);
    });

    locationsEasyButton.addEventListener("click", () => {
        startQuiz(locationEasyQuestions);
    });

    locationsHardButton.addEventListener("click", () => {
        startQuiz(locationHardQuestions);
    });

    function startQuiz(questionsArray) {
        // Hide the initial content and display the quiz container
        initialContent.classList.add("hidden");
        locationsContent.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        scoreArea.style.display = "block";
    
        stopQuizButton.classList.remove("hidden");
        currentQuestions = questionsArray;
        currentQuestionIndex = 0;
        score = 0;
        incorrectAnswers = 0;
        nextButton.style.display = "none";
        showQuestion();
        updateScores();
    }


    function showQuestion() {
        resetState();
        const currentQuestion = currentQuestions[currentQuestionIndex];
        questionElement.innerHTML = `<img src="${currentQuestion.imagePath}" alt="Question Image" />`;
    
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = `<span class="answer-text">${answer.text}</span>`;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === "true";
        const answer = currentQuestions[currentQuestionIndex].answers.find(ans => ans.text === selectedButton.innerText);
        
       
        if (answer.correct) {
            score++;
        } else {
            incorrectAnswers++;
        }
        
        
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
            setStatusClass(button, button.dataset.correct === "true");
        });
        
        
        setTimeout(() => {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                nextQuestion();
            } else {
                
                alert(`Quiz finished! Your score is ${score}/${currentQuestions.length}.`);
                
                resetQuiz();
            }
        }, 1000); 
        
      
        updateScores();
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            alert(`Quiz finished! Your score is ${score}/${currentQuestions.length}.`);
            startQuiz(currentQuestions);
        }
        updateScores(); 
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }

    function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }
    function updateScores() {
        correctScore.textContent = score;
        incorrectScore.textContent = incorrectAnswers;
    }
});