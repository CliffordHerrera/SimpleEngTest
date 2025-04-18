const text = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll("#button"));
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const startBtn = document.querySelector('#button5');
const restartBtn = document.querySelector('#restart');
const scoreText = document.querySelector('#score');
const maxScore = document.querySelector('#maxScore');
const progressContainer = document.querySelector('#progressContainer');
const progressBar = document.querySelector('#progressBar');
const kunteynir = document.querySelector('#kunteynir');
let current = 0;
let score = 0;
let resultImg = null;

const variants = [
    {
        question: "1. I ___ glasses since I was a child",
        options: ["wear", "wore", "am wearing", "have been wearing"],
        isCorrect: "have been wearing"
    },
    {
        question: "2. When the phone rang, I ___ dinner.",
        options: ["cook", "was cooking", "had been cooking", "have been cooking"],
        isCorrect: "was cooking"
    },
    {
        question: "3. He usually had dinner at 4 p.m., ___ ?",
        options: ["had he", "hadn't he", "did he", "didn't he."],
        isCorrect: "didn't he"
    },
    {
        question: "4. He works ___ and makes good progress.",
        options: ["hard", "hardly", "good", "badly"],
        isCorrect: "hard"
    },
    {
        question: "5. He reminds me ___ someone I knew in the army.",
        options: ["of", "to", "from", "about"],
        isCorrect: "of"
    },
    {
        question: "6. Mary is here. Where are ___ ?",
        options: ["other", "others", "the others", "another"],
        isCorrect: "the others"
    },
    {
        question: "7. What ___ bad weather we are having today!",
        options: ["the", "a", "an", "—"],
        isCorrect: "—"
    },
    {
        question: "8. Did you read ___ English books at school?",
        options: ["some", "many", "much", "none"],
        isCorrect: "many"
    },
    {
        question: "9. I want to know what ___.",
        options: ["are you doing", "were you doing", "will you do", "you are doing"],
        isCorrect: "you are doing"
    },
    {
        question: "10. I've made ___ mistakes now than I made last time.",
        options: ["few", "a few", "fewer", "less"],
        isCorrect: "fewer"
    },
    {
        question: "11. Can ___ of you help me?",
        options: ["some", "any", "somebody", "anybody"],
        isCorrect: "any"
    },
    {
        question: "12. This translation is twice as ___.",
        options: ["easy", "easier", "the easiest", "much easier"],
        isCorrect: "easy"
    },
    {
        question: "13. We ___ two compositions this month.",
        options: ["write", "wrote", "were writing", "have written"],
        isCorrect: "have written"
    },
    {
        question: "14. I had a feeling that somebody ___ there before.",
        options: ["is", "was", "has been", "had been"],
        isCorrect: "had been"
    },
    {
        question: "15. She won't see him ___ he phones her.",
        options: ["except", "after", "unless", "because"],
        isCorrect: "unless"
    },
    {
        question: "16. ___ only one theatre and two cinemas in this city ten years ago.",
        options: ["there is;", "there was", "there are", "there were"],
        isCorrect: "there was"
    },
    {
        question: "17. My watch ___",
        options: ["stops", "has stopped;", "have stopped", "stop"],
        isCorrect: "has stopped"
    },
    {
        question: "18. Do you know when he ___ ?",
        options: ["comes", "will come", "shall come", "come"],
        isCorrect: "will come"
    },
    {
        question: "19. I don't have any pets. Neither ___.",
        options: ["she does", "does she;", "is she", "does she have"],
        isCorrect: "does she"
    },
    {
        question: "20. His parents didn't let him ___ TV late.",
        options: ["to watch", "watch", "watching", "watched"],
        isCorrect: "watch"
    }
]

window.onload = () => {
    loadProgress();
  };
  

