const quizData = [
  {
    question: "Who is the main protagonist of the Naruto series?",
    options: ["Sasuke Uchiha", "Naruto Uzumaki", "Kakashi Hatake", "Itachi Uchiha"],
    answer: 1
  },
  {
    question: "Which village is Naruto from?",
    options: ["Hidden Sand", "Hidden Mist", "Hidden Leaf", "Hidden Stone"],
    answer: 2
  },
  {
    question: "What is the name of the Nine-Tailed Fox sealed inside Naruto?",
    options: ["Shukaku", "Kurama", "Gyuki", "Matatabi"],
    answer: 1
  },
  {
    question: "Who was Naruto’s teacher during his Genin days?",
    options: ["Jiraiya", "Iruka", "Kakashi", "Asuma"],
    answer: 2
  },
  {
    question: "What is Sasuke’s clan name?",
    options: ["Hyuga", "Uzumaki", "Uchiha", "Senju"],
    answer: 2
  }
];

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("high-score");
const restartButton = document.getElementById("restart-button");

const progressText = document.getElementById("progress-text");
const timerText = document.getElementById("timer-text");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

// Load question
function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 30;

  const currentQuestion = quizData[currentQuestionIndex];

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  timerText.textContent = `⏱ Time left: ${timeLeft}s`;

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  nextButton.disabled = true;
  startTimer();
}

// Timer logic
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `⏱ Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      disableOptions();
      nextButton.disabled = false;
    }
  }, 1000);
}

// Disable all option buttons
function disableOptions() {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach(button => (button.disabled = true));
}

// Handle answer selection
function selectOption(selectedIndex) {
  clearInterval(timerInterval);

  const currentQuestion = quizData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== currentQuestion.answer) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  nextButton.disabled = false;
}

// Next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

// Show score + high score
function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  scoreText.textContent = `You scored ${score} out of ${quizData.length}`;

  const highScore = localStorage.getItem("narutoHighScore") || 0;

  if (score > highScore) {
    localStorage.setItem("narutoHighScore", score);
    highScoreText.textContent = `🎉 New Hokage-level High Score: ${score}`;
  } else {
    highScoreText.textContent = `Highest Score So Far: ${highScore}`;
  }
}

// Restart quiz
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;

  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  loadQuestion();
});

// Start quiz
loadQuestion();
