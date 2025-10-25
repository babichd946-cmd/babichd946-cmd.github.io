document.addEventListener('DOMContentLoaded', function() {
    // Елементи DOM
    const elements = {
        userName: document.getElementById('userName'),
        userScore: document.getElementById('userScore'),
        userNumber: document.getElementById('userNumber'),
        computerScore: document.getElementById('computerScore'),
        computerNumber: document.getElementById('computerNumber'),
        result: document.getElementById('result'),
        generateBtn: document.getElementById('generateBtn'),
        resetBtn: document.getElementById('resetBtn'),
        roundInfo: document.getElementById('roundInfo')
    };

    // Стан гри
    let gameState = {
        userName: '',
        userScore: 0,
        computerScore: 0,
        round: 1,
        gameOver: false
    };

    // Ініціалізація
    function init() {
        askUserName();
        updateUI();
    }

    // Запит імені
    function askUserName() {
        let name = prompt('Введіть ваше ім\'я:') || 'Гравець';
        gameState.userName = name.trim();
        elements.userName.textContent = gameState.userName;
    }

    // Генерація числа
    function generateNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Оновлення інтерфейсу
    function updateUI() {
        elements.userScore.textContent = gameState.userScore;
        elements.computerScore.textContent = gameState.computerScore;
        elements.roundInfo.textContent = `Раунд: ${gameState.round}`;
    }

    // Перевірка перемоги
    function checkGameOver() {
        if (gameState.userScore >= 3 || gameState.computerScore >= 3) {
            gameState.gameOver = true;
            elements.generateBtn.disabled = true;
            elements.resetBtn.disabled = false;
            
            const winner = gameState.userScore >= 3 ? gameState.userName : 'Комп\'ютер';
            elements.result.innerHTML = `<div class="game-over">Переміг ${winner}!</div>`;
        }
    }

    // Обробка раунду
    elements.generateBtn.addEventListener('click', function() {
        if (gameState.gameOver) return;

        const userNum = generateNumber();
        const compNum = generateNumber();

        elements.userNumber.textContent = userNum;
        elements.computerNumber.textContent = compNum;

        // Визначення переможця раунду
        if (userNum > compNum) {
            gameState.userScore++;
            elements.result.innerHTML = `<span class="winner">${gameState.userName} переміг!</span>`;
        } else if (compNum > userNum) {
            gameState.computerScore++;
            elements.result.innerHTML = `<span class="loser">Комп'ютер переміг!</span>`;
        } else {
            elements.result.innerHTML = `<span>Нічия!</span>`;
        }

        gameState.round++;
        updateUI();
        checkGameOver();
    });

    // Нова гра
    elements.resetBtn.addEventListener('click', function() {
        gameState = {
            userName: gameState.userName,
            userScore: 0,
            computerScore: 0,
            round: 1,
            gameOver: false
        };

        elements.userNumber.textContent = '-';
        elements.computerNumber.textContent = '-';
        elements.result.textContent = '';
        elements.generateBtn.disabled = false;
        elements.resetBtn.disabled = true;

        updateUI();
    });

    // Запуск гри
    init();
});