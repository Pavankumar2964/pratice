const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const progressEl = document.getElementById("progress");
const timeEl = document.getElementById("time");

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerText = `High Score: ${highScore}`;

/* FETCH QUESTIONS FROM OPEN TRIVIA API */
async function fetchQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  const data = await res.json();
  questions = data.results;
  loadQuestion();
}

fetchQuestions();

function loadQuestion() {
  resetTimer();
  const q = questions[currentIndex];

  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = "";

  const answers = [...q.incorrect_answers, q.correct_answer]
    .sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerHTML = answer;
    btn.onclick = () => checkAnswer(answer, q.correct_answer, btn);
    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

function checkAnswer(selected, correct, btn) {
  clearInterval(timer);

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    [...optionsEl.children].forEach(b => {
      if (b.innerHTML === correct) b.classList.add("correct");
    });
  }

  scoreEl.innerText = `Score: ${score}`;

  setTimeout(nextQuestion, 800);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

/* TIMER */
function startTimer() {
  timeLeft = 10;
  timeEl.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}

/* PROGRESS BAR */
function updateProgress() {
  const percent = ((currentIndex) / questions.length) * 100;
  progressEl.style.width = percent + "%";
}

/* END QUIZ */
function finishQuiz() {
  questionEl.innerText = "Quiz Completed 🎉";
  optionsEl.innerHTML = `<h3>Your Score: ${score}</h3>`;
  progressEl.style.width = "100%";

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreEl.innerText = `High Score: ${score}`;
  }
}

/* RESTART */
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  scoreEl.innerText = "Score: 0";
  fetchQuestions();
}
