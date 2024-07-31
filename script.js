// Array de perguntas, opções e respostas
const questions = [
    {
        question: "Qual foi o nome original planejado para o álbum de estreia do Slipknot, antes de ser mudado para 'Slipknot'?",
        options: ["Mate.Feed.Kill.Repeat", "Crowz", "Disasterpieces", "Antennas to Hell"],
        answer: "Mate.Feed.Kill.Repeat"
    },
    {
        question: "Quantos membros da banda usam uma máscara inspirada em animais?",
        options: ["3", "4", "5", "6"],
        answer: "5"
    },
    {
        question: "Qual é o nome do festival criado pelo Slipknot para celebrar música, arte e cultura alternativa?",
        options: ["Knotfest", "Mayhem Festival", "Ozzfest", "Download Festival"],
        answer: "Knotfest"
    },
    {
        question: "Qual foi o álbum do Slipknot que contou com a participação de uma nova percussão não-tradicional, conhecida como 'beer keg'?",
        options: [".5: The Gray Chapter", "Vol. 3: (The Subliminal Verses)", "We Are Not Your Kind", "All Hope Is Gone"],
        answer: ".5: The Gray Chapter"
    },
    {
        question: "Quem é o atual baterista da banda Slipknot desde 2014, após a saída de Joey Jordison?",
        options: ["Jay Weinberg", "Chris Fehn", "Shawn Crahan", "Corey Taylor"],
        answer: "Jay Weinberg"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30; // Tempo inicial do cronômetro em segundos
let timerInterval; // Variável para armazenar o intervalo do cronômetro

// Elementos DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const timerSpan = document.getElementById('time-remaining');
const scoreElement = document.getElementById('score');
const backgroundMusic = document.getElementById('background-music');

// Botão Iniciar Jogo
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

// Botão Reiniciar Jogo
const restartButtons = document.querySelectorAll('#restart-button');
restartButtons.forEach(button => {
    button.addEventListener('click', restartGame);
});

// Função para iniciar o jogo
function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    score = 0;
    currentQuestionIndex = 0;
    displayQuestion(currentQuestionIndex);
    startBackgroundMusic(); // Inicia a música de fundo
    startTimer(); // Inicia o cronômetro
}

// Função para iniciar a música de fundo
function startBackgroundMusic() {
    backgroundMusic.play();
}

// Função para exibir uma pergunta
function displayQuestion(index) {
    resetTimer(); // Reinicia o cronômetro a cada nova pergunta
    const currentQuestion = questions[index];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', function() {
            checkAnswer(option, currentQuestion.answer);
        });
        optionsContainer.appendChild(button);
    });

    // Atualiza o temporizador na tela
    updateTimerDisplay();
}

// Função para verificar a resposta selecionada pelo jogador
function checkAnswer(selectedOption, correctAnswer) {
    clearInterval(timerInterval); // Para o cronômetro ao responder

    if (selectedOption === correctAnswer) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

// Função para finalizar o jogo
function endGame() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    stopBackgroundMusic(); // Para a música de fundo ao finalizar o jogo
}

// Função para parar a música de fundo
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Função para reiniciar o jogo
function restartGame() {
    endScreen.classList.add('hidden');
    startGame();
}

// Função para iniciar o cronômetro
function startTimer() {
    timeRemaining = 30; // Reinicia o tempo inicial do cronômetro
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            checkAnswer('', ''); // Chama checkAnswer com valores vazios para passar para a próxima pergunta
        }
    }, 1000); // Intervalo de 1 segundo
}

// Função para atualizar a exibição do cronômetro na tela
function updateTimerDisplay() {
    timerSpan.textContent = `Tempo restante: ${timeRemaining} segundos`;
}

// Função para reiniciar o cronômetro
function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining = 30;
    updateTimerDisplay();
}
