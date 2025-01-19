const quizData = [
  //school

  {
    type: "text",
    question: "gum",
    answers: [
      { type: "image", content: "gum.png", correct: true },
      { type: "image", content: "schrift.png", correct: false },
      { type: "image", content: "klok.png", correct: false },
    ],
  },
  {
    type: "audio",
    question: "klok.mp3",
    answers: [
      { type: "text", content: "lijm", correct: false },
      { type: "text", content: "klok", correct: true },
      { type: "text", content: "brood", correct: false },
    ],
  },
  {
    type: "image",
    question: "lijm.png",
    answers: [
      { type: "audio", content: "boek.mp3", correct: false },
      { type: "audio", content: "deksel.mp3", correct: false },
      { type: "audio", content: "lijm.mp3", correct: true },
    ],
  },

  //keuken
  {
    type: "text",
    question: "waterkoker",
    answers: [
      { type: "image", content: "keukenrol.png", correct: false },
      { type: "image", content: "waterkoker.png", correct: true },
      { type: "image", content: "brood.png", correct: false },
    ],
  },
  {
    type: "audio",
    question: "spatel.mp3",
    answers: [
      { type: "text", content: "melkpak", correct: false },
      { type: "text", content: "spatel", correct: true },
      { type: "text", content: "deksel", correct: false },
    ],
  },
  {
    type: "image",
    question: "blender.png",
    answers: [
      { type: "audio", content: "olijfolie.mp3", correct: false },
      { type: "audio", content: "klok.mp3", correct: false },
      { type: "audio", content: "blender.mp3", correct: true },
    ],
  },

  //gymzaal
  {
    type: "text",
    question: "racket",
    answers: [
      { type: "image", content: "melk.png", correct: false },
      { type: "image", content: "schrift.png", correct: false },
      { type: "image", content: "racket.png", correct: true },
    ],
  },
  {
    type: "audio",
    question: "rolschaats.mp3",
    answers: [
      { type: "text", content: "voetbal", correct: false },
      { type: "text", content: "rolschaats", correct: true },
      { type: "text", content: "eieren", correct: false },
    ],
  },
  {
    type: "image",
    question: "bokshandschoen.png",
    answers: [
      { type: "audio", content: "bokshandschoen.mp3", correct: true },
      { type: "audio", content: "waterkoker.mp3", correct: false },
      { type: "audio", content: "wandelstok.mp3", correct: false },
    ],
  },

  //supermarkt
  {
    type: "text",
    question: "ananas",
    answers: [
      { type: "image", content: "brood.png", correct: false },
      { type: "image", content: "eieren.png", correct: false },
      { type: "image", content: "ananas.png", correct: true },
    ],
  },
  {
    type: "audio",
    question: "sinaasappel.mp3",
    answers: [
      { type: "text", content: "racket", correct: false },
      { type: "text", content: "sinaasappel", correct: true },
      { type: "text", content: "bijenkorf", correct: false },
    ],
  },
  {
    type: "image",
    question: "Brood.png",
    answers: [
      { type: "audio", content: "boterham.mp3", correct: true },
      { type: "audio", content: "olijfolie.mp3", correct: false },
      { type: "audio", content: "melkpak.mp3", correct: false },
    ],
  },

  //bos
  {
    type: "text",
    question: "wandelstok",
    answers: [
      { type: "image", content: "bijenkorf.png", correct: false },
      { type: "image", content: "bokshandschoen.png", correct: false },
      { type: "image", content: "wandelstok.png", correct: true },
    ],
  },
  {
    type: "audio",
    question: "dennenappel.mp3",
    answers: [
      { type: "text", content: "boterham", correct: false },
      { type: "text", content: "dennenappel", correct: true },
      { type: "text", content: "slakkenhuis", correct: false },
    ],
  },
  {
    type: "image",
    question: "paddenstoel.png",
    answers: [
      { type: "audio", content: "paddenstoel.mp3", correct: true },
      { type: "audio", content: "frisbee.mp3", correct: false },
      { type: "audio", content: "kastanje.mp3", correct: false },
    ],
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let results = [];
let selectedSmiley = null;

function selectSmiley(smiley) {
  // Verwijder de 'selected' class van alle smileys
  document.querySelectorAll(".smiley").forEach((img) => {
    img.classList.remove("selected");
  });

  // Voeg de 'selected' class toe aan de geklikte smiley
  selectedSmiley = smiley;
  document.getElementById(`${smiley}-smiley`).classList.add("selected");

  // Activeer de startknop
  document.getElementById("start-quiz-btn").disabled = false;
}

function startQuiz() {
  if (selectedSmiley) {
    // Verberg de smiley-sectie en toon de quiz-sectie
    document.getElementById("smiley-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    console.log(selectedSmiley);
    loadQuiz(); // Start de quiz
  }
}

// Update the progress bar width
function updateProgressBar() {
  const progress = document.getElementById("progress");
  const progressPercentage = (currentQuestion / quizData.length) * 100; // Calculate percentage
  progress.style.width = progressPercentage + "%"; // Set the width of the progress bar
}

function loadQuiz() {
  const questionElement = document.getElementById("question");
  const currentQuiz = quizData[currentQuestion];

  if (currentQuiz.type === "text") {
    questionElement.innerText = currentQuiz.question;
  } else if (currentQuiz.type === "audio") {
    questionElement.innerHTML = `<audio controls><source src="audio/${currentQuiz.question}" type="audio/mpeg">Your browser does not support audio.</audio>`;
  } else if (currentQuiz.type === "image") {
    questionElement.innerHTML = `<img src="images/${currentQuiz.question}" alt="Question" style="max-width: 100%;">`;
  }

  const answerElements = document.querySelectorAll(".answer-content");
  currentQuiz.answers.forEach((answer, index) => {
    if (answer.type === "image") {
      answerElements[
        index
      ].innerHTML = `<img src="images/${answer.content}" alt="Answer" style="max-width: 100%;">`;
    } else if (answer.type === "audio") {
      answerElements[
        index
      ].innerHTML = `<audio controls><source src="audio/${answer.content}" type="audio/mpeg">Your browser does not support audio.</audio>`;
    } else {
      answerElements[index].innerText = answer.content;
    }

    document.getElementById(`answer${index + 1}`).checked = false;
  });

  document.getElementById("submit").style.display = "block";
  document.getElementById("result").innerHTML = "";
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
    question: currentQuiz.question.includes(".")
      ? currentQuiz.question.split(".")[0]
      : currentQuiz.question,
    selected: selectedAnswerDetails.content.includes(".")
      ? selectedAnswerDetails.content.split(".")[0]
      : selectedAnswerDetails.content,
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
    document.getElementById(
      "quiz"
    ).innerHTML = `<h2>${score}/${quizData.length} goed</h2>`;

    console.log(
      "Results:",
      results.map((result, index) => ({
        questionIndex: index + 1,
        question: result.question,
        selected: result.selected,
        correct: result.correct,
      }))
    );
  }
}

loadQuiz();
