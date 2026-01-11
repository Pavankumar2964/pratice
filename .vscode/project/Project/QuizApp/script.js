const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: 3
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

loadQuestion();

function loadQuestion() {
  const currentQuestion = quizData[currentIndex];
  questionEl.innerText = currentQuestion.question;
  optionsEl.innerHTML = "";

  progressEl.innerText = `Question ${currentIndex + 1} of ${quizData.length}`;

  currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, button) {
  const correctIndex = quizData[currentIndex].answer;

  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    optionsEl.children[correctIndex].classList.add("correct");
  }

  scoreEl.innerText = `Score: ${score}`;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  questionEl.innerText = `Quiz Finished 🎉`;
  optionsEl.innerHTML = `<h3>Your Score: ${score}/${quizData.length}</h3>`;
  progressEl.innerText = "";
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  scoreEl.innerText = "Score: 0";
  loadQuestion();
}
