let userMessages = [];
let botMessages = [];
let myDateTime = [];

function appendUserMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendBotMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('bot-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.remove();
    }
}

function appendLoader(){
    const chatBox = document.getElementById('chatBox');
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loaderContainer.appendChild(loader);
    chatBox.appendChild(loaderContainer);
}

function sendMessage() {
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    //userMessages 유저 메시지 추가
    userMessages.push(message);
    messageInput.value = '';

    if (message) {
        appendUserMessage(message);
        appendLoader();

        fetch('http://localhost:3000/gptchat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                userMessages: userMessages,
                botMessages: botMessages,
                myDateTime: myDateTime
            }),
        })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.assistant;
                appendBotMessage(botResponse);
                //봇 메시지 추가
                botMessages.push(botResponse);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function start() {
    const date = document.querySelector('#date').value;
    const hour = document.querySelector('#hour').value;

    if (date === '') {
        alert('생년월일을 입력해주세요.');
        return;
    }
    
    myDateTime = date + ' ' + hour;
    
    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";
}
