let quizData = [
    {
        question: "Bir tren saatte 60 km hızla gidiyor. 3 saatte kaç kilometre yol alır?",
        options: ["120 km", "150 km", "180 km", "200 km"],
        correct: "180 km",
    },
    {
        question: "Bir kenarının uzunluğu 5 cm olan bir karenin çevresi kaç santimetredir?",
        options: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correct: "20 cm",
    },
    {
        question: "Bir bakkal, kilosunu 4 TL'den 50 kg elma satıyor. Toplam gelir ne kadar olur?",
        options: ["150 TL", "200 TL", "250 TL", "300 TL"],
        correct: "200 TL",
    },
    {
        question: "Bir işçi, bir işi 8 saatte bitiriyor. Aynı işi 4 işçi kaç saatte bitirir?",
        options: ["1 saat", "2 saat", "3 saat", "4 saat"],
        correct: "2 saat",
    },
    {
        question: "24, 18 ve 12 sayılarının en büyük ortak böleni nedir?",
        options: ["2", "3", "6", "12"],
        correct: "6",
    },
    {
        question: "Bir sınıfta 12 kız ve 8 erkek öğrenci var. Sınıftaki toplam öğrenci sayısı nedir?",
        options: ["18", "19", "20", "21"],
        correct: "20",
    },
    {
        question: "Bir dikdörtgenin kısa kenarı 4 cm, uzun kenarı 6 cm. Dikdörtgenin alanı kaç santimetrekaredir?",
        options: ["20 cm²", "24 cm²", "26 cm²", "30 cm²"],
        correct: "24 cm²",
    },
    {
        question: "5 işçi bir işi 15 günde bitiriyor. Aynı işi 10 işçi kaç günde bitirir?",
        options: ["5 gün", "7.5 gün", "10 gün", "12 gün"],
        correct: "7.5 gün",
    },
    {
        question: "Bir dik üçgenin dik kenarları 6 cm ve 8 cm. Hipotenüs uzunluğu kaç santimetredir?",
        options: ["10 cm", "11 cm", "12 cm", "13 cm"],
        correct: "10 cm",
    },
    {
        question: "Bir otobüste 30 yetişkin ve 20 çocuk var. Yetişkinler 70 kg, çocuklar ise 35 kg ağırlığında. Otobüsün toplam yükü ne kadardır?",
        options: ["2450 kg", "2500 kg", "2550 kg", "2600 kg"],
        correct: "2450 kg",
    },

  ];
  
  const quizContainer = document.querySelector(".quiz-container");
  const question = document.querySelector(".quiz-container .question");
  const options = document.querySelector(".quiz-container .options");
  const nextBtn = document.querySelector(".quiz-container .next-btn");
  const quizResult = document.querySelector(".quiz-result");
  const startBtnContainer = document.querySelector(".start-btn-container");
  const startBtn = document.querySelector(".start-btn-container .start-btn");
  
  let questionNumber = 0;
  let score = 0;
  const MAX_QUESTIONS = 10;
  let timerInterval;
  
  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };
  
  quizData = shuffleArray(quizData);
  
  const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  };
  
  resetLocalStorage();
  
  const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct) {
      score++;
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
    }
  
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
  
    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
      o.classList.add("disabled");
    });
  };
  
  const createQuestion = () => {
    clearInterval(timerInterval);
  
    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");
  
    timerDisplay.textContent = `Süre: 10 Saniye`;
  
    timerInterval = setInterval(() => {
      timerDisplay.textContent = `Süre: ${secondsLeft
        .toString()
        .padStart(2, "0")} Saniye`;
      secondsLeft--;
  
      if (secondsLeft < 3) {
        timerDisplay.classList.add("danger");
      }
  
      if (secondsLeft < 0) {
        clearInterval(timerInterval);
        displayNextQuestion();
      }
    }, 1000);
  
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
      questionNumber + 1
    }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
  
    const shuffledOptions = shuffleArray(quizData[questionNumber].options);
  
    shuffledOptions.forEach((o) => {
      const option = document.createElement("button");
      option.classList.add("option");
      option.innerHTML = o;
      option.addEventListener("click", (e) => {
        checkAnswer(e);
      });
      options.appendChild(option);
    });
  };
  
  const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();
  
    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
  };
  
  const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";
  
    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `Skor ${score} / ${MAX_QUESTIONS}`;
    quizResult.appendChild(resultHeading);
  
    for (let i = 0; i < MAX_QUESTIONS; i++) {
      const resultItem = document.createElement("div");
      resultItem.classList.add("question-container");
  
      const userAnswer = localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer = quizData[i].correct;
  
      let answeredCorrectly = userAnswer === correctAnswer;
  
      if (!answeredCorrectly) {
        resultItem.classList.add("incorrect");
      }
  
      resultItem.innerHTML = `<div class="question">Soru ${i + 1}: ${
        quizData[i].question
      }</div>
      <div class="user-answer">Senin Cevabın: ${userAnswer || "Cevaplanmadı"}</div>
      <div class="correct-answer">Doğru Cevap: ${correctAnswer}</div>`;
  
      quizResult.appendChild(resultItem);
    }
  
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Tekrar Çöz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
  };
  
  const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
      displayQuizResult();
      return;
    }
  
    questionNumber++;
    createQuestion();
  };
  
  nextBtn.addEventListener("click", displayNextQuestion);
  
  startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
  });