startBtn.addEventListener('click', () => {
    current = 0;
    score = 0;
    if (resultImg) {
        resultImg.remove();
        resultImg = null;
    }
    scoreText.innerText = `Score: ${score}`;
    startBtn.classList.add("hidden");
    showButtons();
    progressContainer.classList.remove("hidden");
    scoreText.classList.remove("hidden");
    engTest(variants[current]);
  });
  
  restartBtn.addEventListener('click', () => {
    restartBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    if (resultImg) {
        resultImg.remove();
        resultImg = null;
    }
    text.innerText = "Welcome to the English Test!";
    hideButtons();
    progressBar.style.width = "0%";
    scoreText.classList.add("hidden");
    clearProgress();
  });
  
  function showButtons() {
    [button1, button2, button3, button4].forEach(btn => btn.classList.remove("hidden"));
  }
  
  function hideButtons() {
    [button1, button2, button3, button4].forEach(btn => btn.classList.add("hidden"));
  }

function engTest(variant) {
    text.innerHTML = variant.question;
    button1.innerText = variant.options[0];
    button2.innerText = variant.options[1];
    button3.innerText = variant.options[2];
    button4.innerText = variant.options[3];

    [button1, button2, button3, button4].forEach(button => {
        button.onclick = () => checkAnswer(button, variant.isCorrect);
    });
    updateProgressBar();
}

function checkAnswer(button, correctAnswer) {
    const isCorrect = button.innerText === correctAnswer;

    [button1, button2, button3, button4].forEach(btn => {
        const img = btn.querySelector("img");
        if (img) img.remove();
    });

    const icon = document.createElement("img");
    icon.src = isCorrect 
        ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" 
        : "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";
    icon.classList.add("w-6", "h-6", "inline", "ml-2");

    button.appendChild(icon);

    if (isCorrect) score++;

    scoreText.innerText = `Score: ${score}`;

    saveProgress();

    // Wait a bit, then show next question
    setTimeout(() => {
        current++;
        if (current < variants.length) {
            engTest(variants[current]);
        } else {
            showResults();
        }
    }, 500);
}

function saveProgress() {
    const progress = {
      currentQuestion: current,
      score: score
    };
    localStorage.setItem("engTestProgress", JSON.stringify(progress));
  }

  function loadProgress() {
    const saved = localStorage.getItem("engTestProgress");
    if (saved) {
      const data = JSON.parse(saved);
      if (confirm("Resume your last session?")) {
        current = data.currentQuestion;
        score = data.score;
        engTest(variants[current]);
      } else {
        localStorage.removeItem("engTestProgress");
      }
    }
    const savedMax = localStorage.getItem("engTestMaxScore");
    if (savedMax) {
        maxScore.innerText = `Max Score: ${savedMax}`;
    } else {
  maxScore.innerText = "Max Score: 0";
    }

  }
  
  function clearProgress() {
    localStorage.removeItem("engTestProgress");
  }
  
function updateProgressBar() {
    const percent = Math.round((current / variants.length) * 100);
    progressBar.style.width = `${percent}%`;
  }

  function showResults() {
    resultImg = document.createElement("img");

    if (score < 10) {
        text.innerText = "You are a DOWN!";
        resultImg.src = "https://sun9-19.userapi.com/c9402/u117981481/-6/x_6cd961ef.jpg"
    }
    else if (score >= 10 && score < 18) {
        text.innerText = "Mmm, you're a smart buddy :)";
        resultImg.src = "https://static.vecteezy.com/system/resources/previews/012/070/349/non_2x/smart-boy-student-cartoon-illustrationtemplate-ss-cdr-free-vector.jpg"
    }
    else {
        text.innerText = "Fuck, you're the naturally Stephen King :D";
        resultImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04EsdMcSy60-LRf2b8pRuhe4-qCSxzu591A&s";
    }

    resultImg.classList.add("w-50", "h-50", "inline", "ml-2", "rounded-xl");
    kunteynir.appendChild(resultImg);

    [button1, button2, button3, button4].forEach(btn => {
        btn.style.display = "none";
    });

    restartBtn.classList.remove("hidden");

    const savedMax = localStorage.getItem("engTestMaxScore");
    if (!savedMax || score > parseInt(savedMax)) {
        localStorage.setItem("engTestMaxScore", score);
        maxScore.innerText = `Max Score: ${score}`;
    }
}

