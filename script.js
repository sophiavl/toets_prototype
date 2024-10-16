// Array met quizvragen gestructureerd volgens de eisen
const quizData = [
  {
    type: "text", // Woord
    question: "banaan", // Vraag
    answers: [
      // Kiezen uit 3 plaatjes
      { type: "image", content: "images/banaan.png", correct: true },
      { type: "image", content: "images/tas.png", correct: false },
      { type: "image", content: "images/glas.png", correct: false },
    ],
  },
  {
    type: "audio", // Audiofragment
    question: "audio/melk.mp3", // Audiofragment als vraag
    answers: [
      // Kiezen uit 3 woorden
      { type: "text", content: "ei", correct: false },
      { type: "text", content: "melk", correct: true },
      { type: "text", content: "pen", correct: false },
    ],
  },
  {
    type: "image", // Plaatje
    question: "images/ei.png", // Vraag met een afbeelding
    answers: [
      // Kiezen uit 3 audiofragmenten
      { type: "audio", content: "audio/mes.mp3", correct: false },
      { type: "audio", content: "audio/map.mp3", correct: false },
      { type: "audio", content: "audio/ei.mp3", correct: true },
    ],
  },
  {
    type: "text", // Woord
    question: "tas", // Vraag
    answers: [
      // Kiezen uit 3 plaatjes
      { type: "image", content: "images/pen.png", correct: false },
      { type: "image", content: "images/tas.png", correct: true },
      { type: "image", content: "images/banaan.png", correct: false },
    ],
  },
  {
    type: "audio", // Audiofragment
    question: "audio/pen.mp3", // Audiofragment als vraag
    answers: [
      // Kiezen uit 3 woorden
      { type: "text", content: "banaan", correct: false },
      { type: "text", content: "pen", correct: true },
      { type: "text", content: "mes", correct: false },
    ],
  },
  {
    type: "image", // Plaatje
    question: "images/map.png", // Vraag met een afbeelding
    answers: [
      // Kiezen uit 3 audiofragmenten
      { type: "audio", content: "audio/banaan.mp3", correct: false },
      { type: "audio", content: "audio/melk.mp3", correct: false },
      { type: "audio", content: "audio/map.mp3", correct: true },
    ],
  },
  {
    type: "text", // Woord
    question: "mes", // Vraag
    answers: [
      // Kiezen uit 3 plaatjes
      { type: "image", content: "images/melk.png", correct: false },
      { type: "image", content: "images/tas.png", correct: false },
      { type: "image", content: "images/mes.png", correct: true },
    ],
  },
  {
    type: "audio", // Audiofragment
    question: "audio/pan.mp3", // Audiofragment als vraag
    answers: [
      // Kiezen uit 3 woorden
      { type: "text", content: "pen", correct: false },
      { type: "text", content: "pan", correct: true },
      { type: "text", content: "ei", correct: false },
    ],
  },
  {
    type: "image", // Plaatje
    question: "images/glas.png", // Vraag met een afbeelding
    answers: [
      // Kiezen uit 3 audiofragmenten
      { type: "audio", content: "audio/glas.mp3", correct: true }, // Stel dat dit het juiste geluidsfragment is
      { type: "audio", content: "audio/banaan.mp3", correct: false },
      { type: "audio", content: "audio/map.mp3", correct: false },
    ],
  },
];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let results = [];

