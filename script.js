document.addEventListener('DOMContentLoaded', function() {
    // Структура сторінки
    const container = document.createElement('div');
    container.className = 'container';
    
    const heading = document.createElement('h1');
    heading.textContent = 'Магічна куля';
    
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Задайте своє питання магічній кулі та отримайте відповідь!';
    
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.id = 'questionInput';
    questionInput.placeholder = 'Введіть ваше питання, будь ласка';
    
    const validationMessage = document.createElement('div');
    validationMessage.className = 'validation-message';
    validationMessage.id = 'validationMessage';
    
    const askButton = document.createElement('button');
    askButton.id = 'askButton';
    askButton.textContent = 'Запитати кулю';
    
    const magicBall = document.createElement('div');
    magicBall.className = 'magic-ball';
    
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    answerDiv.id = 'answer';
    answerDiv.textContent = 'Задайте питання';
    
    const history = document.createElement('div');
    history.className = 'history';
    
    const historyHeading = document.createElement('h3');
    historyHeading.textContent = 'Історія питань';
    
    const historyList = document.createElement('div');
    historyList.id = 'historyList';
    
    // Елементи до DOM
    inputContainer.appendChild(questionInput);
    inputContainer.appendChild(validationMessage);
    inputContainer.appendChild(askButton);
    
    magicBall.appendChild(answerDiv);
    
    history.appendChild(historyHeading);
    history.appendChild(historyList);
    
    container.appendChild(heading);
    container.appendChild(description);
    container.appendChild(inputContainer);
    container.appendChild(magicBall);
    container.appendChild(history);
    
    document.body.appendChild(container);
    
    // Логіка
    const answers = [
        "Так, безумовно",
        "Без сумніву",
        "Так",
        "Знаки вказують на так",
        "Можливо",
        "Ймовірно",
        "Перспективи хороші",
        "Так",
        "Сконцентруйся і спитай знову",
        "Запитай пізніше",
        "Краще не розповідати тобі зараз",
        "Не можу передбачити зараз",
        "Не розраховуй на це",
        "Ні",
        "Джерела кажуть - ні",
        "Перспективи не дуже хороші",
        "Сумнівно",
		      "Не впевнений"
    ];
    
    let questionHistory = [];
    
    function validateQuestion(question) {
        if (!question.trim()) {
            return "Будь ласка, введіть питання";
        }
        
        if (!question.trim().endsWith('?')) {
            return "Питання має закінчуватися знаком питання (?)";
        }
        
        if (question.trim().length < 5) {
            return "Питання має бути довшим за 5 символів";
        }
        
        return "";
    }
    
    function getRandomAnswer() {
        const randomIndex = Math.floor(Math.random() * answers.length);
        return answers[randomIndex];
    }
    
    function addToHistory(question, answer) {
        questionHistory.unshift({question, answer});
        
        if (questionHistory.length > 10) {
            questionHistory = questionHistory.slice(0, 10);
        }
        
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        
        questionHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `<strong>П:</strong> ${item.question} <br><strong>В:</strong> ${item.answer}`;
            historyList.appendChild(historyItem);
        });
    }
    
    function animateAnswer(newAnswer) {
        answerDiv.style.opacity = 0;
        
        setTimeout(() => {
            answerDiv.textContent = newAnswer;
            answerDiv.style.opacity = 1;
            
            answerDiv.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.9)';
            setTimeout(() => {
                answerDiv.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
            }, 500);
        }, 500);
    }
    
    askButton.addEventListener('click', function() {
        const question = questionInput.value;
        const validationError = validateQuestion(question);
        
        if (validationError) {
            validationMessage.textContent = validationError;
            return;
        }
        
        validationMessage.textContent = "";
        
        answerDiv.textContent = "Куля думає...";
        
        setTimeout(() => {
            const answer = getRandomAnswer();
            animateAnswer(answer);
            addToHistory(question, answer);
        }, 1500);
    });
    
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askButton.click();
        }
    });
    
    updateHistoryDisplay();
});