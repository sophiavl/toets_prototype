const quizData = [
  {
    type: "text",
    question: "banaan",
    answers: [
      { type: "image", content: "banaan.png", correct: true },
      { type: "image", content: "tas.png", correct: false },
      { type: "image", content: "glas.png", correct: false },
    ],
  },
  {
    type: "audio",
    question: "melk.mp3",
    answers: [
      { type: "text", content: "ei", correct: false },
      { type: "text", content: "melk", correct: true },
      { type: "text", content: "pen", correct: false },
    ],
  },
  {
    type: "image",
    question: "ei.png",
    answers: [
      { type: "audio", content: "mes.mp3", correct: false },
      { type: "audio", content: "map.mp3", correct: false },
      { type: "audio", content: "ei.mp3", correct: true },
    ],
  },
  {
    type: "text",
    question: "tas",
    answers: [
      { type: "image", content: "pen.png", correct: false },
      { type: "image", content: "tas.png", correct: true },
      { type: "image", content: "banaan.png", correct: false },
    ],
  },
  {
    type: "audio",
    question: "pen.mp3",
    answers: [
      { type: "text", content: "banaan", correct: false },
      { type: "text", content: "pen", correct: true },
      { type: "text", content: "mes", correct: false },
    ],
  },
  {
    type: "image",
    question: "map.png",
    answers: [
      { type: "audio", content: "banaan.mp3", correct: false },
      { type: "audio", content: "melk.mp3", correct: false },
      { type: "audio", content: "map.mp3", correct: true },
    ],
  },
  {
    type: "text",
    question: "mes",
    answers: [
      { type: "image", content: "melk.png", correct: false },
      { type: "image", content: "tas.png", correct: false },
      { type: "image", content: "mes.png", correct: true },
    ],
  },
  {
    type: "audio",
    question: "pan.mp3",
    answers: [
      { type: "text", content: "pen", correct: false },
      { type: "text", content: "pan", correct: true },
      { type: "text", content: "ei", correct: false },
    ],
  },
  {
    type: "image",
    question: "glas.png",
    answers: [
      { type: "audio", content: "glas.mp3", correct: true },
      { type: "audio", content: "banaan.mp3", correct: false },
      { type: "audio", content: "map.mp3", correct: false },
    ],
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let results = [];

// Update the progress bar width
function updateProgressBar() {
    const progress = document.getElementById('progress');
    const progressPercentage = ((currentQuestion) / quizData.length) * 100; // Calculate percentage
    progress.style.width = progressPercentage + '%'; // Set the width of the progress bar
}

function loadQuiz() {
    const questionElement = document.getElementById('question');
    const currentQuiz = quizData[currentQuestion];

    if (currentQuiz.type === "text") {
        questionElement.innerText = currentQuiz.question;
    } else if (currentQuiz.type === "audio") {
        questionElement.innerHTML = `<audio controls><source src="audio/${currentQuiz.question}" type="audio/mpeg">Your browser does not support audio.</audio>`;
    } else if (currentQuiz.type === "image") {
        questionElement.innerHTML = `<img src="images/${currentQuiz.question}" alt="Question" style="max-width: 100%;">`;
    }

    const answerElements = document.querySelectorAll('.answer-content');
    currentQuiz.answers.forEach((answer, index) => {
        if (answer.type === "image") {
            answerElements[index].innerHTML = `<img src="images/${answer.content}" alt="Answer" style="max-width: 100%;">`;
        } else if (answer.type === "audio") {
            answerElements[index].innerHTML = `<audio controls><source src="audio/${answer.content}" type="audio/mpeg">Your browser does not support audio.</audio>`;
        } else {
            answerElements[index].innerText = answer.content;
        }

        document.getElementById(`answer${index + 1}`).checked = false;
    });

    document.getElementById('submit').style.display = 'block';
    document.getElementById('result').innerHTML = "";
    updateProgressBar(); // Update the progress bar
}

function selectAnswer(index) {
    selectedAnswer = index;
}

function submitAnswer() {
    if (selectedAnswer === null) {
        alert("Selecteer een antwoord!");
        return;
    }

    const currentQuiz = quizData[currentQuestion];
    const selectedAnswerDetails = currentQuiz.answers[selectedAnswer];

    results.push({
        question: currentQuiz.question.includes(".") ? currentQuiz.question.split(".")[0] : currentQuiz.question,
        selected: selectedAnswerDetails.content.includes(".") ? selectedAnswerDetails.content.split(".")[0] : selectedAnswerDetails.content,
        correct: selectedAnswerDetails.correct,
    });

    const correct = selectedAnswerDetails.correct;
    if (correct) {
        score++;
    }

    nextQuestion();
}

function nextQuestion() {
    selectedAnswer = null;

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        updateProgressBar();
        document.getElementById('quiz').innerHTML = `<h2>${score}/${quizData.length} goed</h2>`;
        
        console.log("Results:", results.map((result, index) => ({
            questionIndex: index + 1,
            question: result.question,
            selected: result.selected,
            correct: result.correct,
        })));
    }
}

loadQuiz();