// Functie om de quiz te laden
function loadQuiz() {
  selectedAnswer = null;
  const questionElement = document.getElementById("question");
  const currentQuiz = quizData[currentQuestion];

  // Vraag weergeven op basis van het type
  if (currentQuiz.type === "text") {
    questionElement.innerText = currentQuiz.question;

    // Antwoorden instellen (met afbeeldingen)
    const answerButtons = document.querySelectorAll(".answer");
    currentQuiz.answers.forEach((answer, index) => {
      answerButtons[
        index
      ].innerHTML = `<img src="${answer.content}" alt="Antwoord" style="object-fit:contain">`;
      answerButtons[index].onclick = () => selectAnswer(index); // Selecteer het antwoord
      answerButtons[index].style.pointerEvents = "auto"; // Zet pointer-events weer aan
    });
  } else if (currentQuiz.type === "audio") {
    questionElement.innerHTML = `<audio controls><source src="${currentQuiz.question}" type="audio/mpeg">Je browser ondersteunt geen audio.</audio>`;

    // Antwoorden instellen (met tekst)
    const answerButtons = document.querySelectorAll(".answer");
    currentQuiz.answers.forEach((answer, index) => {
      answerButtons[index].innerHTML = `<p>${answer.content}</p>`; // Tekst antwoord
      answerButtons[index].onclick = () => selectAnswer(index); // Selecteer het antwoord
      answerButtons[index].style.pointerEvents = "auto"; // Zet pointer-events weer aan
      answerButtons[index].style.backgroundColor = "#e2e2e2";
      answerButtons[index].style.fontSize = "1.5rem";
    });
  } else if (currentQuiz.type === "image") {
    questionElement.innerHTML = `<img src="${currentQuiz.question}" alt="Vraag" style="">`;

    // Antwoorden instellen (met audio)
    const answerButtons = document.querySelectorAll(".answer");
    currentQuiz.answers.forEach((answer, index) => {
      answerButtons[index].innerHTML = `
        <div onclick="playAudio('${answer.content}')" style="cursor: pointer;">
          <svg width="80" height="80" viewBox="0 0 155 155" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="game-icons:speaker">
              <path id="Vector" d="M83.4033 29.0625L54.3408 58.125H25.2783V96.875H54.3408L83.4033 125.938V29.0625ZM98.982 37.4386L97.5713 42.7022C113.333 46.9253 124.272 61.1811 124.272 77.5C124.272 93.8189 113.333 108.074 97.5713 112.298L98.982 117.561C117.101 112.706 129.722 96.258 129.722 77.5C129.722 58.7417 117.101 42.2935 98.982 37.4386ZM95.2206 51.4748L93.8104 56.7385C103.22 59.2596 109.741 67.7586 109.741 77.5C109.741 87.2414 103.22 95.7403 93.8104 98.2615L95.2206 103.525C106.987 100.372 115.19 89.6811 115.19 77.5C115.19 65.3189 106.987 54.6278 95.2206 51.4748ZM91.4594 65.5105L90.0496 70.7742C93.106 71.5937 95.21 74.3355 95.21 77.5C95.21 80.6645 93.106 83.4063 90.0492 84.2259L91.4594 89.4895C96.8735 88.0388 100.659 83.1048 100.659 77.5C100.659 71.8952 96.8735 66.9612 91.4594 65.5105Z" fill="#28252A"/>
            </g>
          </svg>
        </div>
      `;
      answerButtons[index].onclick = () => selectAnswer(index); // Selecteer het antwoord
      answerButtons[index].style.pointerEvents = "auto"; // Zet pointer-events weer aan
    });
  }

  // Knop 'Indienen' weergeven en 'Volgende' verbergen
  document.getElementById("submit").style.display = "block";
  document.getElementById("next").style.display = "none";

  // Resultaat leegmaken
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";

  // Progressiebar bijwerken
  updateProgressBar();
}

// Functie om een audiofragment af te spelen
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

// Functie om de progressiebalk bij te werken
function updateProgressBar() {
  const progressElement = document.getElementById("progress");
  const percentage = ((currentQuestion + 1) / quizData.length) * 100;
  progressElement.style.width = percentage + "%";
}

function selectAnswer(index) {
  const answerButtons = document.querySelectorAll(".answer");

  // Haal de huidige knop op
  const currentButton = answerButtons[index];

  // Als de geselecteerde knop al geselecteerd is, deselecteer deze
  if (currentButton.style.backgroundColor === "#e2e2e2") {
    currentButton.style.backgroundColor = "#3498db";
    selectedAnswer = null; // Zorg ervoor dat er geen antwoord is geselecteerd
  } else {
    // Markeer de geselecteerde knop
    currentButton.style.backgroundColor = "#2980b9"; // Kleur voor de geselecteerde knop
    selectedAnswer = index; // Bewaar de geselecteerde index

    // Reset de achtergrondkleur voor andere knoppen
    answerButtons.forEach((button, i) => {
      if (i !== index) {
        button.style.backgroundColor = "#3498db"; // Reset naar standaard voor andere knoppen
      }
    });
  }

  // Zet pointer-events in (dit kan optioneel zijn als je geen andere knoppen wilt uitschakelen)
  answerButtons.forEach((button) => {
    button.style.pointerEvents = "auto"; // Zet pointer-events weer aan
  });
}

// Functie om het geselecteerde antwoord in te dienen
function submitAnswer() {
  const answerButtons = document.querySelectorAll(".answer");
  const resultElement = document.getElementById("result");

  // Controleer of er een antwoord is geselecteerd
  if (selectedAnswer === null) {
    resultElement.innerHTML = "Kies een antwoord voordat je indient!";
    return;
  }

  const correct = quizData[currentQuestion].answers[selectedAnswer].correct;

  if (correct) {
    score++;
    resultElement.innerHTML = "Correct!";
  } else {
    resultElement.innerHTML = "Fout!";
  }

  document.getElementById("submit").style.display = "none";
  document.getElementById("next").style.display = "block";

  // Voeg de resultaten toe
  results.push({
    question: quizData[currentQuestion].question,
    correct: correct,
  });
}

// Functie om naar de volgende vraag te gaan
function nextQuestion() {
  // Reset geselecteerd antwoord
  selectedAnswer = null;

  // Volgende vraag of einde van de quiz
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz(); // Laad de volgende vraag
  } else {
    setTimeout(() => {
      document.getElementById(
        "quiz"
      ).innerHTML = `<h2>Je score is ${score}/${quizData.length}</h2>`;
      console.log("Resultaten:", results); // Log resultaten naar de console
    }, 1000);
  }
}

// Start de quiz
loadQuiz();
