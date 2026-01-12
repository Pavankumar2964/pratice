let playerName = "";
let players = JSON.parse(localStorage.getItem("players")) || [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const progressEl = document.getElementById("progress");
const timeEl = document.getElementById("time");
const leaderboardEl = document.getElementById("leaderboard");

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

/* START QUIZ */
function startQuiz() {
  const nameInput = document.getElementById("playerName");

  if (nameInput.value.trim() === "") {
    alert("Please enter your name");
    return;
  }

  playerName = nameInput.value;
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("quizSection").style.display = "block";

  renderLeaderboard();
  fetchQuestions();
}

/* FETCH QUESTIONS */
async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  const data = await res.json();
  questions = data.results;
  currentIndex = 0;
  score = 0;
  scoreEl.innerText = "Score: 0";
  loadQuestion();
}

/* LOAD QUESTION */
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

/* CHECK ANSWER */
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

/* NEXT QUESTION */
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
  const percent = (currentIndex / questions.length) * 100;
  progressEl.style.width = percent + "%";
}

/* FINISH QUIZ */
function finishQuiz() {
  questionEl.innerText = "Quiz Completed 🎉";
  optionsEl.innerHTML = `<h3>${playerName}'s Score: ${score}</h3>`;
  progressEl.style.width = "100%";

  players.push({ name: playerName, score });
  localStorage.setItem("players", JSON.stringify(players));

  renderLeaderboard();
}

/* LEADERBOARD */
function renderLeaderboard() {
  leaderboardEl.innerHTML = "";

  if (players.length === 0) {
    highScoreEl.innerText = "High Score: -";
    return;
  }

  const sorted = [...players].sort((a, b) => b.score - a.score);
  highScoreEl.innerText = `High Score: ${sorted[0].name} - ${sorted[0].score}`;

  sorted.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerText = `${i + 1}. ${p.name} - ${p.score}`;
    leaderboardEl.appendChild(li);
  });
}

/* RESTART */
function restartQuiz() {
  fetchQuestions();
}
