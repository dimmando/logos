const logoEasyQuestions = [
    {
        imagePath: 'assets/images/logo1.png',
        answers: [
            { text: "Venturi", correct: false },
            { text: "Changan", correct: true },
            { text: "Chery", correct: false },
            { text: "Vauxhall", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo2.png',
        answers: [
            { text: "Aston Martin", correct: false },
            { text: "Alpine", correct: false },
            { text: "Acura", correct: false },
            { text: "Aixam", correct: true }
        ]
    },
    {
        imagePath: 'assets/images/logo3.png',
        answers: [
            { text: "Toyota", correct: false },
            { text: "Tata", correct: false },
            { text: "Troller", correct: true },
            { text: "Tatra", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo4.png',
        answers: [
            { text: "Proton", correct: true },
            { text: "Peugeot", correct: false },
            { text: "Pagani", correct: false },
            { text: "Packard", correct: false }
        ]
    },
    {
        imagePath: 'assets/images/logo5.png',
        answers: [
            { text: "Buick", correct: false },
            { text: "Saipa", correct: false },
            { text: "Zaz", correct: true },
            { text: "Laraki", correct: false }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const logoEasyButton = document.querySelector(".logo-easy");
    const initialContent = document.getElementById("initial-content");
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
   
    function startQuiz(questionsArray) {
        // Hide the initial content and display the quiz container
        initialContent.classList.add("hidden");
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